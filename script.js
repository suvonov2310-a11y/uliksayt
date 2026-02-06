// 1. Dinamik Online Foydalanuvchilar (Realistik tebranish)
function updateOnlineStats() {
    const countElement = document.getElementById('online-count');
    if (!countElement) return;

    let current = parseInt(countElement.innerText);
    // Tasodifiy: 2 ta odam chiqib ketadi yoki 3 ta kiradi
    let change = Math.floor(Math.random() * 6) - 2; 
    
    let newCount = current + change;
    
    // Me'yorni saqlash (masalan, 100 dan kamayib ketmasin)
    if (newCount < 100) newCount = 105;
    if (newCount > 500) newCount = 450;

    countElement.innerText = newCount;
}
setInterval(updateOnlineStats, 3000); // Har 3 soniyada o'zgaradi

// 2. Fake Xabarnomalar (Toast) - Haqiqiyroq ko'rinishi uchun
const names = ["Abbos", "Sardor", "Lola", "Jasur", "Madina", "Shaxzod", "Bekzod"];
const cities = ["Toshkent", "Samarqand", "Buxoro", "Andijon", "Namangan"];
const actions = ["kursga yozildi", "ro'yxatdan o'tdi", "buyurtma berdi", "bonus oldi"];

function createToast() {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const name = names[Math.floor(Math.random() * names.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        padding: 12px 20px;
        border-radius: 12px;
        margin-top: 10px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        border-left: 5px solid #23d5ab;
        color: #333;
        font-size: 14px;
        transition: 0.5s;
    `;

    toast.innerHTML = `📍 <b>${city}</b>: ${name} hozirgina ${action} 🔥`;
    container.appendChild(toast);

    // 4 soniyadan keyin yo'qolishi
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-20px)';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}
// Har 12 soniyada kimdir nimadir qiladi
setInterval(createToast, 12000);

// 3. Fake Forma Yuborish (Interaktiv)
function submitForm() {
    const btn = document.getElementById('submit-btn');
    const loader = document.getElementById('loader');
    const msg = document.getElementById('success-msg');
    const input = document.getElementById('name');

    if (input.value.length < 3) {
        alert("Iltimos, ismingizni to'liq yozing!");
        return;
    }

    // Tugmani yashirish va loader chiqarish
    btn.style.display = "none";
    input.style.opacity = "0.5";
    input.disabled = true;
    loader.style.display = "block";

    // 3 soniyalik "ishlov berish" jarayoni
    setTimeout(() => {
        loader.style.display = "none";
        msg.style.display = "block";
        msg.style.animation = "fadeIn 1s forwards";
        
        // Ismga qarab maxsus rahmatnoma (shaxsiylashtirish)
        msg.innerHTML = `✨ Rahmat, <b>${input.value}</b>! So'rovingiz qabul qilindi.`;
    }, 3000);
}

// 4. Kichik "Easter Egg": Foydalanuvchi sahifadan boshqa tabga o'tsa sarlavha o'zgaradi
window.onblur = function () { document.title = "Qayerga ketdingiz? 😢"; }
window.onfocus = function () { document.title = "Jonli Statik Sayt"; }