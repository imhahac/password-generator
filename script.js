/**
 * Password Generator Application
 * Encapsulated in App namespace to avoid global scope pollution.
 */
const App = {
  // Configuration & State
  config: {
    chars: {
      numbers: "0123456789",
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      symbols: "!@#$%^&*",
      special: "+-.:;=~?`'\"|\\/<>()[]{}"
    },
    defaultExclude: "ilI1oO02Z8B"
  },

  // UI References (cached on init)
  ui: {},

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.updatePreview();
    this.syncLength('number'); // Initialize length display
  },

  cacheDOM() {
    this.ui = {
      length: document.getElementById("length"),
      lengthRange: document.getElementById("lengthRange"),
      lengthVal: document.getElementById("lengthVal"),
      count: document.getElementById("count"),
      numbers: document.getElementById("numbers"),
      uppercase: document.getElementById("uppercase"),
      lowercase: document.getElementById("lowercase"),
      symbols: document.getElementById("symbols"),
      special: document.getElementById("special"),
      custom: document.getElementById("custom"),
      shuffle: document.getElementById("shuffle"),
      excludeDefault: document.getElementById("excludeDefault"),
      excludeCustom: document.getElementById("excludeCustom"),
      prefix: document.getElementById("prefix"),
      suffix: document.getElementById("suffix"),
      preview: document.getElementById("preview"),
      output: document.getElementById("output"),
      validation: document.getElementById("validation"),
      suggestion: document.getElementById("suggestion"),
      strength: document.getElementById("strength"),
      strengthBar: document.getElementById("strengthBar"),
      toastContainer: document.getElementById("toast-container")
    };
  },

  bindEvents() {
    // Input changes that affect preview
    const inputs = [
      this.ui.numbers, this.ui.uppercase, this.ui.lowercase,
      this.ui.symbols, this.ui.special, this.ui.custom,
      this.ui.excludeDefault, this.ui.excludeCustom,
      this.ui.prefix, this.ui.suffix, this.ui.length
    ];
    inputs.forEach(input => {
      if (input) input.addEventListener('input', () => this.updatePreview());
    });

    // Length sync
    this.ui.length.addEventListener('input', () => this.syncLength('number'));
    this.ui.lengthRange.addEventListener('input', () => this.syncLength('range'));

    // Global buttons (attached via onclick in HTML, but we can also bind here if we removed onclicks)
    // improved: We'll keep HTML onclicks for simplicity or attach here. 
    // Let's expose methods to window for HTML access or bind them here.
    // For cleaner HTML, proper binding is better, but let's stick to window export for compatibility with existing HTML.
  },

  getCharPool() {
    let chars = "";
    if (this.ui.numbers.checked) chars += this.config.chars.numbers;
    if (this.ui.uppercase.checked) chars += this.config.chars.uppercase;
    if (this.ui.lowercase.checked) chars += this.config.chars.lowercase;
    if (this.ui.symbols.checked) chars += this.config.chars.symbols;
    if (this.ui.special.checked) chars += this.config.chars.special;
    chars += this.ui.custom.value;

    if (this.ui.excludeDefault.checked) {
      chars = chars.split("").filter(c => !this.config.defaultExclude.includes(c)).join("");
    }

    const excludeCustom = this.ui.excludeCustom.value;
    if (excludeCustom) {
      chars = chars.split("").filter(c => !excludeCustom.includes(c)).join("");
    }

    return chars;
  },

  colorizeChar(c) {
    if (this.config.chars.numbers.includes(c)) return `<span class="num">${c}</span>`;
    if (this.config.chars.uppercase.includes(c)) return `<span class="upper">${c}</span>`;
    if (this.config.chars.lowercase.includes(c)) return `<span class="lower">${c}</span>`;
    if (this.config.chars.symbols.includes(c)) return `<span class="symbol">${c}</span>`;
    if (this.config.chars.special.includes(c)) return `<span class="special">${c}</span>`;
    return `<span class="custom">${c}</span>`;
  },

  updatePreview() {
    const chars = this.getCharPool();
    if (chars) {
      const colored = chars.split("").map(c => this.colorizeChar(c)).join("");
      this.ui.preview.innerHTML = "Pool: " + colored;
    } else {
      this.ui.preview.textContent = "Pool: (None selected)";
    }
    this.validateSettings();
    this.evaluateStrength();
  },

  validateSettings() {
    const length = parseInt(this.ui.length.value);
    const prefix = this.ui.prefix.value;
    const suffix = this.ui.suffix.value;

    this.ui.validation.textContent = "";
    this.ui.suggestion.textContent = "";

    const reserved = prefix.length + suffix.length;
    if (reserved > length) {
      this.ui.validation.textContent = `❌ Length too short! (${length}), reserved (${reserved}).`;
    } else if (reserved === length) {
      this.ui.validation.textContent = `⚠️ Length equals reserved, no random chars.`;
    }

    if (length < 8) {
      this.ui.suggestion.textContent = "🔒 Suggest length >= 8 for better security.";
    } else if (length >= 16) {
      this.ui.suggestion.textContent = "👍 Strong length, good security.";
    }

    const chars = this.getCharPool();
    if (!chars) {
      this.ui.suggestion.textContent = "⚠️ Please select at least one character type.";
    }
  },

  evaluateStrength() {
    const length = parseInt(this.ui.length.value);
    const chars = this.getCharPool();

    if (!chars) {
      this.ui.strength.textContent = "";
      this.ui.strengthBar.style.width = "0%";
      return;
    }

    const poolSize = chars.length;
    const score = Math.log2(poolSize) * length;

    let level = "";
    let percent = 0;
    let color = "";

    if (score < 40) {
      level = "Weak 🔴";
      percent = 33;
      color = "var(--danger-color)";
    } else if (score < 80) {
      level = "Medium 🟡";
      percent = 66;
      color = "var(--warning-color)";
    } else {
      level = "Strong 🟢";
      percent = 100;
      color = "var(--success-color)";
    }

    this.ui.strength.textContent = "Strength: " + level;
    this.ui.strength.style.color = color;
    this.ui.strengthBar.style.width = percent + "%";
    this.ui.strengthBar.style.backgroundColor = color;
  },

  syncLength(source) {
    if (source === 'range') {
      this.ui.length.value = this.ui.lengthRange.value;
    } else {
      this.ui.lengthRange.value = this.ui.length.value;
    }
    this.ui.lengthVal.textContent = this.ui.length.value;
    this.updatePreview();
  },

  shuffleString(str) {
    return str.split("").sort(() => Math.random() - 0.5).join("");
  },

  generate() {
    const length = parseInt(this.ui.length.value);
    const count = parseInt(this.ui.count.value);
    const chars = this.getCharPool();
    const prefix = this.ui.prefix.value;
    const suffix = this.ui.suffix.value;

    const reserved = prefix.length + suffix.length;
    if (reserved > length) {
      this.showToast("Length too short! / 密碼長度不足", "error");
      return;
    }

    if (!chars) {
      this.showToast("Please select at least one character type!", "error");
      return;
    }

    let resultHTML = "";
    for (let i = 0; i < count; i++) {
      let pwd = "";
      for (let j = 0; j < length - reserved; j++) {
        pwd += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      if (this.ui.shuffle.checked) {
        pwd = this.shuffleString(pwd);
      }
      pwd = prefix + pwd + suffix;

      const coloredPwd = pwd.split("").map(c => this.colorizeChar(c)).join("");

      // Accessibility: tabindex=0 and role=button
      // Logic: onclick copies, onkeydown handles Enter/Space
      resultHTML += `
        <div class="pwd-card" 
             role="button" 
             tabindex="0"
             onclick="App.copyOne(this, '${pwd}')" 
             onkeydown="if(event.key==='Enter'||event.key===' ') { event.preventDefault(); App.copyOne(this, '${pwd}'); }"
             title="Click to copy">
          ${coloredPwd}
        </div>`;
    }

    this.ui.output.innerHTML = resultHTML;
  },

  copyOne(element, text) {
    navigator.clipboard.writeText(text).then(() => {
      // Visual feedback via class
      element.classList.add('copied');
      setTimeout(() => {
        element.classList.remove('copied');
      }, 500);
      this.showToast("Copied!", "success");
    }).catch(err => {
      this.showToast("Failed to copy", "error");
    });
  },

  copyAll() {
    const cards = document.querySelectorAll(".pwd-card");
    if (cards.length === 0) {
      this.showToast("No passwords to copy!", "warning");
      return;
    }
    const texts = Array.from(cards).map(card => card.innerText).join("\n");
    navigator.clipboard.writeText(texts).then(() => {
      this.showToast("Copied all passwords!", "success");
    });
  },

  download() {
    const cards = document.querySelectorAll(".pwd-card");
    if (cards.length === 0) {
      this.showToast("No passwords to download!", "warning");
      return;
    }
    const texts = Array.from(cards).map(card => card.innerText).join("\n");

    const blob = new Blob([texts], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "passwords.txt";
    link.click();
  },

  reset() {
    this.ui.length.value = 12;
    this.ui.lengthRange.value = 12;
    this.ui.lengthVal.textContent = "12";
    this.ui.count.value = 5;
    this.ui.numbers.checked = true;
    this.ui.uppercase.checked = true;
    this.ui.lowercase.checked = true;
    this.ui.symbols.checked = false;
    this.ui.special.checked = false;
    this.ui.custom.value = "";
    this.ui.shuffle.checked = false;
    this.ui.excludeDefault.checked = true;
    this.ui.excludeCustom.value = "";
    this.ui.prefix.value = "";
    this.ui.suffix.value = "";
    this.ui.output.innerHTML = "";
    this.ui.validation.textContent = "";
    this.ui.suggestion.textContent = "";
    this.ui.strength.textContent = "";
    this.ui.strengthBar.style.width = "0%";

    this.updatePreview();
    this.showToast("Settings reset", "success");
  },

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    // Optional icon based on type
    // We could add SVG icons here for extra polish

    this.ui.toastContainer.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => {
        if (toast.parentElement) toast.remove();
      }, 300);
    }, 3000);
  }
};

// Expose methods to global scope for HTML onclick handlers
// (Alternatively, we could rewrite HTML to remove onclick handlers and do everything in JS, 
// but this keeps the HTML clean from JS logic changes while maintaining compatibility)
window.generate = () => App.generate();
window.copyPasswords = () => App.copyAll();
window.downloadPasswords = () => App.download();
window.resetAll = () => App.reset();
window.updatePreview = () => App.updatePreview();
window.syncLength = (s) => App.syncLength(s);
window.App = App; // For copyOne which is dynamic

// Initialize on load
window.onload = function () {
  App.init();
};
