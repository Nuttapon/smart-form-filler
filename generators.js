// ===== Data Generators =====
// Exported for use in popup.js
// Requires: validators.js to be loaded first

// ===== Configuration =====
let currentLocale = 'en'; // 'en' or 'th'

// ===== Faker v5 Integration =====
// Faker v5.5.3 sets window.faker with .name, .internet, .address, etc.
const setFakerLocale = (locale) => {
  currentLocale = locale;
  if (typeof faker !== 'undefined') {
    faker.locale = locale === 'th' ? 'th' : 'en';
  }
};

// ===== Thai Data Collections (Fallback) =====
const thaiData = {
  firstNames: ['สมชาย', 'สมหญิง', 'วิชัย', 'วิภา', 'ประเสริฐ', 'ประภา', 'สุรชัย', 'สุรีย์', 'อนันต์', 'อรุณี', 'ธนา', 'ธนิดา', 'พิชัย', 'พิมพ์', 'กิตติ', 'กิตติยา', 'มานะ', 'ชูใจ', 'สมศักดิ์', 'พรทิพย์', 'วรรณพร', 'ธนพล', 'ระวี', 'สิริ', 'นที', 'เมฆา', 'ตะวัน'],
  lastNames: ['สุขใจ', 'มั่นคง', 'รุ่งเรือง', 'เจริญสุข', 'ศรีสวัสดิ์', 'พงษ์พานิช', 'วงศ์สกุล', 'แสงทอง', 'ทองดี', 'สมบูรณ์', 'พิทักษ์', 'รักษา', 'วิเศษสุข', 'ปัญญาสกุล', 'เลิศวิวัฒน์', 'สุขนิรันดร์', 'ดีประเสริฐ', 'วัฒนเมธี'],
  districts: ['วัฒนา', 'คลองเตย', 'บางรัก', 'ปทุมวัน', 'สาทร', 'พระโขนง', 'บางนา', 'ห้วยขวาง', 'ดินแดง', 'จตุจักร', 'ลาดพร้าว', 'พญาไท', 'ราชเทวี'],
  provinces: ['กรุงเทพมหานคร', 'เชียงใหม่', 'ภูเก็ต', 'ชลบุรี', 'นนทบุรี', 'สมุทรปราการ', 'ขอนแก่น', 'นครราชสีมา', 'สงขลา', 'นครสวรรค์', 'อุดรธานี'],
  roads: ['สุขุมวิท', 'รัชดาภิเษก', 'พหลโยธิน', 'ลาดพร้าว', 'สีลม', 'เพชรบุรี', 'พระราม 4', 'พระราม 9', 'วิภาวดีรังสิต', 'สาทร', 'ประดิษฐ์มนูธรรม'],
  companies: ['บริษัท ทดสอบ จำกัด', 'หจก. สมมติ', 'ซีพีออลล์', 'ปตท.', 'ไทยเบฟ', 'กสิกรไทย', 'เอไอเอส', 'ทรู', 'เซ็นทรัล', 'ธนาคารไทยพาณิชย์', 'การบินไทย'],
  jobTitles: ['ผู้จัดการฝ่ายขาย', 'วิศวกรซอฟต์แวร์', 'นักการตลาดดิจิทัล', 'ผู้อำนวยการโครงการ', 'หัวหน้าแผนกบัญชี', 'ที่ปรึกษาทางธุรกิจ', 'นักวาดภาพประกอบ', 'พนักงานต้อนรับ'],
  notes: [
    'ขอใบเสร็จรับเงินด้วยครับ',
    'กรุณาส่งสินค้าในช่วงเช้าเท่านั้น',
    'ไม่มีสัตว์เลี้ยง',
    'ต้องการห้องพักชั้นสูง',
    'ขอที่จอดรถใกล้ทางเข้า',
    'ขอบคุณมากครับสำหรับการบริการ',
    'รบกวนตรวจสอบสินค้าก่อนส่ง'
  ],
  countries: ['ประเทศไทย', 'ญี่ปุ่น', 'สหรัฐอเมริกา', 'อังกฤษ', 'ฝรั่งเศส', 'เยอรมนี', 'เกาหลีใต้', 'จีน', 'สิงคโปร์']
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

// ===== Data Generators =====
const generators = {
  // ===== Names =====
  name: () => {
    if (currentLocale === 'th') {
      return `${utils.randomItem(thaiData.firstNames)} ${utils.randomItem(thaiData.lastNames)}`;
    }
    if (typeof faker !== 'undefined' && faker.name) {
      setFakerLocale('en');
      return faker.name.findName();
    }
    return `John ${utils.randomId()}`;
  },

  firstName: () => {
    if (currentLocale === 'th') {
      return utils.randomItem(thaiData.firstNames);
    }
    if (typeof faker !== 'undefined' && faker.name) {
      setFakerLocale('en');
      return faker.name.firstName();
    }
    return 'John';
  },

  lastName: () => {
    if (currentLocale === 'th') {
      return utils.randomItem(thaiData.lastNames);
    }
    if (typeof faker !== 'undefined' && faker.name) {
      setFakerLocale('en');
      return faker.name.lastName();
    }
    return 'Smith';
  },

  // ===== Contact =====
  email: () => {
    if (typeof faker !== 'undefined' && faker.internet) {
      setFakerLocale('en');
      return faker.internet.email().toLowerCase();
    }
    return `test_${utils.randomId()}@example.com`;
  },

  phone: () => {
    if (currentLocale === 'th') {
      const prefixes = ['081', '082', '083', '084', '085', '086', '087', '088', '089', '091', '092', '093', '094', '095', '096', '097', '098', '099', '061', '062', '063', '064', '065', '066'];
      return `${utils.randomItem(prefixes)}${utils.randomNumber(1000000, 9999999)}`;
    }
    if (typeof faker !== 'undefined' && faker.phone) {
      return faker.phone.phoneNumber();
    }
    return `+1${utils.randomDigits(10)}`;
  },

  tel: () => generators.phone(),

  // ===== Address =====
  address: () => {
    if (currentLocale === 'th') {
      return `${utils.randomNumber(1, 999)}/${utils.randomNumber(1, 99)} ถ.${utils.randomItem(thaiData.roads)} ${utils.randomItem(thaiData.districts)} ${utils.randomItem(thaiData.provinces)} ${utils.randomNumber(10100, 10900)}`;
    }
    if (typeof faker !== 'undefined' && faker.address) {
      setFakerLocale('en');
      return `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`;
    }
    return `${utils.randomNumber(1, 999)} Main St, New York, NY 10001`;
  },

  street: () => {
    if (currentLocale === 'th') {
      return `ถ.${utils.randomItem(thaiData.roads)}`;
    }
    if (typeof faker !== 'undefined' && faker.address) {
      setFakerLocale('en');
      return faker.address.streetName();
    }
    return 'Main Street';
  },

  postalCode: () => {
    if (currentLocale === 'th') {
      return utils.randomNumber(10100, 10900).toString();
    }
    if (typeof faker !== 'undefined' && faker.address) {
      setFakerLocale('en');
      return faker.address.zipCode();
    }
    return utils.randomNumber(10000, 99999).toString();
  },

  city: () => {
    if (currentLocale === 'th') {
      return utils.randomItem(thaiData.provinces);
    }
    if (typeof faker !== 'undefined' && faker.address) {
      setFakerLocale('en');
      return faker.address.city();
    }
    return 'New York';
  },

  state: () => {
    if (currentLocale === 'th') {
      return utils.randomItem(thaiData.provinces);
    }
    if (typeof faker !== 'undefined' && faker.address) {
      setFakerLocale('en');
      return faker.address.state();
    }
    return 'California';
  },

  country: () => {
    if (currentLocale === 'th') {
      return utils.randomItem(thaiData.countries);
    }
    if (typeof faker !== 'undefined' && faker.address) {
      setFakerLocale('en');
      return faker.address.country();
    }
    return 'United States';
  },

  // ===== Dates =====
  date: () => {
    const year = new Date().getFullYear();
    const month = utils.randomNumber(1, 12).toString().padStart(2, '0');
    const day = utils.randomNumber(1, 28).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  pastDate: () => {
    const year = new Date().getFullYear() - utils.randomNumber(1, 10);
    const month = utils.randomNumber(1, 12).toString().padStart(2, '0');
    const day = utils.randomNumber(1, 28).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  birthDate: () => {
    const year = new Date().getFullYear() - utils.randomNumber(20, 50);
    const month = utils.randomNumber(1, 12).toString().padStart(2, '0');
    const day = utils.randomNumber(1, 28).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  // ===== Identity Documents =====
  thaiNationalId: () => {
    const v = window.validators;
    let id = utils.randomNumber(1, 8).toString();
    id += utils.randomDigits(11);
    id += v.calculateThaiIdChecksum(id);
    return id;
  },

  thaiCorporateTaxId: () => {
    const v = window.validators;
    let id = '0';
    id += utils.randomDigits(11);
    id += v.calculateThaiIdChecksum(id);
    return id;
  },

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
    const v = window.validators;
    const prefixes = ['4', '51', '52', '53', '54', '55'];
    let cc = utils.randomItem(prefixes);
    while (cc.length < 15) {
      cc += Math.floor(Math.random() * 10);
    }
    cc += v.calculateLuhnChecksum(cc);
    return cc;
  },

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

  price: () => {
    if (currentLocale === 'th') {
      return utils.randomNumber(500, 5000).toString();
    }
    if (typeof faker !== 'undefined' && faker.finance) {
      return faker.finance.amount(10, 1000, 2);
    }
    return utils.randomNumber(10, 1000).toString();
  },

  amount: () => utils.randomNumber(1, 1000).toString(),

  // ===== Account =====
  username: () => {
    if (currentLocale === 'th') {
      return `user_${utils.randomId()}`;
    }
    if (typeof faker !== 'undefined' && faker.internet) {
      setFakerLocale('en');
      return faker.internet.userName();
    }
    return `user_${utils.randomId()}`;
  },

  password: () => {
    if (typeof faker !== 'undefined' && faker.internet) {
      return faker.internet.password(12, true);
    }
    return `Pass${utils.randomNumber(1000, 9999)}!`;
  },

  // ===== Business =====
  company: () => {
    if (currentLocale === 'th') {
      return utils.randomItem(thaiData.companies);
    }
    if (typeof faker !== 'undefined' && faker.company) {
      setFakerLocale('en');
      return faker.company.companyName();
    }
    return `Acme Corp ${utils.randomId()}`;
  },

  jobTitle: () => {
    if (currentLocale === 'th') {
      return utils.randomItem(thaiData.jobTitles);
    }
    if (typeof faker !== 'undefined' && faker.name) {
      setFakerLocale('en');
      return faker.name.jobTitle();
    }
    return 'Software Engineer';
  },

  // ===== Hotel/Travel =====
  roomNumber: () => `${utils.randomNumber(1, 9)}${utils.randomNumber(0, 9).toString().padStart(2, '0')}`,

  adults: () => utils.randomNumber(1, 4).toString(),

  children: () => utils.randomNumber(0, 2).toString(),

  nights: () => utils.randomNumber(1, 7).toString(),

  // ===== Generic =====
  number: () => utils.randomNumber(1, 100).toString(),

  text: () => {
    if (currentLocale === 'th') {
      return utils.randomItem(thaiData.notes);
    }
    if (typeof faker !== 'undefined' && faker.lorem) {
      return faker.lorem.sentence();
    }
    return 'This is test data for the form.';
  },

  paragraph: () => {
    if (currentLocale === 'th') {
      return thaiData.notes.slice(0, 3).join(' ');
    }
    if (typeof faker !== 'undefined' && faker.lorem) {
      return faker.lorem.paragraph();
    }
    return 'This is a test paragraph with multiple sentences. It contains enough text to fill a textarea field.';
  },

  url: () => {
    if (currentLocale === 'th') {
      return `https://www.example.co.th/${utils.randomId()}`;
    }
    if (typeof faker !== 'undefined' && faker.internet) {
      return faker.internet.url();
    }
    return `https://www.example.com/${utils.randomId()}`;
  },
};

// Export for use in other modules
window.generators = generators;
window.utils = utils;
window.thaiData = thaiData;
window.currentLocale = currentLocale;
window.setCurrentLocale = (locale) => { currentLocale = locale; window.currentLocale = locale; };
window.setFakerLocale = setFakerLocale;
