/**
 * Password Generator Application
 */
const App = {
  // --- Configuration & State ---
  state: {
    lang: 'en',
    theme: 'light',
    mode: 'password', // 'password' | 'passphrase'
    history: []
  },

  config: {
    chars: {
      numbers: "0123456789",
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      symbols: "!@#$%^&*",
      special: "+-.:;=~?`'\"|\\/<>()[]{}"
    },
    defaultExclude: "ilI1oO02Z8B",
    historyMax: 10
  },

  // Simplified Word List for Passphrases (subset of Effery)
  wordList: [
    "able", "about", "account", "acid", "across", "act", "addition", "adjustment", "advertisement", "after", "again", "against", "agreement", "air", "all", "almost", "among", "amount", "amusement", "and", "angle", "angry", "animal", "answer", "ant", "any", "apparatus", "apple", "approval", "arch", "argument", "arm", "army", "art", "as", "at", "attack", "attempt", "attention", "attraction", "authority", "automatic", "awake", "baby", "back", "bad", "bag", "balance", "ball", "band", "base", "basin", "basket", "bath", "beautiful", "because", "bed", "bee", "before", "behaviour", "belief", "bell", "bent", "berry", "between", "bird", "birth", "bit", "bite", "bitter", "black", "blade", "blood", "blow", "blue", "board", "boat", "body", "boiling", "bone", "book", "boot", "bottle", "box", "boy", "brain", "brake", "branch", "brass", "bread", "breath", "brick", "bridge", "bright", "broken", "brother", "brown", "brush", "bucket", "building", "bulb", "burn", "burst", "business", "but", "butter", "button", "by", "cake", "camera", "canvas", "card", "care", "carriage", "cart", "cat", "cause", "certain", "chain", "chalk", "chance", "change", "cheap", "cheese", "chemical", "chest", "chief", "chin", "church", "circle", "clean", "clear", "clock", "cloth", "cloud", "coal", "coat", "cold", "collar", "comb", "come", "comfort", "committee", "common", "company", "comparison", "competition", "complete", "complex", "condition", "connection", "conscious", "control", "cook", "copper", "copy", "cord", "cork", "cotton", "cough", "country", "cover", "cow", "crack", "credit", "crime", "cruel", "crush", "cry", "cup", "cupboard", "current", "curtain", "curve", "cushion", "damage", "danger", "dark", "daughter", "day", "dead", "dear", "death", "debt", "decision", "deep", "degree", "delicate", "dependent", "design", "desire", "destruction", "detail", "development", "different", "digestion", "direction", "dirty", "discovery", "discussion", "disease", "disgust", "distance", "distribution", "division", "do", "dog", "door", "doubt", "down", "drain", "drawer", "dress", "drink", "driving", "drop", "dry", "dust", "ear", "early", "earth", "east", "edge", "education", "effect", "egg", "elastic", "electric", "end", "engine", "enough", "equal", "error", "even", "event", "ever", "every", "example", "exchange", "existence", "expansion", "experience", "expert", "eye", "face", "fact", "fall", "false", "family", "far", "farm", "fat", "father", "fear", "feather", "feeble", "feeling", "female", "fertile", "fiction", "field", "fight", "finger", "fire", "first", "fish", "fixed", "flag", "flame", "flat", "flight", "floor", "flower", "fly", "fold", "food", "foolish", "foot", "for", "force", "fork", "form", "forward", "fowl", "frame", "free", "frequent", "friend", "from", "front", "fruit", "full", "future", "garden", "general", "get", "girl", "give", "glass", "glove", "go", "goat", "gold", "good", "government", "grain", "grass", "great", "green", "grey", "grip", "group", "growth", "guide", "gun", "hair", "hammer", "hand", "hanging", "happy", "harbour", "hard", "harmony", "hat", "hate", "have", "he", "head", "healthy", "hearing", "heart", "heat", "help", "high", "history", "hole", "hollow", "hook", "hope", "horn", "horse", "hospital", "hour", "house", "how", "humour", "ice", "idea", "if", "ill", "important", "impulse", "in", "increase", "industry", "ink", "insect", "instrument", "insurance", "interest", "invention", "iron", "island", "jelly", "jewel", "join", "journey", "judge", "jump", "keep", "kettle", "key", "kick", "kind", "kiss", "knee", "knife", "knot", "knowledge", "land", "language", "last", "late", "laugh", "law", "lead", "leaf", "learning", "leather", "left", "leg", "let", "letter", "level", "library", "lift", "light", "like", "limit", "line", "linen", "lip", "liquid", "list", "little", "living", "lock", "long", "look", "loose", "loss", "loud", "love", "low", "machine", "make", "male", "man", "manager", "map", "mark", "market", "married", "mass", "match", "material", "may", "meal", "measure", "meat", "medical", "meeting", "memory", "metal", "middle", "military", "milk", "mind", "mine", "minute", "mist", "mixed", "money", "monkey", "month", "moon", "morning", "mother", "motion", "mountain", "mouth", "move", "much", "muscle", "music", "nail", "name", "narrow", "nation", "natural", "near", "necessary", "neck", "need", "needle", "nerve", "net", "new", "news", "night", "no", "noise", "normal", "north", "nose", "not", "note", "now", "number", "nut", "observation", "of", "off", "offer", "office", "oil", "old", "on", "only", "open", "operation", "opinion", "opposite", "or", "orange", "order", "organization", "ornament", "other", "out", "oven", "over", "owner", "page", "pain", "paint", "paper", "parallel", "parcel", "part", "past", "paste", "payment", "peace", "pen", "pencil", "person", "physical", "picture", "pig", "pin", "pipe", "place", "plane", "plant", "plate", "play", "please", "pleasure", "plough", "pocket", "point", "poison", "polish", "political", "poor", "porter", "position", "possible", "pot", "potato", "powder", "power", "present", "price", "print", "prison", "private", "probable", "process", "produce", "profit", "property", "prose", "protest", "public", "pull", "pump", "punishment", "purpose", "push", "put", "quality", "question", "quick", "quiet", "quite", "rail", "rain", "range", "rat", "rate", "ray", "reaction", "reading", "ready", "reason", "receipt", "record", "red", "regret", "regular", "relation", "religion", "representative", "request", "respect", "responsible", "rest", "reward", "rhythm", "rice", "right", "ring", "river", "road", "rod", "roll", "roof", "room", "root", "rough", "round", "rub", "rule", "run", "sad", "safe", "sail", "salt", "same", "sand", "say", "scale", "school", "science", "scissors", "screw", "sea", "seat", "second", "secret", "secretary", "see", "seed", "seem", "selection", "self", "send", "sense", "separate", "serious", "servant", "sex", "shade", "shake", "shame", "sharp", "sheep", "shelf", "ship", "shirt", "shock", "shoe", "short", "shut", "side", "sign", "silk", "silver", "simple", "sister", "size", "skin", "skirt", "sky", "sleep", "slip", "slope", "slow", "small", "smash", "smell", "smile", "smoke", "smooth", "snake", "sneeze", "snow", "soap", "society", "sock", "soft", "solid", "some", "son", "song", "sort", "sound", "soup", "south", "space", "spade", "special", "sponge", "spoon", "spring", "square", "stage", "stamp", "star", "start", "statement", "station", "steam", "steel", "stem", "step", "stick", "sticky", "stiff", "still", "stitch", "stocking", "stomach", "stone", "stop", "store", "story", "straight", "strange", "street", "stretch", "strong", "structure", "substance", "such", "sudden", "sugar", "suggestion", "summer", "sun", "support", "surprise", "sweet", "swim", "system", "table", "tail", "take", "talk", "tall", "taste", "tax", "teaching", "tendency", "test", "than", "that", "the", "then", "theory", "there", "thick", "thin", "thing", "this", "thought", "thread", "throat", "through", "thumb", "thunder", "ticket", "tight", "till", "time", "tin", "tired", "to", "toe", "together", "tomorrow", "tongue", "tooth", "top", "touch", "town", "trade", "train", "transport", "tray", "tree", "trick", "trouble", "trousers", "true", "turn", "twist", "umbrella", "under", "unit", "up", "use", "value", "verse", "very", "vessel", "view", "violent", "voice", "waiting", "walk", "wall", "war", "warm", "wash", "waste", "watch", "water", "wave", "wax", "way", "weather", "week", "weight", "well", "west", "wet", "wheel", "when", "where", "while", "whip", "whistle", "white", "who", "why", "wide", "will", "wind", "window", "wine", "wing", "winter", "wire", "wise", "with", "woman", "wood", "wool", "word", "work", "worm", "wound", "writing", "wrong", "year", "yellow", "yes", "yesterday", "you", "young"
  ],

  // Translations
  translations: {
    en: {
      title: "Password Generator",
      subtitle: "Secure, Random, Customizable",
      tabPassword: "Password",
      tabPassphrase: "Passphrase",
      basicSettings: "Basic Settings",
      optNumbers: "Numbers (0-9)",
      optUppercase: "Uppercase (A-Z)",
      optLowercase: "Lowercase (a-z)",
      optSymbols: "Common Symbols (!@#$%^&*)",
      optSpecial: "Special Symbols (+-,.:;=~?`'\"|\\<>()[]{})",
      lblCustom: "Custom Characters",
      phCustom: "e.g., @#$",
      advancedSettings: "Advanced Settings",
      optShuffle: "Shuffle Result",
      optExcludeSimilar: "Exclude Similar (i l 1 O 0 etc.)",
      lblExclude: "Exclude Characters",
      phExclude: "e.g., abc",
      lblPrefix: "Fixed Prefix",
      phPrefix: "Start with...",
      lblSuffix: "Fixed Suffix",
      phSuffix: "End with...",
      passphraseSettings: "Passphrase Settings",
      lblSeparator: "Separator",
      optRandomNum: "Random Number",
      optCapitalize: "Capitalize Words",
      optIncludeNumber: "Include Number",
      genRules: "Generation Rules",
      lblLength: "Password Length",
      lblWordCount: "Word Count",
      lblQuantity: "Quantity to Generate",
      btnGenerate: "⚡ Generate",
      btnCopyAll: "📋 Copy All",
      btnDownload: "💾 Download",
      btnReset: "Reset",
      hdrHistory: "History",
      btnClearHistory: "Clear History",
      msgNoHistory: "No history yet.",
      hdrQRCode: "QR Code",
      msgCopied: "Copied!",
      msgCopiedAll: "Copied all passwords!",
      msgReset: "Settings reset"
    },
    zh: {
      title: "密碼產生器",
      subtitle: "安全、隨機、高度客製",
      tabPassword: "一般密碼",
      tabPassphrase: "單字密碼",
      basicSettings: "基本設定",
      optNumbers: "數字 (0-9)",
      optUppercase: "大寫字母 (A-Z)",
      optLowercase: "小寫字母 (a-z)",
      optSymbols: "常用符號 (!@#$%^&*)",
      optSpecial: "特殊符號 (+-,.:;=~?`'\"|\\<>()[]{})",
      lblCustom: "自訂字元",
      phCustom: "例如: @#$",
      advancedSettings: "進階設定",
      optShuffle: "打亂順序",
      optExcludeSimilar: "排除相似字 (i l 1 O 0 等)",
      lblExclude: "排除字元",
      phExclude: "例如: abc",
      lblPrefix: "固定開頭",
      phPrefix: "開頭...",
      lblSuffix: "固定結尾",
      phSuffix: "結尾...",
      passphraseSettings: "單字密碼設定",
      lblSeparator: "分隔符號",
      optRandomNum: "隨機數字",
      optCapitalize: "首字大寫",
      optIncludeNumber: "包含數字",
      genRules: "產生規則",
      lblLength: "密碼長度",
      lblWordCount: "單字數量",
      lblQuantity: "產生組數",
      btnGenerate: "⚡ 產生密碼",
      btnCopyAll: "📋 複製全部",
      btnDownload: "💾 下載結果",
      btnReset: "重設",
      hdrHistory: "歷史紀錄",
      btnClearHistory: "清除紀錄",
      msgNoHistory: "尚無紀錄",
      hdrQRCode: "QR Code",
      msgCopied: "已複製！",
      msgCopiedAll: "已複製全部！",
      msgReset: "設定已重設"
    }
  },

  // UI References (cached on init)
  ui: {},

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.loadState(); // Theme & Language
    this.updateUI();
    this.updatePreview();
    this.syncLength('number');
  },

  cacheDOM() {
    this.ui = {
      // Inputs
      length: document.getElementById("length"),
      lengthRange: document.getElementById("lengthRange"),
      lengthVal: document.getElementById("lengthVal"),
      wordCount: document.getElementById("wordCount"),
      wordRange: document.getElementById("wordRange"),
      wordCountVal: document.getElementById("wordCountVal"),
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

      // Passphrase Inputs
      separator: document.getElementById("separator"),
      capitalize: document.getElementById("capitalize"),
      includeNumber: document.getElementById("includeNumber"),

      // Output & Feedback
      preview: document.getElementById("preview"),
      output: document.getElementById("output"),
      validation: document.getElementById("validation"),
      suggestion: document.getElementById("suggestion"),
      strength: document.getElementById("strength"),
      strengthBar: document.getElementById("strengthBar"),
      toastContainer: document.getElementById("toast-container"),
      historyList: document.getElementById("historyList"),

      // Controls
      themeToggle: document.getElementById("themeToggle"),
      langToggle: document.getElementById("langToggle"),
      tabBtns: document.querySelectorAll(".tab-btn"),

      // Containers
      settingsPassword: document.getElementById("settings-password"),
      settingsPassphrase: document.getElementById("settings-passphrase"),
      lengthControl: document.getElementById("length-control"),
      wordsControl: document.getElementById("words-control"),

      // Modal
      qrModal: document.getElementById("qrModal"),
      qrcode: document.getElementById("qrcode"),
      qrText: document.getElementById("qrText"),
      closeModal: document.querySelector(".close-modal")
    };
  },

  bindEvents() {
    // Input changes
    const inputs = [
      this.ui.numbers, this.ui.uppercase, this.ui.lowercase,
      this.ui.symbols, this.ui.special, this.ui.custom,
      this.ui.excludeDefault, this.ui.excludeCustom,
      this.ui.prefix, this.ui.suffix, this.ui.length
    ];
    inputs.forEach(input => {
      if (input) input.addEventListener('input', () => this.updatePreview());
    });

    // Length Sync
    this.ui.length.addEventListener('input', () => this.syncLength('number'));
    this.ui.lengthRange.addEventListener('input', () => this.syncLength('range'));

    // Word Count Sync
    this.ui.wordCount.addEventListener('input', () => {
      this.ui.wordRange.value = this.ui.wordCount.value;
      this.ui.wordCountVal.textContent = this.ui.wordCount.value;
    });
    this.ui.wordRange.addEventListener('input', () => {
      this.ui.wordCount.value = this.ui.wordRange.value;
      this.ui.wordCountVal.textContent = this.ui.wordRange.value;
    });

    // Theme & Lang
    this.ui.themeToggle.addEventListener('click', () => this.toggleTheme());
    this.ui.langToggle.addEventListener('click', () => this.toggleLang());

    // Tabs
    this.ui.tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
    });

    // Modal Close
    this.ui.closeModal.addEventListener('click', () => this.closeModal());
    window.addEventListener('click', (e) => {
      if (e.target === this.ui.qrModal) this.closeModal();
    });
  },

  loadState() {
    // Load local storage
    const savedTheme = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('lang');

    if (savedTheme) {
      this.state.theme = savedTheme;
      document.documentElement.setAttribute('data-theme', savedTheme);
      this.ui.themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
    }

    if (savedLang) {
      this.state.lang = savedLang;
      this.setLanguage(savedLang);
    }
  },

  toggleTheme() {
    this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.state.theme);
    this.ui.themeToggle.textContent = this.state.theme === 'light' ? '🌙' : '☀️';
    localStorage.setItem('theme', this.state.theme);
  },

  toggleLang() {
    this.state.lang = this.state.lang === 'en' ? 'zh' : 'en';
    this.setLanguage(this.state.lang);
    localStorage.setItem('lang', this.state.lang);
  },

  setLanguage(lang) {
    const t = this.translations[lang];
    this.ui.langToggle.textContent = lang === 'en' ? '中文' : 'English';
    document.documentElement.lang = lang;

    // Update Text Content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) el.textContent = t[key];
    });

    // Update Placeholders
    document.querySelectorAll('[data-placeholder]').forEach(el => {
      const key = el.getAttribute('data-placeholder');
      if (t[key]) el.setAttribute('placeholder', t[key]);
    });
  },

  switchTab(mode) {
    this.state.mode = mode;
    this.ui.tabBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${mode}"]`).classList.add('active');

    if (mode === 'password') {
      this.ui.settingsPassword.style.display = 'block';
      this.ui.settingsPassphrase.style.display = 'none';
      this.ui.lengthControl.style.display = 'flex';
      this.ui.wordsControl.style.display = 'none';
      this.updatePreview();
    } else {
      this.ui.settingsPassword.style.display = 'none';
      this.ui.settingsPassphrase.style.display = 'block';
      this.ui.lengthControl.style.display = 'none';
      this.ui.wordsControl.style.display = 'flex';
      this.ui.preview.textContent = ""; // No preview for passphrase
      this.ui.strength.textContent = "";
      this.ui.strengthBar.style.width = "0%";
    }
  },

  // --- Logic Methods ---

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
    if (this.state.mode !== 'password') return; // Only for password mode

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

  randInt(max) {
    return Math.floor(Math.random() * max);
  },

  // --- Generation Logic ---

  generate() {
    const count = parseInt(this.ui.count.value);
    let resultHTML = "";

    if (this.state.mode === 'password') {
      const length = parseInt(this.ui.length.value);
      const chars = this.getCharPool();
      const prefix = this.ui.prefix.value;
      const suffix = this.ui.suffix.value;

      const reserved = prefix.length + suffix.length;
      if (reserved > length) {
        this.showToast("Length too short!", "error");
        return;
      }
      if (!chars) {
        this.showToast("Select character types!", "error");
        return;
      }

      for (let i = 0; i < count; i++) {
        let pwd = "";
        for (let j = 0; j < length - reserved; j++) {
          pwd += chars.charAt(this.randInt(chars.length));
        }
        if (this.ui.shuffle.checked) pwd = this.shuffleString(pwd);
        pwd = prefix + pwd + suffix;
        this.addToHistory(pwd);
        resultHTML += this.createCardHTML(pwd);
      }

    } else {
      // Passphrase Mode
      const wordCount = parseInt(this.ui.wordCount.value);
      const sepVal = this.ui.separator.value;
      const capitalize = this.ui.capitalize.checked;
      const includeNumber = this.ui.includeNumber.checked;

      for (let i = 0; i < count; i++) {
        let words = [];
        for (let w = 0; w < wordCount; w++) {
          let word = this.wordList[this.randInt(this.wordList.length)];
          if (capitalize) word = word.charAt(0).toUpperCase() + word.slice(1);
          words.push(word);
        }

        // Separator Logic (handle random number separator)
        let finalPwd = "";
        if (sepVal === 'random') {
          // Interleave random numbers
          for (let k = 0; k < words.length; k++) {
            finalPwd += words[k];
            if (k < words.length - 1) finalPwd += this.randInt(10);
          }
        } else {
          finalPwd = words.join(sepVal);
          if (includeNumber) finalPwd += this.randInt(100);
        }

        this.addToHistory(finalPwd);
        resultHTML += this.createCardHTML(finalPwd);
      }
    }

    this.ui.output.innerHTML = resultHTML;
  },

  createCardHTML(text) {
    // Just basic color for password, no complex coloring for passphrase to keep simple
    let displayHtml = text;
    if (this.state.mode === 'password') {
      displayHtml = text.split("").map(c => this.colorizeChar(c)).join("");
    }

    return `
        <div class="pwd-card" 
             role="button" 
             tabindex="0"
             title="Click to copy">
           <div style="flex-grow:1; text-align:center;" onclick="App.copyOne(this.parentElement, '${text}')">${displayHtml}</div>
           <div class="pwd-card-actions">
             <div class="action-icon" onclick="App.showQRCode('${text}')" title="QR Code">📱</div>
           </div>
        </div>`;
  },

  // --- History Logic ---
  addToHistory(pwd) {
    // Prevent duplicates at the top
    if (this.state.history.length > 0 && this.state.history[0] === pwd) return;

    this.state.history.unshift(pwd);
    if (this.state.history.length > this.config.historyMax) {
      this.state.history.pop();
    }
    this.renderHistory();
  },

  renderHistory() {
    if (this.state.history.length === 0) {
      this.ui.historyList.innerHTML = `<div class="empty-history">${this.translations[this.state.lang].msgNoHistory}</div>`;
      return;
    }

    this.ui.historyList.innerHTML = this.state.history.map(pwd => `
        <div class="history-item">
            <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; margin-right:10px;">${pwd}</span>
            <button class="icon-btn" onclick="App.copyHistory('${pwd}')" style="padding:2px 6px;">📋</button>
        </div>
      `).join("");
  },

  clearHistory() {
    this.state.history = [];
    this.renderHistory();
  },

  copyHistory(text) {
    navigator.clipboard.writeText(text).then(() => {
      this.showToast(this.translations[this.state.lang].msgCopied, "success");
    });
  },

  // --- Modal & QR ---
  showQRCode(text) {
    this.ui.qrcode.innerHTML = "";
    this.ui.qrModal.classList.add("show");
    this.ui.qrText.textContent = text;

    // Generate QR
    if (typeof QRCode !== 'undefined') {
      new QRCode(this.ui.qrcode, {
        text: text,
        width: 128,
        height: 128
      });
    } else {
      this.ui.qrcode.textContent = "QR Code library not loaded.";
    }
  },

  closeModal() {
    this.ui.qrModal.classList.remove("show");
  },

  // --- Actions ---

  copyOne(element, text) {
    navigator.clipboard.writeText(text).then(() => {
      // Visual feedback via class
      element.classList.add('copied');
      setTimeout(() => {
        element.classList.remove('copied');
      }, 500);
      this.showToast(this.translations[this.state.lang].msgCopied, "success");
    }).catch(err => {
      this.showToast("Failed to copy", "error");
    });
  },

  copyAll() {
    const cards = document.querySelectorAll(".pwd-card");
    if (cards.length === 0) return;

    // We need to extract the raw text, not the HTML
    // Storing raw text in a data attribute or reconstructing is safer
    // But since we are generating them, we can validly use list innerText for typical cases, 
    // EXCEPT we added action icons. We should grab the text from the onclick attribute or store in data-val.
    // Simplest fix: Just map the history? No, generate might be different.
    // Let's re-parse or use data attribute.

    // Better strategy: generate() stores the current batch in a variable `currentBatch`
    // For now, let's grab textContent and strip newlines/actions? 
    // Actually, `pwd-card` textContent includes the QR icon text? No, icons are unicode/images.
    // Let's rely on the fact that the first child div has the text.

    const texts = Array.from(cards).map(card => {
      // card -> div(text) , div(actions)
      return card.firstElementChild.innerText;
    }).join("\n");

    navigator.clipboard.writeText(texts).then(() => {
      this.showToast(this.translations[this.state.lang].msgCopiedAll, "success");
    });
  },

  download() {
    const cards = document.querySelectorAll(".pwd-card");
    if (cards.length === 0) return;
    const texts = Array.from(cards).map(card => card.firstElementChild.innerText).join("\n");
    const blob = new Blob([texts], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "passwords.txt";
    link.click();
  },

  reset() {
    // Reset inputs
    this.ui.length.value = 12;
    this.ui.lengthRange.value = 12;
    this.ui.lengthVal.textContent = "12";
    this.ui.wordCount.value = 3;
    this.ui.wordRange.value = 3;
    this.ui.wordCountVal.textContent = "3";
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
    this.ui.separator.value = "-";

    this.ui.output.innerHTML = "";
    this.ui.validation.textContent = "";
    this.ui.suggestion.textContent = "";
    this.ui.strength.textContent = "";
    this.ui.strengthBar.style.width = "0%";

    this.updatePreview();
    this.showToast(this.translations[this.state.lang].msgReset, "success");
  },

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    this.ui.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => {
        if (toast.parentElement) toast.remove();
      }, 300);
    }, 3000);
  }
};

// Global Exports for HTML
window.generate = () => App.generate();
window.copyPasswords = () => App.copyAll();
window.downloadPasswords = () => App.download();
window.resetAll = () => App.reset();
window.updatePreview = () => App.updatePreview();
window.syncLength = (s) => App.syncLength(s);
window.clearHistory = () => App.clearHistory();
window.App = App;

// Init
window.onload = function () {
  App.init();
};
