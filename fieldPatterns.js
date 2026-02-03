// ===== Field Detection Patterns & Grouping =====
// Exported for use in popup.js

// Field groups for UI organization
const fieldGroups = {
  personal: {
    icon: '👤',
    label: 'Personal',
    generators: ['name', 'firstName', 'lastName', 'birthDate', 'thaiNationalId', 'thaiCorporateTaxId', 'idCard', 'passport']
  },
  contact: {
    icon: '📧',
    label: 'Contact',
    generators: ['email', 'phone', 'tel']
  },
  address: {
    icon: '📍',
    label: 'Address',
    generators: ['address', 'street', 'city', 'state', 'country', 'postalCode']
  },
  payment: {
    icon: '💳',
    label: 'Payment',
    generators: ['creditCard', 'creditCardFormatted', 'cvv', 'expiryDate', 'expiryMonth', 'expiryYear', 'price', 'amount']
  },
  booking: {
    icon: '🏨',
    label: 'Booking',
    generators: ['roomNumber', 'adults', 'children', 'nights', 'date', 'pastDate']
  },
  account: {
    icon: '🔐',
    label: 'Account',
    generators: ['username', 'password']
  },
  business: {
    icon: '🏢',
    label: 'Business',
    generators: ['company', 'jobTitle']
  },
  other: {
    icon: '📝',
    label: 'Other',
    generators: ['text', 'paragraph', 'url', 'number']
  }
};

// Linked fields configuration
const linkedFieldsConfig = {
  // Primary field -> array of linked field patterns
  email: {
    linkedPatterns: ['confirm_email', 'email_confirm', 'email2', 'verify_email', 'retype_email', 'email_confirmation'],
    description: 'Email confirmation fields'
  },
  password: {
    linkedPatterns: ['confirm_password', 'password_confirm', 'password2', 'verify_password', 'retype_password', 'password_confirmation'],
    description: 'Password confirmation fields'
  }
};

// Field detection patterns (order matters - specific patterns first!)
const fieldPatterns = [
  // Names (Specific patterns first!)
  { patterns: ['first_name', 'firstname', 'fname', 'given_name', 'ชื่อจริง'], generator: 'firstName', label: 'First Name' },
  { patterns: ['last_name', 'lastname', 'lname', 'surname', 'family_name', 'นามสกุล'], generator: 'lastName', label: 'Last Name' },
  { patterns: ['full_name', 'fullname', 'name', 'guest_name', 'customer_name', 'ชื่อ'], generator: 'name', label: 'Full Name' },
  { patterns: ['job', 'title', 'position', 'ตำแหน่ง'], generator: 'jobTitle', label: 'Job Title' },
  
  // Contact - Email confirmation (must come before email)
  { patterns: ['confirm_email', 'email_confirm', 'email2', 'verify_email', 'retype_email', 'email_confirmation'], generator: 'email', label: 'Confirm Email', linkedTo: 'email' },
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
  
  // Account - Password confirmation (must come before password)
  { patterns: ['confirm_password', 'password_confirm', 'password2', 'verify_password', 'retype_password', 'password_confirmation'], generator: 'password', label: 'Confirm Password', linkedTo: 'password' },
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
  { value: 'jobTitle', label: 'Job Title' },
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
  { value: 'text', label: 'Sentence' },
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'url', label: 'URL' },
];

// Helper function to get group for a generator type
function getGroupForGenerator(generatorType) {
  for (const [groupKey, group] of Object.entries(fieldGroups)) {
    if (group.generators.includes(generatorType)) {
      return groupKey;
    }
  }
  return 'other';
}

// Export for use in other modules
window.fieldGroups = fieldGroups;
window.linkedFieldsConfig = linkedFieldsConfig;
window.fieldPatterns = fieldPatterns;
window.generatorOptions = generatorOptions;
window.getGroupForGenerator = getGroupForGenerator;
