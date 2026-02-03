# 🐈 Smart Form Filler

Chrome Extension for auto-detecting and filling form fields with validated test data.

## ✨ Features

- 🔍 **Auto Detect** - Automatically scans form fields (input, textarea, select)
- 🎯 **Smart Recognition** - Detects field types from name, id, placeholder, label
- ✅ **Validated Data** - Generates valid checksums (Thai National ID, Credit Cards)
- 🌏 **EN/TH Toggle** - Switch between English and Thai data
- 🔗 **Linked Fields** - Supports confirmation fields (email, password)
- ⚡ **Framework Ready** - Works with React, Vue, Angular

## 📦 Installation

1. Clone repository
   ```bash
   git clone https://github.com/Nuttapon/smart-form-filler
   ```

2. Open `chrome://extensions/`

3. Enable **Developer mode** (top right)

4. Click **Load unpacked** → Select the `smart-form-filler` folder

## 🚀 Usage

1. Navigate to any webpage with a form
2. Click the extension icon
3. Review detected fields / Toggle EN or TH
4. Click **🎲 Randomize** to generate new values
5. Click **✨ Fill Form** to populate the form

## 📁 Project Structure

```
smart-form-filler/
├── manifest.json       # Extension config
├── popup.html          # UI (HTML + CSS)
├── popup.js            # Main logic, event handlers
├── generators.js       # Data generators + Thai data
├── validators.js       # Checksum algorithms (Mod11, Luhn)
├── fieldPatterns.js    # Field detection patterns + grouping
├── libs/
│   └── faker.min.js    # Faker.js v5.5.3
└── icons/
    └── icon128.png
```

## 🔐 Validated Generators

| Type | Algorithm | Example |
|------|-----------|---------|
| Thai National ID | Mod 11 | 1234567890127 |
| Corporate Tax ID | Mod 11 (starts with 0) | 0123456789012 |
| Credit Card | Luhn | 4532015112830366 |

## 🎯 Supported Fields

**Personal**: name, firstName, lastName, birthDate  
**Contact**: email, phone, address, city, postalCode  
**Identity**: thaiNationalId, thaiCorporateTaxId, passport  
**Payment**: creditCard, cvv, expiryDate  
**Account**: username, password (+ confirmation)  
**Booking**: checkIn, checkOut, adults, children, nights  
**Business**: company, jobTitle

## 🔧 Customization

### Add New Pattern

Edit `fieldPatterns.js`:

```javascript
// Add to fieldPatterns array
{ 
  patterns: ['booking_id', 'reservation_id'], 
  generator: 'bookingId', 
  label: 'Booking ID' 
}
```

### Add New Generator

Edit `generators.js`:

```javascript
// Add to generators object
bookingId: () => `BK${new Date().getFullYear()}${utils.randomNumber(10000, 99999)}`
```

## 📝 License

MIT License
