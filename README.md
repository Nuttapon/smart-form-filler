# ⚡ Smart Form Filler

Chrome Extension for auto-detecting and filling form fields with smart, validated test data.

## ✨ Features

- **Auto Detect** - Automatically scans for form fields (input, textarea, select)
- **Smart Recognition** - Detects field types from name, id, type, placeholder, label
- **Validated Data** - Generates valid IDs with proper checksums (Thai National ID, Credit Cards)
- **Multi-Language** - Toggle between English and Thai data generation
- **Preview Before Fill** - Preview generated values before filling
- **Selective Fill** - Choose which fields to fill
- **Type Override** - Manually change detected field type
- **Re-randomize** - Generate new random values anytime
- **Framework Compatible** - Works with React, Vue, Angular, and other frameworks

## 🔐 Validated Generators

| Generator | Validation | Example |
|-----------|------------|---------|
| Thai National ID | Mod 11 checksum | 1234567890127 |
| Corporate Tax ID | Starts with 0 + checksum | 0123456789012 |
| Credit Card | Luhn algorithm | 4532015112830366 |
| Passport | Standard format | AB1234567 |

## 📦 Installation

### Method 1: Load Unpacked (Development)

1. Clone or download this repository
   ```bash
   git clone https://github.com/Nuttapon/smart-form-filler
   ```

2. Open Chrome and go to `chrome://extensions/`

3. Enable **Developer mode** (top right corner)

4. Click **Load unpacked**

5. Select the `smart-form-filler` folder

6. The extension will appear in your toolbar ✅

### Method 2: Share with Team

**Option A: Via Git**
```bash
# Everyone clones the repo
git clone https://github.com/YOUR_USERNAME/smart-form-filler.git

# Then follow Load Unpacked steps above
```

**Option B: Via ZIP**
1. Download repository as ZIP
2. Share ZIP with team
3. Extract and Load unpacked

**Option C: Chrome Web Store (Optional)**
- Requires $5 one-time registration fee
- See [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)

## 🎯 Supported Field Types

| Type | Pattern Examples | Generated Data |
|------|------------------|----------------|
| Name | `name`, `full_name`, `guest_name` | John Smith / สมชาย สุขใจ |
| Email | `email`, `e-mail` | john_abc123@gmail.com |
| Phone | `phone`, `mobile`, `tel` | +12025551234 / 0812345678 |
| Address | `address`, `street` | 123 Main St, New York, NY |
| Date | `date`, `check_in`, `check_out` | 2024-02-15 |
| Thai ID | `id_card`, `citizen_id`, `national_id` | Valid 13-digit with checksum |
| Tax ID | `tax_id`, `corporate_tax` | Valid corporate/individual ID |
| Credit Card | `credit_card`, `card_number` | Valid 16-digit with Luhn |
| CVV | `cvv`, `cvc`, `security_code` | 123 |
| Expiry | `expiry`, `exp_date` | 03/28 |
| Passport | `passport` | AB1234567 |
| Room Number | `room_number`, `room` | 301 |
| Adults/Children | `adults`, `children` | 2, 1 |
| Notes | `note`, `comment`, `remark` | Test data |

## 🔧 Customization

### Add New Pattern

Edit `popup.js` in the `fieldPatterns` array:

```javascript
const fieldPatterns = [
  // Add new pattern
  { 
    patterns: ['booking_id', 'reservation_id'], 
    generator: 'bookingId', 
    label: 'Booking ID' 
  },
  // ...
];
```

### Add New Generator

```javascript
const generators = {
  // Add new generator
  bookingId: () => `BK${new Date().getFullYear()}${utils.randomNumber(10000, 99999)}`,
  // ...
};
```

### Add Generator to Dropdown

```javascript
const generatorOptions = [
  // ...existing options
  { value: 'bookingId', label: 'Booking ID' },
];
```

## 📁 Project Structure

```
smart-form-filler/
├── manifest.json      # Extension configuration
├── popup.html         # Popup UI (dark theme)
├── popup.js           # Main logic & generators
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## 🚀 Usage

1. Navigate to any webpage with a form
2. Click the Smart Form Filler extension icon
3. Review detected fields and generated values
4. Toggle locale (EN/TH) as needed
5. Override field types if detection is incorrect
6. Uncheck any fields you don't want to fill
7. Click **🎲 Randomize** to generate new values
8. Click **⚡ Fill Form** to populate the form

## 🔬 Validation Algorithms

### Thai National ID (Mod 11)
```javascript
// First 12 digits × positional weights, mod 11
let sum = 0;
for (let i = 0; i < 12; i++) {
  sum += parseInt(id[i]) * (13 - i);
}
const checksum = (11 - (sum % 11)) % 10;
```

### Credit Card (Luhn)
```javascript
// Double every second digit from right, sum all digits
// Valid if total % 10 === 0
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-field-type`)
3. Commit changes (`git commit -m 'Add new field type'`)
4. Push to branch (`git push origin feature/new-field-type`)
5. Create a Pull Request

## 📝 License

MIT License - Free to use for personal and commercial purposes.

## 🐛 Known Issues

- Some websites with Shadow DOM may not detect all fields
- Custom web components may require adding patterns manually

## 📮 Feedback

Have issues or feature requests? Create an [Issue](https://github.com/YOUR_USERNAME/smart-form-filler/issues)!
