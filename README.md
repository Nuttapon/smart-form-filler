# 🔧 Smart Form Filler

Chrome Extension สำหรับ auto-detect และ fill form fields ด้วย random test data

## ✨ Features

- **Auto Detect** - สแกนหา form fields อัตโนมัติ (input, textarea, select)
- **Smart Recognition** - ตรวจจับประเภท field จาก name, id, type, placeholder, label
- **Thai Support** - รองรับการ generate ข้อมูลภาษาไทย (ชื่อ, ที่อยู่, เบอร์โทร)
- **Preview Before Fill** - ดู preview ค่าที่จะใส่ก่อน fill จริง
- **Selective Fill** - เลือกได้ว่าจะ fill field ไหนบ้าง
- **Re-random** - กดสุ่มค่าใหม่ได้ไม่จำกัด
- **Framework Compatible** - รองรับ React, Vue, Angular และ framework อื่นๆ

## 📦 Installation

### วิธีที่ 1: Load Unpacked (สำหรับ Development)

1. Clone หรือ download repository นี้
   ```bash
   git clone https://github.com/Nuttapon/smart-form-filler
   ```

2. เปิด Chrome แล้วไปที่ `chrome://extensions/`

3. เปิด **Developer mode** (มุมบนขวา)

4. คลิก **Load unpacked**

5. เลือก folder `smart-form-filler`

6. Extension จะปรากฏใน toolbar ✅

### วิธีที่ 2: Share ให้ทีม

**Option A: Share ผ่าน Git**
```bash
# ทุกคนในทีม clone repo
git clone https://github.com/YOUR_USERNAME/smart-form-filler.git

# แล้วทำตามขั้นตอน Load Unpacked ด้านบน
```

**Option B: Share เป็น ZIP**
1. Download repository เป็น ZIP
2. แจก ZIP ให้ทีม
3. แตก ZIP แล้ว Load unpacked

**Option C: Publish ใน Chrome Web Store (Optional)**
- ต้องจ่ายค่าลงทะเบียน $5 ครั้งเดียว
- ดูวิธีที่ [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)

## 🎯 Supported Field Types

| ประเภท | ตัวอย่าง Pattern | ข้อมูลที่ Generate |
|--------|------------------|-------------------|
| ชื่อ | `name`, `full_name`, `guest_name` | สมชาย สุขใจ / John Smith |
| อีเมล | `email`, `e-mail` | test_abc123@gmail.com |
| โทรศัพท์ | `phone`, `mobile`, `tel` | 0812345678 |
| ที่อยู่ | `address`, `street` | 123/45 ถ.สุขุมวิท วัฒนา กรุงเทพฯ |
| วันที่ | `date`, `check_in`, `check_out` | 2024-02-15 |
| บัตร ปชช. | `id_card`, `citizen_id` | 1234567890123 |
| เลขห้อง | `room_number`, `room` | 301 |
| จำนวนคน | `adults`, `children` | 2, 1 |
| หมายเหตุ | `note`, `comment`, `remark` | ทดสอบระบบ |

## 🔧 Customization

### เพิ่ม Pattern ใหม่

แก้ไขไฟล์ `popup.js` ในส่วน `fieldPatterns`:

```javascript
const fieldPatterns = [
  // เพิ่ม pattern ใหม่
  { 
    patterns: ['booking_id', 'reservation_id', 'รหัสจอง'], 
    generator: 'bookingId', 
    label: 'รหัสการจอง' 
  },
  // ...
];
```

### เพิ่ม Generator ใหม่

```javascript
const generators = {
  // เพิ่ม generator ใหม่
  bookingId: () => `BK${new Date().getFullYear()}${generators.randomNumber(10000, 99999)}`,
  // ...
};
```

## 📁 Project Structure

```
smart-form-filler/
├── manifest.json      # Extension configuration
├── popup.html         # Popup UI
├── popup.js           # Main logic & generators
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## 🤝 Contributing

1. Fork repository
2. สร้าง branch ใหม่ (`git checkout -b feature/new-field-type`)
3. Commit changes (`git commit -m 'Add new field type'`)
4. Push to branch (`git push origin feature/new-field-type`)
5. สร้าง Pull Request

## 📝 License

MIT License - ใช้ได้อิสระทั้งส่วนตัวและเชิงพาณิชย์

## 🐛 Known Issues

- บาง website ที่ใช้ Shadow DOM อาจไม่ detect fields ได้ทั้งหมด
- Custom web components อาจต้องเพิ่ม pattern เอง

## 📮 Feedback

มีปัญหาหรือ feature request? สร้าง [Issue](https://github.com/YOUR_USERNAME/smart-form-filler/issues) ได้เลย!
