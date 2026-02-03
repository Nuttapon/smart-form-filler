// ===== Data Generators =====
const generators = {
  // Thai names
  thaiFirstNames: ['สมชาย', 'สมหญิง', 'วิชัย', 'วิภา', 'ประเสริฐ', 'ประภา', 'สุรชัย', 'สุรีย์', 'อนันต์', 'อรุณี', 'ธนา', 'ธนิดา', 'พิชัย', 'พิมพ์', 'กิตติ', 'กิตติยา'],
  thaiLastNames: ['สุขใจ', 'มั่นคง', 'รุ่งเรือง', 'เจริญสุข', 'ศรีสวัสดิ์', 'พงษ์พานิช', 'วงศ์สกุล', 'แสงทอง', 'ทองดี', 'สมบูรณ์', 'พิทักษ์', 'รักษา'],
  
  // English names
  englishFirstNames: ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Robert', 'Lisa', 'William', 'Anna'],
  englishLastNames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Anderson', 'Taylor'],

  // Locations
  districts: ['วัฒนา', 'คลองเตย', 'บางรัก', 'ปทุมวัน', 'สาทร', 'พระโขนง', 'บางนา', 'ห้วยขวาง', 'ดินแดง', 'จตุจักร'],
  provinces: ['กรุงเทพมหานคร', 'เชียงใหม่', 'ภูเก็ต', 'ชลบุรี', 'นนทบุรี', 'สมุทรปราการ', 'ขอนแก่น', 'นครราชสีมา'],
  
  // Random helpers
  randomItem: (arr) => arr[Math.floor(Math.random() * arr.length)],
  randomNumber: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  randomId: () => Math.random().toString(36).substring(2, 8),

  // Generate functions
  name: () => {
    const useThai = Math.random() > 0.3;
    if (useThai) {
      return `${generators.randomItem(generators.thaiFirstNames)} ${generators.randomItem(generators.thaiLastNames)}`;
    }
    return `${generators.randomItem(generators.englishFirstNames)} ${generators.randomItem(generators.englishLastNames)}`;
  },

  firstName: () => {
    return Math.random() > 0.3 
      ? generators.randomItem(generators.thaiFirstNames)
      : generators.randomItem(generators.englishFirstNames);
  },

  lastName: () => {
    return Math.random() > 0.3 
      ? generators.randomItem(generators.thaiLastNames)
      : generators.randomItem(generators.englishLastNames);
  },

  email: () => {
    const domains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'example.com', 'test.com'];
    return `test_${generators.randomId()}@${generators.randomItem(domains)}`;
  },

  phone: () => {
    const prefixes = ['081', '082', '083', '084', '085', '086', '087', '088', '089', '091', '092', '093', '094', '095', '096', '097', '098', '099', '061', '062', '063', '064', '065', '066'];
    return `${generators.randomItem(prefixes)}${generators.randomNumber(1000000, 9999999)}`;
  },

  tel: () => generators.phone(),

  address: () => {
    const roads = ['สุขุมวิท', 'รัชดาภิเษก', 'พหลโยธิน', 'ลาดพร้าว', 'สีลม', 'เพชรบุรี', 'พระราม 4', 'พระราม 9'];
    return `${generators.randomNumber(1, 999)}/${generators.randomNumber(1, 99)} ถ.${generators.randomItem(roads)} ${generators.randomItem(generators.districts)} ${generators.randomItem(generators.provinces)} ${generators.randomNumber(10100, 10900)}`;
  },

  date: () => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + generators.randomNumber(1, 90) * 24 * 60 * 60 * 1000);
    return futureDate.toISOString().split('T')[0];
  },

  pastDate: () => {
    const today = new Date();
    const pastDate = new Date(today.getTime() - generators.randomNumber(365, 365 * 50) * 24 * 60 * 60 * 1000);
    return pastDate.toISOString().split('T')[0];
  },

  number: () => generators.randomNumber(1, 100).toString(),

  price: () => generators.randomNumber(100, 10000).toString(),

  text: () => {
    const texts = ['ทดสอบระบบ', 'Test data', 'รายละเอียดเพิ่มเติม', 'หมายเหตุ', 'ข้อมูลทดสอบ'];
    return generators.randomItem(texts);
  },

  username: () => `user_${generators.randomId()}`,

  password: () => `Pass${generators.randomId()}!${generators.randomNumber(10, 99)}`,

  idCard: () => {
    let id = generators.randomNumber(1, 9).toString();
    for (let i = 0; i < 12; i++) {
      id += generators.randomNumber(0, 9).toString();
    }
    return id;
  },

  postalCode: () => generators.randomNumber(10100, 96220).toString(),

  company: () => {
    const companies = ['บริษัท ทดสอบ จำกัด', 'หจก. สมมติ', 'ABC Company Ltd.', 'Test Corp', 'Demo Inc.'];
    return generators.randomItem(companies);
  },

  url: () => `https://example-${generators.randomId()}.com`,

  roomNumber: () => `${generators.randomNumber(1, 9)}${generators.randomNumber(0, 9).toString().padStart(2, '0')}`,

  adults: () => generators.randomNumber(1, 4).toString(),

  children: () => generators.randomNumber(0, 2).toString(),

  nights: () => generators.randomNumber(1, 7).toString(),
};

// ===== Field Detection Rules =====
const fieldPatterns = [
  // Names
  { patterns: ['full_name', 'fullname', 'name', 'guest_name', 'customer_name', 'ชื่อ'], generator: 'name', label: 'ชื่อ-นามสกุล' },
  { patterns: ['first_name', 'firstname', 'fname', 'given_name', 'ชื่อจริง'], generator: 'firstName', label: 'ชื่อ' },
  { patterns: ['last_name', 'lastname', 'lname', 'surname', 'family_name', 'นามสกุล'], generator: 'lastName', label: 'นามสกุล' },
  
  // Contact
  { patterns: ['email', 'e-mail', 'อีเมล'], generator: 'email', label: 'อีเมล' },
  { patterns: ['phone', 'mobile', 'tel', 'telephone', 'contact_number', 'โทรศัพท์', 'เบอร์'], generator: 'phone', label: 'โทรศัพท์' },
  
  // Address
  { patterns: ['address', 'street', 'ที่อยู่', 'บ้านเลขที่'], generator: 'address', label: 'ที่อยู่' },
  { patterns: ['postal', 'postcode', 'zipcode', 'zip', 'รหัสไปรษณีย์'], generator: 'postalCode', label: 'รหัสไปรษณีย์' },
  
  // Dates
  { patterns: ['check_in', 'checkin', 'check-in', 'arrival', 'start_date', 'from_date', 'วันเข้าพัก'], generator: 'date', label: 'วันที่เข้า' },
  { patterns: ['check_out', 'checkout', 'check-out', 'departure', 'end_date', 'to_date', 'วันออก'], generator: 'date', label: 'วันที่ออก' },
  { patterns: ['birth', 'dob', 'birthday', 'วันเกิด'], generator: 'pastDate', label: 'วันเกิด' },
  { patterns: ['date'], generator: 'date', label: 'วันที่' },
  
  // Hotel specific
  { patterns: ['room_number', 'room_no', 'room', 'ห้อง'], generator: 'roomNumber', label: 'เลขห้อง' },
  { patterns: ['adult', 'adults', 'ผู้ใหญ่'], generator: 'adults', label: 'ผู้ใหญ่' },
  { patterns: ['child', 'children', 'kids', 'เด็ก'], generator: 'children', label: 'เด็ก' },
  { patterns: ['night', 'nights', 'คืน'], generator: 'nights', label: 'จำนวนคืน' },
  
  // Identity
  { patterns: ['id_card', 'idcard', 'citizen_id', 'national_id', 'บัตรประชาชน'], generator: 'idCard', label: 'เลขบัตร ปชช.' },
  { patterns: ['passport'], generator: 'text', label: 'Passport' },
  
  // Account
  { patterns: ['username', 'user_name', 'login'], generator: 'username', label: 'Username' },
  { patterns: ['password', 'passwd', 'pwd', 'รหัสผ่าน'], generator: 'password', label: 'Password' },
  
  // Business
  { patterns: ['company', 'organization', 'org', 'บริษัท', 'หน่วยงาน'], generator: 'company', label: 'บริษัท' },
  { patterns: ['price', 'amount', 'total', 'cost', 'ราคา', 'จำนวนเงิน'], generator: 'price', label: 'ราคา' },
  { patterns: ['quantity', 'qty', 'count', 'จำนวน'], generator: 'number', label: 'จำนวน' },
  
  // Other
  { patterns: ['url', 'website', 'link'], generator: 'url', label: 'URL' },
  { patterns: ['note', 'notes', 'comment', 'remark', 'description', 'หมายเหตุ', 'รายละเอียด'], generator: 'text', label: 'หมายเหตุ' },
];

// ===== Detect field type =====
function detectFieldType(element) {
  const name = (element.name || '').toLowerCase();
  const id = (element.id || '').toLowerCase();
  const type = (element.type || '').toLowerCase();
  const placeholder = (element.placeholder || '').toLowerCase();
  const label = getLabel(element).toLowerCase();
  
  const searchText = `${name} ${id} ${placeholder} ${label}`;
  
  // Check input type first
  if (type === 'email') return { generator: 'email', label: 'อีเมล' };
  if (type === 'tel') return { generator: 'phone', label: 'โทรศัพท์' };
  if (type === 'url') return { generator: 'url', label: 'URL' };
  if (type === 'date') return { generator: 'date', label: 'วันที่' };
  if (type === 'number') return { generator: 'number', label: 'ตัวเลข' };
  if (type === 'password') return { generator: 'password', label: 'Password' };
  
  // Check patterns
  for (const rule of fieldPatterns) {
    for (const pattern of rule.patterns) {
      if (searchText.includes(pattern)) {
        return { generator: rule.generator, label: rule.label };
      }
    }
  }
  
  // Default
  return { generator: 'text', label: 'ข้อความ' };
}

function getLabel(element) {
  // Try to find associated label
  if (element.id) {
    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label) return label.textContent.trim();
  }
  
  // Check parent label
  const parentLabel = element.closest('label');
  if (parentLabel) return parentLabel.textContent.trim();
  
  // Check aria-label
  if (element.getAttribute('aria-label')) {
    return element.getAttribute('aria-label');
  }
  
  return '';
}

// ===== Main Logic =====
let detectedFields = [];

async function scanPage() {
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
  
  return results[0].result || [];
}

function generateValues(fields) {
  return fields.map(field => {
    const searchText = `${field.name} ${field.id} ${field.placeholder} ${field.labelText}`.toLowerCase();
    
    let detectedType = { generator: 'text', label: 'ข้อความ' };
    
    // Check input type first
    if (field.type === 'email') detectedType = { generator: 'email', label: 'อีเมล' };
    else if (field.type === 'tel') detectedType = { generator: 'phone', label: 'โทรศัพท์' };
    else if (field.type === 'url') detectedType = { generator: 'url', label: 'URL' };
    else if (field.type === 'date') detectedType = { generator: 'date', label: 'วันที่' };
    else if (field.type === 'number') detectedType = { generator: 'number', label: 'ตัวเลข' };
    else if (field.type === 'password') detectedType = { generator: 'password', label: 'Password' };
    else {
      // Check patterns
      for (const rule of fieldPatterns) {
        let matched = false;
        for (const pattern of rule.patterns) {
          if (searchText.includes(pattern)) {
            detectedType = { generator: rule.generator, label: rule.label };
            matched = true;
            break;
          }
        }
        if (matched) break;
      }
    }
    
    // Generate value
    let value;
    if (field.isSelect && field.options.length > 0) {
      // Random select option (skip first if it's empty/placeholder)
      const validOptions = field.options.filter(o => o.value !== '');
      if (validOptions.length > 0) {
        value = generators.randomItem(validOptions).value;
      } else {
        value = field.options[0].value;
      }
      detectedType.label = 'ตัวเลือก';
    } else {
      const generatorFn = generators[detectedType.generator] || generators.text;
      value = generatorFn();
    }
    
    return {
      ...field,
      detectedType: detectedType.label,
      generatedValue: value,
      enabled: true
    };
  });
}

async function fillForm(fields) {
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
        
        // For React
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype, 'value'
        )?.set;
        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(el, field.generatedValue);
          el.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
    },
    args: [enabledFields]
  });
}

function renderFields(fields) {
  const fieldsList = document.getElementById('fieldsList');
  fieldsList.innerHTML = '';
  
  fields.forEach((field, idx) => {
    const displayName = field.name || field.id || field.placeholder || `Field ${idx + 1}`;
    
    const div = document.createElement('div');
    div.className = 'field-item';
    div.innerHTML = `
      <input type="checkbox" class="field-checkbox" data-idx="${idx}" ${field.enabled ? 'checked' : ''}>
      <div class="field-info">
        <div class="field-name">
          ${displayName}
          <span class="field-type">${field.detectedType}</span>
        </div>
        <div class="field-value">${field.generatedValue}</div>
      </div>
    `;
    
    fieldsList.appendChild(div);
  });
  
  // Add checkbox listeners
  fieldsList.querySelectorAll('.field-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const idx = parseInt(e.target.dataset.idx);
      detectedFields[idx].enabled = e.target.checked;
      updateSelectAll();
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

function showToast(message) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMessage').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
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
    detectedFields = generateValues(fields);
    
    // Update UI
    loading.style.display = 'none';
    main.style.display = 'block';
    fieldCount.textContent = detectedFields.length;
    
    if (detectedFields.length === 0) {
      emptyState.style.display = 'block';
    } else {
      fieldsWrapper.style.display = 'block';
      buttonsWrapper.style.display = 'flex';
      renderFields(detectedFields);
    }
  } catch (err) {
    console.error(err);
    loading.style.display = 'none';
    main.style.display = 'block';
    emptyState.style.display = 'block';
    emptyState.querySelector('p').textContent = 'เกิดข้อผิดพลาด: ' + err.message;
  }
  
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
    // Preserve enabled state
    renderFields(detectedFields);
    showToast('🎲 Random ค่าใหม่แล้ว!');
  });
  
  // Fill button
  document.getElementById('fillBtn').addEventListener('click', async () => {
    await fillForm(detectedFields);
    const filledCount = detectedFields.filter(f => f.enabled).length;
    showToast(`✅ Fill แล้ว ${filledCount} fields!`);
  });
});
