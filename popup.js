// ===== Smart Form Filler - Modular Version =====
// Uses: validators.js, generators.js, fieldPatterns.js
// Features: Linked Fields, Field Grouping, Debounce, Error Handling

// ===== Debounce Utility =====
function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// ===== Linked Fields Context =====
// Stores generated values for primary fields to reuse in linked fields
let linkedContext = {};

// ===== Main Logic =====
let detectedFields = [];

async function scanPage() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const fields = [];
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach((el, index) => {
          // Skip hidden, submit, button, file, image, reset, checkbox, radio
          const skipTypes = ['hidden', 'submit', 'button', 'file', 'image', 'reset', 'checkbox', 'radio'];
          if (skipTypes.includes(el.type)) return;
          
          // Skip if not visible
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) return;
          
          // Get label text
          let labelText = '';
          if (el.id) {
            const label = document.querySelector(`label[for="${el.id}"]`);
            if (label) labelText = label.textContent.trim();
          }
          if (!labelText) {
            const parentLabel = el.closest('label');
            if (parentLabel) labelText = parentLabel.textContent.trim();
          }
          if (!labelText && el.getAttribute('aria-label')) {
            labelText = el.getAttribute('aria-label');
          }
          
          fields.push({
            index,
            tagName: el.tagName.toLowerCase(),
            type: el.type || 'text',
            name: el.name || '',
            id: el.id || '',
            placeholder: el.placeholder || '',
            labelText,
            isSelect: el.tagName.toLowerCase() === 'select',
            options: el.tagName.toLowerCase() === 'select' 
              ? Array.from(el.options).map(o => ({ value: o.value, text: o.text }))
              : []
          });
        });
        
        return fields;
      }
    });
    
    return (results && results[0] && results[0].result) ? results[0].result : [];
  } catch (err) {
    console.error('Scan error:', err);
    // Handle restricted pages (chrome://, edge://, etc.)
    if (err.message && (err.message.includes('Cannot access') || err.message.includes('cannot be scripted'))) {
      throw new Error('Cannot scan this page (restricted)');
    }
    throw err;
  }
}

function detectFieldType(searchText, inputType) {
  // Check input type first
  if (inputType === 'email') return { generator: 'email', label: 'Email' };
  if (inputType === 'tel') return { generator: 'phone', label: 'Phone' };
  if (inputType === 'url') return { generator: 'url', label: 'URL' };
  if (inputType === 'date') return { generator: 'date', label: 'Date' };
  if (inputType === 'number') return { generator: 'number', label: 'Number' };
  if (inputType === 'password') return { generator: 'password', label: 'Password' };
  
  // Check patterns from fieldPatterns.js
  const lowerSearch = searchText.toLowerCase();
  for (const rule of window.fieldPatterns) {
    for (const pattern of rule.patterns) {
      if (lowerSearch.includes(pattern)) {
        return { 
          generator: rule.generator, 
          label: rule.label,
          linkedTo: rule.linkedTo || null
        };
      }
    }
  }
  
  return { generator: 'text', label: 'Text' };
}

function generateValues(fields) {
  // Reset linked context for fresh generation
  linkedContext = {};
  
  return fields.map(field => {
    const searchText = `${field.name} ${field.id} ${field.placeholder} ${field.labelText}`;
    
    // Use override if set, otherwise auto-detect
    let detectedType;
    if (field.generatorOverride && field.generatorOverride !== 'auto') {
      const option = window.generatorOptions.find(o => o.value === field.generatorOverride);
      detectedType = { generator: field.generatorOverride, label: option?.label || field.generatorOverride };
    } else {
      detectedType = detectFieldType(searchText, field.type);
    }
    
    // Generate value
    let value;
    if (field.isSelect && field.options.length > 0) {
      // Random select option (skip first if it's empty/placeholder)
      const validOptions = field.options.filter(o => o.value !== '');
      if (validOptions.length > 0) {
        value = window.utils.randomItem(validOptions).value;
      } else {
        value = field.options[0].value;
      }
      detectedType.label = 'Select Option';
    } else {
      // Check if this is a linked field (e.g., confirm_email should use same as email)
      if (detectedType.linkedTo && linkedContext[detectedType.linkedTo]) {
        value = linkedContext[detectedType.linkedTo];
      } else {
        const generatorFn = window.generators[detectedType.generator] || window.generators.text;
        value = generatorFn();
        
        // Store in linked context for related fields
        if (['email', 'password'].includes(detectedType.generator) && !detectedType.linkedTo) {
          linkedContext[detectedType.generator] = value;
        }
      }
    }
    
    // Determine group
    const group = window.getGroupForGenerator(detectedType.generator);
    
    return {
      ...field,
      detectedType: detectedType.label,
      generatorType: detectedType.generator,
      generatedValue: value,
      enabled: field.enabled !== undefined ? field.enabled : true,
      generatorOverride: field.generatorOverride || 'auto',
      linkedTo: detectedType.linkedTo || null,
      group
    };
  });
}

async function fillForm(fields) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const enabledFields = fields.filter(f => f.enabled);
    
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (fieldsToFill) => {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        fieldsToFill.forEach(field => {
          const el = inputs[field.index];
          if (!el) return;
          
          // Set value
          el.value = field.generatedValue;
          
          // Trigger events for frameworks
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
          el.dispatchEvent(new Event('blur', { bubbles: true }));
          
          // For React controlled inputs
          const nativeValueSetter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value')?.set;
          if (nativeValueSetter) {
            nativeValueSetter.call(el, field.generatedValue);
            el.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
      },
      args: [enabledFields]
    });
    
    return enabledFields.length;
  } catch (err) {
    console.error('Fill error:', err);
    throw new Error('Cannot fill form on this page');
  }
}

function groupFieldsByCategory(fields) {
  const groups = {};
  
  fields.forEach((field, idx) => {
    const groupKey = field.group || 'other';
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push({ ...field, originalIndex: idx });
  });
  
  return groups;
}

function renderFields(fields) {
  const fieldsList = document.getElementById('fieldsList');
  if (!fieldsList) return;
  fieldsList.innerHTML = '';
  
  // Group fields by category
  const groupedFields = groupFieldsByCategory(fields);
  
  // Define group order
  const groupOrder = ['personal', 'contact', 'address', 'payment', 'booking', 'account', 'business', 'other'];
  
  let animationIndex = 0;
  
  groupOrder.forEach(groupKey => {
    if (!groupedFields[groupKey] || groupedFields[groupKey].length === 0) return;
    
    const groupInfo = window.fieldGroups[groupKey];
    const groupFields = groupedFields[groupKey];
    
    // Create group header
    const groupHeader = document.createElement('div');
    groupHeader.className = 'field-group-header';
    groupHeader.innerHTML = `
      <span class="group-icon">${groupInfo.icon}</span>
      <span class="group-label">${groupInfo.label}</span>
      <span class="group-count">${groupFields.length}</span>
    `;
    fieldsList.appendChild(groupHeader);
    
    // Render fields in this group
    groupFields.forEach(field => {
      const idx = field.originalIndex;
      const displayName = field.name || field.id || field.placeholder || `Field ${idx + 1}`;
      
      // Build options for dropdown
      const optionsHtml = window.generatorOptions.map(opt => 
        `<option value="${opt.value}" ${field.generatorOverride === opt.value ? 'selected' : ''}>${opt.label}</option>`
      ).join('');
      
      const div = document.createElement('div');
      div.className = 'field-item';
      div.style.animationDelay = `${animationIndex * 0.03}s`;
      
      // Add linked indicator
      const linkedIndicator = field.linkedTo ? 
        `<span class="linked-badge" title="Linked to ${field.linkedTo}">🔗</span>` : '';
      
      div.innerHTML = `
        <input type="checkbox" class="field-checkbox" data-idx="${idx}" ${field.enabled ? 'checked' : ''}>
        <div class="field-info">
          <div class="field-name">
            ${displayName}
            <span class="field-type">${field.detectedType}</span>
            ${linkedIndicator}
          </div>
          <div class="field-value" data-idx="${idx}" title="Click to copy">${field.generatedValue}</div>
          <select class="field-type-select" data-idx="${idx}">
            ${optionsHtml}
          </select>
        </div>
      `;
      
      fieldsList.appendChild(div);
      animationIndex++;
    });
  });
  
  // Add checkbox listeners
  fieldsList.querySelectorAll('.field-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const idx = parseInt(e.target.dataset.idx);
      detectedFields[idx].enabled = e.target.checked;
      updateSelectAll();
    });
  });
  
  // Add type override listeners with debounce
  const debouncedTypeChange = debounce((idx, newType) => {
    // Update the field override
    detectedFields[idx].generatorOverride = newType;
    
    // Partial refresh: Only regenerate this specific field
    const field = detectedFields[idx];
    const searchText = `${field.name} ${field.id} ${field.placeholder} ${field.labelText}`;
    
    let detectedType;
    if (newType !== 'auto') {
      const option = window.generatorOptions.find(o => o.value === newType);
      detectedType = { generator: newType, label: option?.label || newType };
    } else {
      detectedType = detectFieldType(searchText, field.type);
    }
    
    // Update internal state for this field
    const generatorFn = window.generators[detectedType.generator] || window.generators.text;
    detectedFields[idx].generatedValue = generatorFn();
    detectedFields[idx].detectedType = detectedType.label;
    detectedFields[idx].generatorType = detectedType.generator;
    detectedFields[idx].group = window.getGroupForGenerator(detectedType.generator);
    
    // Re-render to show new value
    renderFields(detectedFields);
    showToast(`Updated ${detectedType.label}`, '🔄');
  }, 150);
  
  fieldsList.querySelectorAll('.field-type-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const idx = parseInt(e.target.dataset.idx);
      const newType = e.target.value;
      debouncedTypeChange(idx, newType);
    });
  });

  // Add click-to-copy listeners for field value
  fieldsList.querySelectorAll('.field-value').forEach(div => {
    div.addEventListener('click', async (e) => {
      const el = e.currentTarget;
      const idx = parseInt(el.dataset.idx);
      const value = detectedFields[idx].generatedValue;
      
      try {
        await navigator.clipboard.writeText(value);
        showToast('Copied to clipboard!', '📋');
        
        // Visual feedback
        const originalColor = el.style.color;
        el.style.color = '#10b981';
        setTimeout(() => {
          if (el) el.style.color = originalColor;
        }, 800);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    });
  });
}

function updateSelectAll() {
  const selectAll = document.getElementById('selectAll');
  const allChecked = detectedFields.every(f => f.enabled);
  const someChecked = detectedFields.some(f => f.enabled);
  
  selectAll.checked = allChecked;
  selectAll.indeterminate = someChecked && !allChecked;
}

function updateLocaleUI() {
  document.querySelectorAll('.locale-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`locale${window.currentLocale.toUpperCase()}`).classList.add('active');
}

function showToast(message, icon = '✨') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');
  
  if (toastMsg) toastMsg.textContent = message;
  if (toastIcon) toastIcon.textContent = icon;
  
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', async () => {
  const loading = document.getElementById('loading');
  const main = document.getElementById('main');
  const emptyState = document.getElementById('emptyState');
  const fieldsWrapper = document.getElementById('fieldsWrapper');
  const buttonsWrapper = document.getElementById('buttonsWrapper');
  const fieldCount = document.getElementById('fieldCount');
  
  try {
    // Scan page
    const fields = await scanPage();
    
    // Generate values
    detectedFields = generateValues(fields || []);
    
    // Update UI
    if (loading) loading.style.display = 'none';
    if (main) main.style.display = 'block';
    if (fieldCount) fieldCount.textContent = (detectedFields || []).length;
    
    if (!detectedFields || detectedFields.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
    } else {
      if (fieldsWrapper) fieldsWrapper.style.display = 'block';
      if (buttonsWrapper) buttonsWrapper.style.display = 'flex';
      renderFields(detectedFields);
    }
  } catch (err) {
    console.error(err);
    if (loading) loading.style.display = 'none';
    if (main) main.style.display = 'block';
    if (emptyState) {
      emptyState.style.display = 'block';
      const p = emptyState.querySelector('p');
      if (p) p.textContent = err.message || 'Error scanning page';
    }
  }
  
  // Locale toggle handlers
  document.getElementById('localeEN').addEventListener('click', () => {
    window.setCurrentLocale('en');
    window.setFakerLocale('en');
    updateLocaleUI();
    detectedFields = generateValues(detectedFields);
    renderFields(detectedFields);
    showToast('Switched to English', '🇺🇸');
  });
  
  document.getElementById('localeTH').addEventListener('click', () => {
    window.setCurrentLocale('th');
    window.setFakerLocale('th');
    updateLocaleUI();
    detectedFields = generateValues(detectedFields);
    renderFields(detectedFields);
    showToast('Switched to Thai', '🇹🇭');
  });
  
  // Select all handler
  document.getElementById('selectAll').addEventListener('change', (e) => {
    detectedFields.forEach(f => f.enabled = e.target.checked);
    renderFields(detectedFields);
  });
  
  // Random button
  document.getElementById('randomBtn').addEventListener('click', () => {
    detectedFields = generateValues(detectedFields.map(f => ({
      ...f,
      generatedValue: undefined
    })));
    renderFields(detectedFields);
    showToast('Values randomized!', '🎲');
  });
  
  // Fill button
  document.getElementById('fillBtn').addEventListener('click', async () => {
    try {
      const filledCount = await fillForm(detectedFields);
      showToast(`${filledCount} fields filled!`, '✨');
    } catch (err) {
      showToast(err.message, '⚠️');
    }
  });
});
