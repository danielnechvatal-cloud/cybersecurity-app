// Heslo síla
function checkPassword() {
  const password = document.getElementById('passwordInput').value;
  const strength = [/[A-Z]/, /[a-z]/, /[0-9]/, /[\W_]/].filter(r => r.test(password)).length;
  const lengthBonus = password.length >= 8 ? 1 : 0;
  const total = strength + lengthBonus;
  const levels = ["Slabé", "Střední", "Silné", "Velmi silné", "Extrémně silné"];
  document.getElementById('passwordStrength').textContent = "Síla hesla: " + levels[total];
}

// Generátor hesla
function generatePassword() {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let pass = "";
  for (let i = 0; i < 16; i++) {
    pass += charset[Math.floor(Math.random() * charset.length)];
  }
  document.getElementById('generatedPassword').value = pass;
}

// Validace e-mailu
function validateEmail() {
  const email = document.getElementById("emailInput").value;
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const susDomains = ["phishme.net", "freemoney.com"];
  const domain = email.split("@")[1];
  const result = !isValid ? "❌ Neplatný formát"
               : susDomains.includes(domain) ? "⚠️ Podezřelá doména"
               : "✅ E-mail vypadá bezpečně";
  document.getElementById("emailValidation").textContent = result;
}

// 2FA
let current2FACode = "";
function generate2FACode() {
  current2FACode = Math.floor(100000 + Math.random() * 900000).toString();
  document.getElementById("generated2FA").textContent = "Kód: " + current2FACode;
}
function verify2FA() {
  const input = document.getElementById("user2FA").value;
  document.getElementById("2FAResult").textContent =
    input === current2FACode ? "✅ Ověřeno!" : "❌ Neplatný kód!";
}

// Šifrování
function encryptText() {
  const text = document.getElementById("plaintext").value;
  const key = document.getElementById("encryptionKey").value;
  const encrypted = CryptoJS.AES.encrypt(text, key).toString();
  document.getElementById("encryptedText").textContent = encrypted;
}
function decryptText() {
  const cipher = document.getElementById("ciphertext").value;
  const key = document.getElementById("decryptionKey").value;
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, key);
    const original = bytes.toString(CryptoJS.enc.Utf8);
    document.getElementById("decryptedText").textContent = original || "❌ Chybný klíč nebo text!";
  } catch {
    document.getElementById("decryptedText").textContent = "❌ Chyba při dešifrování!";
  }
}

// Registrace / login
function registerUser() {
  const u = document.getElementById("regUsername").value;
  const p = document.getElementById("regPassword").value;
  const enc = CryptoJS.AES.encrypt(p, "secret-key").toString();
  localStorage.setItem(`user_${u}`, enc);
  document.getElementById("authResult").textContent = "✅ Registrováno!";
}
function loginUser() {
  const u = document.getElementById("loginUsername").value;
  const p = document.getElementById("loginPassword").value;
  const stored = localStorage.getItem(`user_${u}`);
  if (!stored) return alert("Uživatel neexistuje");
  const dec = CryptoJS.AES.decrypt(stored, "secret-key").toString(CryptoJS.enc.Utf8);
  if (dec === p) {
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("username", u);
    document.getElementById("authResult").textContent = "✅ Přihlášen";
    if (u.toLowerCase() === "admin") document.getElementById("adminPanel").style.display = "block";
  } else {
    document.getElementById("authResult").textContent = "❌ Nesprávné heslo!";
  }
}

// Téma
function toggleTheme() {
  const root = document.documentElement;
  const dark = getComputedStyle(root).getPropertyValue('--bg-color').trim() === "#0f172a";
  root.style.setProperty('--bg-color', dark ? "#f1f5f9" : "#0f172a");
  root.style.setProperty('--text-color', dark ? "#0f172a" : "#f1f5f9");
}
