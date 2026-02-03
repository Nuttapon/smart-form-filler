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

// ===== Thai Data Collections (Extended) =====
const thaiData = {
  firstNames: [
    // ชายที่นิยม
    'สมชาย', 'วิชัย', 'ประเสริฐ', 'สุรชัย', 'อนันต์', 'ธนา', 'พิชัย', 'กิตติ', 'มานะ', 'สมศักดิ์',
    'ธนพล', 'ระวี', 'นที', 'ตะวัน', 'ชัยวัฒน์', 'วรพล', 'ณัฐพล', 'ภูมิ', 'ธีรเดช', 'อภิชาติ',
    'วีระ', 'สุทธิ', 'พงศ์พัฒน์', 'กฤษฎา', 'เอกชัย', 'ปรีชา', 'ศุภกิจ', 'จักรพันธ์', 'อรรถพล', 'ชนะ',
    'ธนกร', 'วรวุฒิ', 'ธนวัฒน์', 'สิทธิพร', 'ธนโชติ', 'พีรพัฒน์', 'กันต์', 'ภาณุ', 'ศักดิ์ชัย', 'ชาญวิทย์',
    // หญิงที่นิยม
    'สมหญิง', 'วิภา', 'ประภา', 'สุรีย์', 'อรุณี', 'ธนิดา', 'พิมพ์', 'กิตติยา', 'ชูใจ', 'พรทิพย์',
    'วรรณพร', 'สิริ', 'เมฆา', 'นภา', 'สุดา', 'รัตนา', 'วิไล', 'ศิริพร', 'สุภาพร', 'อรวรรณ',
    'พรรณี', 'ลดาวัลย์', 'นิตยา', 'จันทรา', 'มณี', 'สุวรรณี', 'พัชรี', 'นันทนา', 'วันดี', 'นฤมล',
    'กาญจนา', 'ปิยะนุช', 'ดาราวรรณ', 'ปรียา', 'อารยา', 'สุกัญญา', 'ภัทรา', 'ชนิดา', 'ณัฐกานต์', 'พิมพ์ใจ',
    // ชื่อรุ่นใหม่
    'มินตรา', 'แพรวา', 'ปณิดา', 'กานต์ธิดา', 'ณัฐณิชา', 'พลอยไพลิน', 'อรณิชา', 'ธนัชชา', 'พิชญา', 'ชญาดา'
  ],
  lastNames: [
    'สุขใจ', 'มั่นคง', 'รุ่งเรือง', 'เจริญสุข', 'ศรีสวัสดิ์', 'พงษ์พานิช', 'วงศ์สกุล', 'แสงทอง', 'ทองดี', 'สมบูรณ์',
    'พิทักษ์', 'รักษา', 'วิเศษสุข', 'ปัญญาสกุล', 'เลิศวิวัฒน์', 'สุขนิรันดร์', 'ดีประเสริฐ', 'วัฒนเมธี',
    'ใจเย็น', 'ใจดี', 'มีศรี', 'สิริวัฒน์', 'กุลวงศ์', 'โชติกุล', 'ตันติเมธี', 'บุญญานุภาพ', 'อมรเทพ', 'พรหมวิหาร',
    'จิตรกร', 'ภักดีสุข', 'วงศ์ประเสริฐ', 'ศักดิ์สิทธิ์', 'ธนาวุฒิ', 'กิจเจริญ', 'เกษมสุข', 'ชัยมงคล', 'อินทรสุข', 'สุทธิพงษ์',
    'วีระพงษ์', 'ศรีประสิทธิ์', 'บุญประสพ', 'ทรัพย์สิน', 'พัฒนประสิทธิ์', 'มหาดำรงค์', 'สวัสดิ์วงศ์', 'ธรรมวงศ์', 'พูนทรัพย์', 'เพชรดี'
  ],
  districts: [
    // กรุงเทพฯ
    'วัฒนา', 'คลองเตย', 'บางรัก', 'ปทุมวัน', 'สาทร', 'พระโขนง', 'บางนา', 'ห้วยขวาง', 'ดินแดง', 'จตุจักร',
    'ลาดพร้าว', 'พญาไท', 'ราชเทวี', 'บางซื่อ', 'บางกะปิ', 'บึงกุ่ม', 'สวนหลวง', 'คลองสามวา', 'มีนบุรี', 'หนองจอก',
    'ลาดกระบัง', 'ประเวศ', 'สะพานสูง', 'คันนายาว', 'วังทองหลาง', 'ราษฎร์บูรณะ', 'ทุ่งครุ', 'บางพลัด', 'บางกอกน้อย', 'บางกอกใหญ่',
    'ธนบุรี', 'คลองสาน', 'จอมทอง', 'บางขุนเทียน', 'บางบอน', 'ภาษีเจริญ', 'หนองแขม', 'ตลิ่งชัน', 'ทวีวัฒนา', 'บางแค',
    // เชียงใหม่
    'เมืองเชียงใหม่', 'หางดง', 'สันทราย', 'แม่ริม', 'ดอยสะเก็ด', 'สารภี'
  ],
  provinces: [
    'กรุงเทพมหานคร', 'เชียงใหม่', 'ภูเก็ต', 'ชลบุรี', 'นนทบุรี', 'สมุทรปราการ', 'ขอนแก่น', 'นครราชสีมา', 'สงขลา', 'นครสวรรค์',
    'อุดรธานี', 'เชียงราย', 'ลำปาง', 'พิษณุโลก', 'สุราษฎร์ธานี', 'ระยอง', 'ปทุมธานี', 'นครปฐม', 'สุพรรณบุรี', 'กระบี่',
    'พังงา', 'ตรัง', 'หาดใหญ่', 'อยุธยา', 'ราชบุรี', 'เพชรบุรี', 'ประจวบคีรีขันธ์', 'สมุทรสาคร', 'นครนายก', 'ฉะเชิงเทรา',
    'ปราจีนบุรี', 'สระบุรี', 'ลพบุรี', 'นครศรีธรรมราช', 'กาญจนบุรี', 'อุบลราชธานี', 'ร้อยเอ็ด', 'มหาสารคาม', 'บุรีรัมย์', 'สุรินทร์'
  ],
  roads: [
    'สุขุมวิท', 'รัชดาภิเษก', 'พหลโยธิน', 'ลาดพร้าว', 'สีลม', 'เพชรบุรี', 'วิภาวดีรังสิต', 'สาทร', 'ประดิษฐ์มนูธรรม',
    'พระราม 1', 'พระราม 2', 'พระราม 3', 'พระราม 4', 'พระราม 5', 'พระราม 6', 'พระราม 9', 'แจ้งวัฒนะ', 'ติวานนท์', 'งามวงศ์วาน',
    'บรมราชชนนี', 'กาญจนาภิเษก', 'ศรีนครินทร์', 'บางนา-ตราด', 'รามคำแหง', 'รามอินทรา', 'ประชาราษฎร์', 'ประชาอุทิศ', 'อ่อนนุช', 'พัฒนาการ',
    'เกษตร-นวมินทร์', 'นวมินทร์', 'เสนานิคม', 'ลาดปลาเค้า', 'ประเสริฐมนูกิจ', 'เอกมัย', 'ทองหล่อ', 'นราธิวาส', 'วิทยุ', 'เจริญกรุง'
  ],
  companies: [
    'บริษัท ทดสอบ จำกัด', 'หจก. สมมติ', 'บริษัท ซีพี ออลล์ จำกัด (มหาชน)', 'บริษัท ปตท. จำกัด (มหาชน)', 'บริษัท ไทยเบฟเวอเรจ จำกัด (มหาชน)',
    'ธนาคารกสิกรไทย', 'บริษัท แอดวานซ์ อินโฟร์ เซอร์วิส จำกัด (มหาชน)', 'บริษัท ทรู คอร์ปอเรชั่น จำกัด (มหาชน)', 'บริษัท เซ็นทรัล พัฒนา จำกัด (มหาชน)', 'ธนาคารไทยพาณิชย์',
    'บริษัท การบินไทย จำกัด (มหาชน)', 'บริษัท ปูนซิเมนต์ไทย จำกัด (มหาชน)', 'บริษัท บางจาก คอร์ปอเรชั่น จำกัด (มหาชน)', 'บริษัท กสท โทรคมนาคม จำกัด (มหาชน)',
    'บริษัท เมเจอร์ ซีนีเพล็กซ์ จำกัด (มหาชน)', 'บริษัท เดอะมอลล์ กรุ๊ป จำกัด', 'บริษัท โฮม โปรดักส์ เซ็นเตอร์ จำกัด (มหาชน)', 'บริษัท กรุงเทพดุสิตเวชการ จำกัด (มหาชน)',
    'บริษัท ไมเนอร์ อินเตอร์เนชั่นแนล จำกัด (มหาชน)', 'บริษัท อมรินทร์พริ้นติ้ง จำกัด (มหาชน)', 'บริษัท ซีพีเอฟ (ประเทศไทย) จำกัด (มหาชน)', 'บริษัท ดับเบิ้ล เอ จำกัด (มหาชน)',
    'บริษัท ไอ.ซี.ซี. อินเตอร์เนชั่นแนล จำกัด (มหาชน)', 'บริษัท บ้านปู จำกัด (มหาชน)', 'บริษัท พฤกษา โฮลดิ้ง จำกัด (มหาชน)', 'บริษัท แสนสิริ จำกัด (มหาชน)',
    'บริษัท ศุภาลัย จำกัด (มหาชน)', 'บริษัท แลนด์ แอนด์ เฮ้าส์ จำกัด (มหาชน)', 'บริษัท ออริจิ้น พร็อพเพอร์ตี้ จำกัด (มหาชน)', 'บริษัท เอพี (ไทยแลนด์) จำกัด (มหาชน)'
  ],
  jobTitles: [
    'ผู้จัดการฝ่ายขาย', 'วิศวกรซอฟต์แวร์', 'นักการตลาดดิจิทัล', 'ผู้อำนวยการโครงการ', 'หัวหน้าแผนกบัญชี', 'ที่ปรึกษาทางธุรกิจ', 'นักวาดภาพประกอบ', 'พนักงานต้อนรับ',
    'นักพัฒนาเว็บไซต์', 'ผู้จัดการร้าน', 'นักวิเคราะห์ข้อมูล', 'ผู้จัดการฝ่ายบุคคล', 'เลขานุการผู้บริหาร', 'พนักงานขาย', 'ช่างเทคนิค', 'นักออกแบบกราฟิก',
    'ผู้จัดการโครงการ', 'นักวิจัยและพัฒนา', 'ผู้อำนวยการฝ่ายการเงิน', 'ผู้ช่วยผู้จัดการ', 'นักกฎหมาย', 'นักบัญชี', 'ผู้ตรวจสอบภายใน', 'พนักงานบริการลูกค้า',
    'ผู้ประสานงาน', 'นักทรัพยากรมนุษย์', 'วิศวกรโยธา', 'สถาปนิก', 'นักจัดซื้อ', 'ผู้จัดการสำนักงาน', 'พนักงานธุรการ', 'นักแปล',
    'ผู้เชี่ยวชาญด้านไอที', 'นักวางแผนกลยุทธ์', 'ผู้จัดการฝ่ายปฏิบัติการ', 'หัวหน้าทีมพัฒนา', 'ผู้จัดการผลิตภัณฑ์', 'นักออกแบบ UI/UX', 'วิศวกรระบบ', 'นักวิเคราะห์ธุรกิจ'
  ],
  notes: [
    'ขอใบเสร็จรับเงินด้วยครับ',
    'กรุณาส่งสินค้าในช่วงเช้าเท่านั้น',
    'ไม่มีสัตว์เลี้ยง',
    'ต้องการห้องพักชั้นสูง',
    'ขอที่จอดรถใกล้ทางเข้า',
    'ขอบคุณมากครับสำหรับการบริการ',
    'รบกวนตรวจสอบสินค้าก่อนส่ง',
    'กรุณาโทรแจ้งก่อนจัดส่ง',
    'ฝากวางสินค้าไว้หน้าบ้านได้เลย',
    'ต้องการใบกำกับภาษี',
    'กรุณาจัดส่งวันจันทร์-ศุกร์',
    'ต้องการห้องเงียบ ห่างจากลิฟต์',
    'มีคนเฒ่าตามไม่สะดวกขึ้นบันได',
    'รบกวนติดต่อกลับทางไลน์ได้ครับ',
    'แพ้ถั่วและอาหารทะเล',
    'ต้องการเตียงเสริมสำหรับเด็ก',
    'ขอเช็คอินก่อนเวลาได้ไหมครับ',
    'รบกวนห่อของขวัญให้ด้วยครับ',
    'สินค้าชิ้นนี้เป็นของขวัญ ไม่ต้องใส่ใบราคา',
    'กรุณาเพิ่มน้ำแข็งมากๆ'
  ],
  countries: [
    'ประเทศไทย', 'ญี่ปุ่น', 'สหรัฐอเมริกา', 'สหราชอาณาจักร', 'ฝรั่งเศส', 'เยอรมนี', 'เกาหลีใต้', 'จีน', 'สิงคโปร์',
    'มาเลเซีย', 'อินโดนีเซีย', 'เวียดนาม', 'ฟิลิปปินส์', 'ออสเตรเลีย', 'นิวซีแลนด์', 'อินเดีย', 'ไต้หวัน', 'ฮ่องกง',
    'สเปน', 'อิตาลี', 'สวิตเซอร์แลนด์', 'เนเธอร์แลนด์', 'เบลเยียม', 'สวีเดน', 'นอร์เวย์', 'เดนมาร์ก', 'ฟินแลนด์', 'รัสเซีย',
    'แคนาดา', 'เม็กซิโก', 'บราซิล', 'อาร์เจนตินา', 'แอฟริกาใต้', 'อียิปต์', 'ตุรกี', 'สหรัฐอาหรับเอมิเรตส์', 'กาตาร์', 'ซาอุดิอาระเบีย'
  ]
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
      return faker.name.findName();
    }
    return `John ${utils.randomId()}`;
  },

  firstName: () => {
    if (currentLocale === 'th') {
      return utils.randomItem(thaiData.firstNames);
    }
    if (typeof faker !== 'undefined' && faker.name) {
      return faker.name.firstName();
    }
    return 'John';
  },

  lastName: () => {
    if (currentLocale === 'th') {
      return utils.randomItem(thaiData.lastNames);
    }
    if (typeof faker !== 'undefined' && faker.name) {
      return faker.name.lastName();
    }
    return 'Smith';
  },

  // ===== Contact =====
  email: () => {
    if (typeof faker !== 'undefined' && faker.internet) {
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
      return `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`;
    }
    return `${utils.randomNumber(1, 999)} Main St, New York, NY 10001`;
  },

  street: () => {
    if (currentLocale === 'th') {
      return `ถ.${utils.randomItem(thaiData.roads)}`;
    }
    if (typeof faker !== 'undefined' && faker.address) {
      return faker.address.streetName();
    }
    return 'Main Street';
  },

  postalCode: () => {
    if (currentLocale === 'th') {
      return utils.randomNumber(10100, 10900).toString();
    }
    if (typeof faker !== 'undefined' && faker.address) {
      return faker.address.zipCode();
    }
    return utils.randomNumber(10000, 99999).toString();
  },

  city: () => {
    if (currentLocale === 'th') {
      return utils.randomItem(thaiData.provinces);
    }
    if (typeof faker !== 'undefined' && faker.address) {
      return faker.address.city();
    }
    return 'New York';
  },

  state: () => {
    if (currentLocale === 'th') {
      return utils.randomItem(thaiData.provinces);
    }
    if (typeof faker !== 'undefined' && faker.address) {
      return faker.address.state();
    }
    return 'California';
  },

  country: () => {
    if (currentLocale === 'th') {
      return utils.randomItem(thaiData.countries);
    }
    if (typeof faker !== 'undefined' && faker.address) {
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
      return faker.company.companyName();
    }
    return `Acme Corp ${utils.randomId()}`;
  },

  jobTitle: () => {
    if (currentLocale === 'th') {
      return utils.randomItem(thaiData.jobTitles);
    }
    if (typeof faker !== 'undefined' && faker.name) {
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
