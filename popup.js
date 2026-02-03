// ===== Smart Form Filler - Enhanced Version =====
// Auto-detect form fields and fill with smart, validated test data

// ===== Configuration =====
let currentLocale = 'en'; // 'en' or 'th'

// ===== Data Collections =====
const data = {
  // Thai names
  thaiFirstNames: ['สมชาย', 'สมหญิง', 'วิชัย', 'วิภา', 'ประเสริฐ', 'ประภา', 'สุรชัย', 'สุรีย์', 'อนันต์', 'อรุณี', 'ธนา', 'ธนิดา', 'พิชัย', 'พิมพ์', 'กิตติ', 'กิตติยา'],
  thaiLastNames: ['สุขใจ', 'มั่นคง', 'รุ่งเรือง', 'เจริญสุข', 'ศรีสวัสดิ์', 'พงษ์พานิช', 'วงศ์สกุล', 'แสงทอง', 'ทองดี', 'สมบูรณ์', 'พิทักษ์', 'รักษา'],
  
  // English names (expanded)
  englishFirstNames: [
    'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Joseph', 'Charles', 'Thomas', 'Christopher',
    'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Emma', 'Sophia', 'Olivia', 'Emily', 'Jessica'
  ],
  englishLastNames: [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris'
  ],

  // Thai locations
  thaiDistricts: ['วัฒนา', 'คลองเตย', 'บางรัก', 'ปทุมวัน', 'สาทร', 'พระโขนง', 'บางนา', 'ห้วยขวาง', 'ดินแดง', 'จตุจักร'],
  thaiProvinces: ['กรุงเทพมหานคร', 'เชียงใหม่', 'ภูเก็ต', 'ชลบุรี', 'นนทบุรี', 'สมุทรปราการ', 'ขอนแก่น', 'นครราชสีมา'],
  thaiRoads: ['สุขุมวิท', 'รัชดาภิเษก', 'พหลโยธิน', 'ลาดพร้าว', 'สีลม', 'เพชรบุรี', 'พระราม 4', 'พระราม 9'],

  // English locations
  usStreets: ['Main St', 'Oak Ave', 'Maple Dr', 'Cedar Ln', 'Pine Rd', 'Elm St', 'Park Ave', 'Broadway', 'First Ave', 'Second St'],
  usCities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Seattle'],
  usStates: ['NY', 'CA', 'IL', 'TX', 'AZ', 'FL', 'WA', 'CO', 'GA', 'NC'],

  // Email domains
  emailDomains: ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'example.com', 'test.com'],

  // Companies
  companies: ['Acme Corp', 'Global Tech Inc.', 'Sunrise Holdings', 'Pacific Solutions', 'Metro Industries', 
    'บริษัท ทดสอบ จำกัด', 'หจก. สมมติ', 'ABC Company Ltd.'],
};

// ===== Utility Functions =====
const utils = {
  randomItem: (arr) => arr[Math.floor(Math.random() * arr.length)],
  randomNumber: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  randomId: () => Math.random().toString(36).substring(2, 8),
  randomDigits: (count) => {
    let result = '';
    for (let i = 0; i < count; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  },
};

// ===== Validators & Checksum Algorithms =====
const validators = {
  // Thai National ID checksum (Mod 11 algorithm)
  calculateThaiIdChecksum: (first12Digits) => {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(first12Digits[i]) * (13 - i);
    }
    const checksum = (11 - (sum % 11)) % 10;
    return checksum.toString();
  },

  // Luhn algorithm for credit cards
  calculateLuhnChecksum: (partialNumber) => {
    let sum = 0;
    for (let i = 0; i < partialNumber.length; i++) {
      let digit = parseInt(partialNumber[partialNumber.length - 1 - i]);
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return ((10 - (sum % 10)) % 10).toString();
  },

  // Validate Thai National ID
  isValidThaiId: (id) => {
    if (id.length !== 13 || !/^\d{13}$/.test(id)) return false;
    const first12 = id.substring(0, 12);
    const expectedChecksum = validators.calculateThaiIdChecksum(first12);
    return id[12] === expectedChecksum;
  },

  // Validate credit card with Luhn
  isValidLuhn: (cc) => {
    const nums = cc.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;
    for (let i = nums.length - 1; i >= 0; i--) {
      let digit = parseInt(nums[i]);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  },
};

// ===== Data Generators =====
const generators = {
  // ===== Names =====
  name: () => {
    if (currentLocale === 'th' || Math.random() > 0.7) {
      return `${utils.randomItem(data.thaiFirstNames)} ${utils.randomItem(data.thaiLastNames)}`;
    }
    return `${utils.randomItem(data.englishFirstNames)} ${utils.randomItem(data.englishLastNames)}`;
  },

  firstName: () => {
    if (currentLocale === 'th' || Math.random() > 0.7) {
      return utils.randomItem(data.thaiFirstNames);
    }
    return utils.randomItem(data.englishFirstNames);
  },

  lastName: () => {
    if (currentLocale === 'th' || Math.random() > 0.7) {
      return utils.randomItem(data.thaiLastNames);
    }
    return utils.randomItem(data.englishLastNames);
  },

  // ===== Contact =====
  email: () => {
    const name = utils.randomItem(data.englishFirstNames).toLowerCase();
    return `${name}_${utils.randomId()}@${utils.randomItem(data.emailDomains)}`;
  },

  phone: () => {
    if (currentLocale === 'th') {
      const prefixes = ['081', '082', '083', '084', '085', '086', '087', '088', '089', '091', '092', '093', '094', '095', '096', '097', '098', '099', '061', '062', '063', '064', '065', '066'];
      return `${utils.randomItem(prefixes)}${utils.randomNumber(1000000, 9999999)}`;
    }
    // US format
    return `+1${utils.randomNumber(200, 999)}${utils.randomNumber(2000000, 9999999)}`;
  },

  tel: () => generators.phone(),

  // ===== Address =====
  address: () => {
    if (currentLocale === 'th') {
      return `${utils.randomNumber(1, 999)}/${utils.randomNumber(1, 99)} ถ.${utils.randomItem(data.thaiRoads)} ${utils.randomItem(data.thaiDistricts)} ${utils.randomItem(data.thaiProvinces)} ${utils.randomNumber(10100, 10900)}`;
    }
    return `${utils.randomNumber(1, 9999)} ${utils.randomItem(data.usStreets)}, ${utils.randomItem(data.usCities)}, ${utils.randomItem(data.usStates)} ${utils.randomNumber(10000, 99999)}`;
  },

  postalCode: () => {
    if (currentLocale === 'th') {
      return utils.randomNumber(10100, 96220).toString();
    }
    return utils.randomNumber(10001, 99999).toString();
  },

  city: () => {
    if (currentLocale === 'th') {
      return utils.randomItem(data.thaiProvinces);
    }
    return utils.randomItem(data.usCities);
  },

  state: () => {
    if (currentLocale === 'th') {
      return utils.randomItem(data.thaiProvinces);
    }
    return utils.randomItem(data.usStates);
  },

  country: () => currentLocale === 'th' ? 'Thailand' : 'United States',

  // ===== Dates =====
  date: () => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + utils.randomNumber(1, 90) * 24 * 60 * 60 * 1000);
    return futureDate.toISOString().split('T')[0];
  },

  pastDate: () => {
    const today = new Date();
    const pastDate = new Date(today.getTime() - utils.randomNumber(365, 365 * 50) * 24 * 60 * 60 * 1000);
    return pastDate.toISOString().split('T')[0];
  },

  birthDate: () => {
    // Generate age between 18-65
    const today = new Date();
    const age = utils.randomNumber(18, 65);
    const birthYear = today.getFullYear() - age;
    const month = utils.randomNumber(1, 12);
    const day = utils.randomNumber(1, 28);
    return `${birthYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  },

  // ===== Identity Documents =====
  // Thai National ID with valid checksum
  thaiNationalId: () => {
    // First digit: 1-8 (region), avoid 0
    let id = utils.randomNumber(1, 8).toString();
    // Next 11 digits random
    id += utils.randomDigits(11);
    // 13th digit is checksum
    id += validators.calculateThaiIdChecksum(id);
    return id;
  },

  // Thai Corporate Tax ID (starts with 0)
  thaiCorporateTaxId: () => {
    // Corporate IDs start with 0
    let id = '0';
    // Next 11 digits random
    id += utils.randomDigits(11);
    // 13th digit is checksum
    id += validators.calculateThaiIdChecksum(id);
    return id;
  },

  // Generic ID card (for backward compatibility)
  idCard: () => generators.thaiNationalId(),

  passport: () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let passport = letters[Math.floor(Math.random() * 26)];
    passport += letters[Math.floor(Math.random() * 26)];
    passport += utils.randomDigits(7);
    return passport;
  },

  // ===== Financial =====
  creditCard: () => {
    // Visa (4) or Mastercard (51-55)
    const prefixes = ['4', '51', '52', '53', '54', '55'];
    let cc = utils.randomItem(prefixes);
    // Generate remaining digits (total should be 15 before checksum)
    while (cc.length < 15) {
      cc += Math.floor(Math.random() * 10);
    }
    // Add Luhn checksum
    cc += validators.calculateLuhnChecksum(cc);
    return cc;
  },

  // Formatted credit card
  creditCardFormatted: () => {
    const cc = generators.creditCard();
    return `${cc.slice(0, 4)} ${cc.slice(4, 8)} ${cc.slice(8, 12)} ${cc.slice(12, 16)}`;
  },

  cvv: () => utils.randomNumber(100, 999).toString(),

  expiryDate: () => {
    const month = utils.randomNumber(1, 12).toString().padStart(2, '0');
    const year = (new Date().getFullYear() + utils.randomNumber(1, 5)) % 100;
    return `${month}/${year.toString().padStart(2, '0')}`;
  },

  expiryMonth: () => utils.randomNumber(1, 12).toString().padStart(2, '0'),
  
  expiryYear: () => (new Date().getFullYear() + utils.randomNumber(1, 5)).toString(),

  price: () => utils.randomNumber(100, 10000).toString(),

  amount: () => utils.randomNumber(1, 1000).toString(),

  // ===== Account =====
  username: () => `user_${utils.randomId()}`,

  password: () => `Pass${utils.randomId()}!${utils.randomNumber(10, 99)}`,

  // ===== Business =====
  company: () => utils.randomItem(data.companies),

  // ===== Hotel/Travel =====
  roomNumber: () => `${utils.randomNumber(1, 9)}${utils.randomNumber(0, 9).toString().padStart(2, '0')}`,

  adults: () => utils.randomNumber(1, 4).toString(),

  children: () => utils.randomNumber(0, 2).toString(),

  nights: () => utils.randomNumber(1, 7).toString(),

  // ===== Generic =====
  number: () => utils.randomNumber(1, 100).toString(),

  text: () => {
    const texts = ['Test data', 'Sample input', 'Demo content', 'Additional notes', 'For testing purposes'];
    return utils.randomItem(texts);
  },

  url: () => `https://example-${utils.randomId()}.com`,
};

// ===== Field Detection Rules =====
const fieldPatterns = [
  // Names
  { patterns: ['full_name', 'fullname', 'name', 'guest_name', 'customer_name', 'ชื่อ'], generator: 'name', label: 'Full Name' },
  { patterns: ['first_name', 'firstname', 'fname', 'given_name', 'ชื่อจริง'], generator: 'firstName', label: 'First Name' },
  { patterns: ['last_name', 'lastname', 'lname', 'surname', 'family_name', 'นามสกุล'], generator: 'lastName', label: 'Last Name' },
  
  // Contact
  { patterns: ['email', 'e-mail', 'อีเมล'], generator: 'email', label: 'Email' },
  { patterns: ['phone', 'mobile', 'tel', 'telephone', 'contact_number', 'โทรศัพท์', 'เบอร์'], generator: 'phone', label: 'Phone' },
  
  // Address
  { patterns: ['address', 'street', 'ที่อยู่', 'บ้านเลขที่'], generator: 'address', label: 'Address' },
  { patterns: ['city', 'เมือง'], generator: 'city', label: 'City' },
  { patterns: ['state', 'province', 'จังหวัด'], generator: 'state', label: 'State/Province' },
  { patterns: ['country', 'ประเทศ'], generator: 'country', label: 'Country' },
  { patterns: ['postal', 'postcode', 'zipcode', 'zip', 'รหัสไปรษณีย์'], generator: 'postalCode', label: 'Postal Code' },
  
  // Dates
  { patterns: ['check_in', 'checkin', 'check-in', 'arrival', 'start_date', 'from_date', 'วันเข้าพัก'], generator: 'date', label: 'Check-in Date' },
  { patterns: ['check_out', 'checkout', 'check-out', 'departure', 'end_date', 'to_date', 'วันออก'], generator: 'date', label: 'Check-out Date' },
  { patterns: ['birth', 'dob', 'birthday', 'date_of_birth', 'วันเกิด'], generator: 'birthDate', label: 'Birth Date' },
  { patterns: ['date'], generator: 'date', label: 'Date' },
  
  // Identity Documents (with validation!)
  { patterns: ['id_card', 'idcard', 'citizen_id', 'national_id', 'thai_id', 'บัตรประชาชน', 'เลขบัตร'], generator: 'thaiNationalId', label: 'Thai National ID' },
  { patterns: ['tax_id', 'taxid', 'tin', 'tax_number', 'เลขประจำตัวผู้เสียภาษี'], generator: 'thaiNationalId', label: 'Tax ID (Individual)' },
  { patterns: ['corporate_tax', 'company_tax', 'corporate_id', 'juristic_id', 'องค์กร', 'นิติบุคคล'], generator: 'thaiCorporateTaxId', label: 'Tax ID (Corporate)' },
  { patterns: ['passport', 'passport_no', 'passport_number'], generator: 'passport', label: 'Passport' },
  
  // Financial
  { patterns: ['credit_card', 'card_number', 'cc_number', 'creditcard', 'บัตรเครดิต'], generator: 'creditCard', label: 'Credit Card' },
  { patterns: ['cvv', 'cvc', 'security_code', 'card_code'], generator: 'cvv', label: 'CVV' },
  { patterns: ['expiry', 'exp_date', 'card_expiry', 'วันหมดอายุ'], generator: 'expiryDate', label: 'Expiry Date' },
  { patterns: ['exp_month', 'expiry_month', 'card_month'], generator: 'expiryMonth', label: 'Expiry Month' },
  { patterns: ['exp_year', 'expiry_year', 'card_year'], generator: 'expiryYear', label: 'Expiry Year' },
  { patterns: ['price', 'amount', 'total', 'cost', 'ราคา', 'จำนวนเงิน'], generator: 'price', label: 'Price' },
  
  // Hotel specific
  { patterns: ['room_number', 'room_no', 'room', 'ห้อง'], generator: 'roomNumber', label: 'Room Number' },
  { patterns: ['adult', 'adults', 'ผู้ใหญ่'], generator: 'adults', label: 'Adults' },
  { patterns: ['child', 'children', 'kids', 'เด็ก'], generator: 'children', label: 'Children' },
  { patterns: ['night', 'nights', 'คืน'], generator: 'nights', label: 'Nights' },
  
  // Account
  { patterns: ['username', 'user_name', 'login'], generator: 'username', label: 'Username' },
  { patterns: ['password', 'passwd', 'pwd', 'รหัสผ่าน'], generator: 'password', label: 'Password' },
  
  // Business
  { patterns: ['company', 'organization', 'org', 'บริษัท', 'หน่วยงาน'], generator: 'company', label: 'Company' },
  { patterns: ['quantity', 'qty', 'count', 'จำนวน'], generator: 'number', label: 'Quantity' },
  
  // Other
  { patterns: ['url', 'website', 'link'], generator: 'url', label: 'URL' },
  { patterns: ['note', 'notes', 'comment', 'remark', 'description', 'หมายเหตุ', 'รายละเอียด'], generator: 'text', label: 'Notes' },
];

// Generator type options for override dropdown
const generatorOptions = [
  { value: 'auto', label: 'Auto-detect' },
  { value: 'name', label: 'Full Name' },
  { value: 'firstName', label: 'First Name' },
  { value: 'lastName', label: 'Last Name' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'address', label: 'Address' },
  { value: 'postalCode', label: 'Postal Code' },
  { value: 'date', label: 'Date (Future)' },
  { value: 'pastDate', label: 'Date (Past)' },
  { value: 'birthDate', label: 'Birth Date' },
  { value: 'thaiNationalId', label: 'Thai National ID ✓' },
  { value: 'thaiCorporateTaxId', label: 'Corporate Tax ID ✓' },
  { value: 'passport', label: 'Passport' },
  { value: 'creditCard', label: 'Credit Card ✓' },
  { value: 'cvv', label: 'CVV' },
  { value: 'expiryDate', label: 'Expiry Date' },
  { value: 'username', label: 'Username' },
  { value: 'password', label: 'Password' },
  { value: 'company', label: 'Company' },
  { value: 'number', label: 'Number' },
  { value: 'text', label: 'Text' },
];

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
  
  return (results && results[0] && results[0].result) ? results[0].result : [];
}

function detectFieldType(searchText, inputType) {
  // Check input type first
  if (inputType === 'email') return { generator: 'email', label: 'Email' };
  if (inputType === 'tel') return { generator: 'phone', label: 'Phone' };
  if (inputType === 'url') return { generator: 'url', label: 'URL' };
  if (inputType === 'date') return { generator: 'date', label: 'Date' };
  if (inputType === 'number') return { generator: 'number', label: 'Number' };
  if (inputType === 'password') return { generator: 'password', label: 'Password' };
  
  // Check patterns
  const lowerSearch = searchText.toLowerCase();
  for (const rule of fieldPatterns) {
    for (const pattern of rule.patterns) {
      if (lowerSearch.includes(pattern)) {
        return { generator: rule.generator, label: rule.label };
      }
    }
  }
  
  return { generator: 'text', label: 'Text' };
}

function generateValues(fields) {
  return fields.map(field => {
    const searchText = `${field.name} ${field.id} ${field.placeholder} ${field.labelText}`;
    
    // Use override if set, otherwise auto-detect
    let detectedType;
    if (field.generatorOverride && field.generatorOverride !== 'auto') {
      const option = generatorOptions.find(o => o.value === field.generatorOverride);
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
        value = utils.randomItem(validOptions).value;
      } else {
        value = field.options[0].value;
      }
      detectedType.label = 'Select Option';
    } else {
      const generatorFn = generators[detectedType.generator] || generators.text;
      value = generatorFn();
    }
    
    return {
      ...field,
      detectedType: detectedType.label,
      generatorType: detectedType.generator,
      generatedValue: value,
      enabled: field.enabled !== undefined ? field.enabled : true,
      generatorOverride: field.generatorOverride || 'auto'
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
        const nativeValueSetter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value')?.set;
        if (nativeValueSetter) {
          nativeValueSetter.call(el, field.generatedValue);
          el.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
    },
    args: [enabledFields]
  });
}

function renderFields(fields) {
  const fieldsList = document.getElementById('fieldsList');
  if (!fieldsList) return;
  fieldsList.innerHTML = '';
  
  fields.forEach((field, idx) => {
    const displayName = field.name || field.id || field.placeholder || `Field ${idx + 1}`;
    
    // Build options for dropdown
    const optionsHtml = generatorOptions.map(opt => 
      `<option value="${opt.value}" ${field.generatorOverride === opt.value ? 'selected' : ''}>${opt.label}</option>`
    ).join('');
    
    const div = document.createElement('div');
    div.className = 'field-item';
    // Add staggered animation delay
    div.style.animationDelay = `${idx * 0.05}s`;
    
    div.innerHTML = `
      <input type="checkbox" class="field-checkbox" data-idx="${idx}" ${field.enabled ? 'checked' : ''}>
      <div class="field-info">
        <div class="field-name">
          ${displayName}
          <span class="field-type">${field.detectedType}</span>
        </div>
        <div class="field-value" data-idx="${idx}" title="Click to copy">${field.generatedValue}</div>
        <select class="field-type-select" data-idx="${idx}">
          ${optionsHtml}
        </select>
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
  
  // Add type override listeners
  fieldsList.querySelectorAll('.field-type-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const idx = parseInt(e.target.dataset.idx);
      const newType = e.target.value;
      
      // Update the field override
      detectedFields[idx].generatorOverride = newType;
      
      // Partial refresh: Only regenerate this specific field
      const field = detectedFields[idx];
      const searchText = `${field.name} ${field.id} ${field.placeholder} ${field.labelText}`;
      
      let detectedType;
      if (newType !== 'auto') {
        const option = generatorOptions.find(o => o.value === newType);
        detectedType = { generator: newType, label: option?.label || newType };
      } else {
        detectedType = detectFieldType(searchText, field.type);
      }
      
      // Update internal state for this field
      const generatorFn = generators[detectedType.generator] || generators.text;
      detectedFields[idx].generatedValue = generatorFn();
      detectedFields[idx].detectedType = detectedType.label;
      detectedFields[idx].generatorType = detectedType.generator;
      
      // Re-render to show new value
      renderFields(detectedFields);
      showToast(`Updated ${detectedType.label}`, '🔄');
    });
  });

  // Add click-to-copy listeners for field value
  fieldsList.querySelectorAll('.field-value').forEach(div => {
    div.addEventListener('click', async (e) => {
      const idx = parseInt(e.currentTarget.dataset.idx);
      const value = detectedFields[idx].generatedValue;
      
      try {
        await navigator.clipboard.writeText(value);
        showToast('Copied to clipboard!', '📋');
        
        // Visual feedback
        const el = e.currentTarget;
        const originalColor = el.style.color;
        el.style.color = '#10b981'; // Green feedback
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
  document.getElementById(`locale${currentLocale.toUpperCase()}`).classList.add('active');
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
      if (p) p.textContent = 'Error: ' + err.message;
    }
  }
  
  // Locale toggle handlers
  document.getElementById('localeEN').addEventListener('click', () => {
    currentLocale = 'en';
    updateLocaleUI();
    detectedFields = generateValues(detectedFields);
    renderFields(detectedFields);
    showToast('Switched to English', '🇺🇸');
  });
  
  document.getElementById('localeTH').addEventListener('click', () => {
    currentLocale = 'th';
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
    await fillForm(detectedFields);
    const filledCount = detectedFields.filter(f => f.enabled).length;
    showToast(`${filledCount} fields filled!`, '✨');
  });
});
