function getCharPool() {
  let chars = "";
  if (document.getElementById("numbers").checked) chars += "0123456789";
  if (document.getElementById("uppercase").checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (document.getElementById("lowercase").checked) chars += "abcdefghijklmnopqrstuvwxyz";
  if (document.getElementById("symbols").checked) chars += "!@#$%^&*";
  if (document.getElementById("special").checked) chars += "+-.:;=~?`'\"|\\/<>()[]{}";
  chars += document.getElementById("custom").value;

  // 去除預設相似字
  if (document.getElementById("excludeDefault").checked) {
    const exclude = "ilI1oO02Z8B";
    chars = chars.split("").filter(c => !exclude.includes(c)).join("");
  }

  // 去除自訂字
  const excludeCustom = document.getElementById("excludeCustom").value;
  if (excludeCustom) {
    chars = chars.split("").filter(c => !excludeCustom.includes(c)).join("");
  }

  return chars;
}

// 顏色分類顯示
function colorizeChar(c) {
  if ("0123456789".includes(c)) return `<span class="num">${c}</span>`;
  if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(c)) return `<span class="upper">${c}</span>`;
  if ("abcdefghijklmnopqrstuvwxyz".includes(c)) return `<span class="lower">${c}</span>`;
  if ("!@#$%^&*".includes(c)) return `<span class="symbol">${c}</span>`;
  if ("+-.:;=~?`'\"|\\/<>()[]{}".includes(c)) return `<span class="special">${c}</span>`;
  return `<span class="custom">${c}</span>`;
}

function updatePreview() {
  const chars = getCharPool();
  if (chars) {
    const colored = chars.split("").map(colorizeChar).join("");
    document.getElementById("preview").innerHTML = "Character Pool / 字元池: " + colored;
  } else {
    document.getElementById("preview").textContent = "Character Pool / 字元池: (None selected / 尚未選擇)";
  }
  validateSettings();
  evaluateStrength();
}

function validateSettings() {
  const length = parseInt(document.getElementById("length").value);
  const prefix = document.getElementById("prefix").value;
  const suffix = document.getElementById("suffix").value;
  const validation = document.getElementById("validation");
  const suggestion = document.getElementById("suggestion");

  validation.textContent = "";
  suggestion.textContent = "";

  const reserved = prefix.length + suffix.length;
  if (reserved > length) {
    validation.textContent = `❌ Length too short! 密碼長度不足 (${length}), reserved (${reserved}).`;
  } else if (reserved === length) {
    validation.textContent = `⚠️ Length equals reserved, no random chars.`;
  }

  if (length < 8) {
    suggestion.textContent = "🔒 Suggest length >= 8 for better security.";
  } else if (length >= 16) {
    suggestion.textContent = "👍 Strong length, good security.";
  }

  const chars = getCharPool();
  if (!chars) {
    suggestion.textContent = "⚠️ Please select at least one character type.";
  }
}

function evaluateStrength() {
  const length = parseInt(document.getElementById("length").value);
  const chars = getCharPool();
  const strength = document.getElementById("strength");

  if (!chars) {
    strength.textContent = "";
    document.getElementById("strengthBar").style.width = "0%";
    return;
  }

  const poolSize = chars.length;
  const score = Math.log2(poolSize) * length; // 熵值近似計算

  let level = "";
  let percent = 0;
  let color = "";

  if (score < 40) {
    level = "Weak 🔴 / 弱";
    percent = 33;
    color = "red";
  } else if (score < 80) {
    level = "Medium 🟡 / 中";
    percent = 66;
    color = "orange";
  } else {
    level = "Strong 🟢 / 強";
    percent = 100;
    color = "green";
  }

  strength.textContent = "Security Strength: " + level;
  strength.style.color = color;

  const bar = document.getElementById("strengthBar");
  bar.style.width = percent + "%";
  bar.style.backgroundColor = color;
}

function shuffleString(str) {
  return str.split("").sort(() => Math.random() - 0.5).join("");
}

function generate() {
  const length = parseInt(document.getElementById("length").value);
  const count = parseInt(document.getElementById("count").value);
  const chars = getCharPool();
  const prefix = document.getElementById("prefix").value;
  const suffix = document.getElementById("suffix").value;

  const reserved = prefix.length + suffix.length;
  if (reserved > length) {
    alert("密碼長度不足，請調整設定！");
    return;
  }

  if (!chars) {
    alert("請至少選擇一種字元類型或輸入自訂字元！");
    return;
  }

  let resultHTML = "";
  for (let i = 0; i < count; i++) {
    let pwd = "";
    for (let j = 0; j < length - reserved; j++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (document.getElementById("shuffle").checked) {
      pwd = shuffleString(pwd);
    }
    pwd = prefix + pwd + suffix;
    // 即時顯示顏色分類
    const coloredPwd = pwd.split("").map(colorizeChar).join("");
    resultHTML += `<div class="pwd">${coloredPwd}</div>`;
  }

  document.getElementById("output").innerHTML = resultHTML;
}

function copyPasswords() {
  const text = document.getElementById("output").innerText;
  if (!text) {
    alert("沒有密碼可複製！");
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    alert("已複製到剪貼簿！");
  });
}

function downloadPasswords() {
  const text = document.getElementById("output").innerText;
  if (!text) {
    alert("沒有密碼可下載！");
    return;
  }
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "passwords.txt";
  link.click();
}

function resetAll() {
  document.getElementById("length").value = 12;
  document.getElementById("count").value = 5;
  document.getElementById("numbers").checked = true;   // 預設勾選
  document.getElementById("uppercase").checked = true; // 預設勾選
  document.getElementById("lowercase").checked = true; // 預設勾選
  document.getElementById("symbols").checked = false;
  document.getElementById("special").checked = false;
  document.getElementById("custom").value = "";
  document.getElementById("shuffle").checked = false;
  document.getElementById("excludeDefault").checked = true;
  document.getElementById("excludeCustom").value = "";
  document.getElementById("prefix").value = "";
  document.getElementById("suffix").value = "";
  document.getElementById("output").innerHTML = "";
  document.getElementById("validation").textContent = "";
  document.getElementById("suggestion").textContent = "";
  document.getElementById("strength").textContent = "";
  document.getElementById("strengthBar").style.width = "0%";
  updatePreview(); // 重設後立即更新字元池
}

// 初始化：載入頁面時立即更新字元池
window.onload = function() {
  updatePreview();
};
