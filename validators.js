// ===== Validators & Checksum Algorithms =====
// Exported for use in generators.js and popup.js

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

// Export for use in other modules
window.validators = validators;
