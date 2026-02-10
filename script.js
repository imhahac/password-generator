function getCharPool() {
  let chars = "";
  if (document.getElementById("numbers").checked) chars += "0123456789";
  if (document.getElementById("uppercase").checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (document.getElementById("lowercase").checked) chars += "abcdefghijklmnopqrstuvwxyz";
  if (document.getElementById("symbols").checked) chars += "!@#$%^&*";
  if (document.getElementById("special").checked) chars += "+-.:;=~?`'\"|\\/<>()[]{}";
  chars += document.getElementById("custom").value;

  // 去除相似字
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

function updatePreview() {
  const chars = getCharPool();
  document.getElementById("preview").textContent = chars ? "字元池: " + chars : "字元池: (尚未選擇)";
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
    validation.textContent = `❌ 密碼長度不足！目前長度 ${length}，但固定開頭(${prefix.length}) + 固定結尾(${suffix.length}) = ${reserved}。請增加密碼長度或縮短固定碼。`;
  } else if (reserved === length) {
    validation.textContent = `⚠️ 密碼長度剛好等於固定碼長度，將不會有隨機字元。`;
  }

  if (length < 8) {
    suggestion.textContent = "建議密碼長度至少 8 位以上，提升安全性。";
  } else if (length >= 16) {
    suggestion.textContent = "👍 密碼長度足夠，安全性較佳。";
  }

  const chars = getCharPool();
  if (!chars) {
    suggestion.textContent = "請至少選擇一種字元類型或輸入自訂字元。";
  }
}

function evaluateStrength() {
  const length = parseInt(document.getElementById("length").value);
  const chars = getCharPool();
  const strength = document.getElementById("strength");

  if (!chars) {
    strength.textContent = "";
    return;
  }

  const poolSize = chars.length;
  const score = poolSize * length;

  if (score < 50) {
    strength.textContent = "安全性評分：弱 🔴";
    strength.style.color = "red";
  } else if (score < 150) {
    strength.textContent = "安全性評分：中 🟡";
    strength.style.color = "orange";
  } else {
    strength.textContent = "安全性評分：強 🟢";
    strength.style.color = "green";
  }
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
    resultHTML += `<div class="pwd">${pwd}</div>`;
  }

  document.getElementById("output").innerHTML = resultHTML;
}

function copyPasswords() {
  const text = document.getElementById("output").innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("已複製到剪貼簿！");
  });
}

function downloadPasswords() {
  const text = document.getElementById("output").innerText;
  const blob