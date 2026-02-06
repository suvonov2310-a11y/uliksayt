/**
 * 1. TELEFON RAQAMI UCHUN SMART MASKA
 * Foydalanuvchi faqat raqam yozadi, qolganini JS bajaradi
 */
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Faqat raqamlarni qoldiramiz
    
    // Agar foydalanuvchi 998 bilan boshlamasa, avtomatik qo'shish
    if (!value.startsWith('998') && value.length > 0) {
        value = '998' + value;
    }

    let result = '';
    if (value.length > 0) result += '+998';
    if (value.length > 3) result += ' (' + value.substring(3, 5);
    if (value.length > 5) result += ') ' + value.substring(5, 8);
    if (value.length > 8) result += '-' + value.substring(8, 10);
    if (value.length > 10) result += '-' + value.substring(10, 12);

    e.target.value = result;
});

// Klaviaturada o'chirishni (backspace) to'g'ri ishlashi uchun
phoneInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 8 && phoneInput.value.length <= 5) {
        e.preventDefault(); // +998 qismini o'chirib tashlamaslik uchun
    }
});

/**
 * 2. ONLINE STATISTIKA (DINAMIK)
 */
function updateLiveUsers() {
    const el = document.getElementById('online-users');
    let current = parseInt(el.innerText) || 154;
    
    // Tasodifiy son: -2 va +3 oralig'ida
    let change = Math.floor(Math.random() * 6) - 2;
    let finalCount = current + change;

    // Me'yordan chiqib ketmaslik (masalan 120 va 300 orasida saqlash)
    if (finalCount < 120) finalCount = 135;
    if (finalCount > 300) finalCount = 280;

    el.innerText = finalCount + " kishi onlayn";
}
setInterval(updateLiveUsers, 3500);

/**
 * 3. FAKE BILDIRISHNOMALAR (TOASTS)
 */
const fakeData = {
    names: ["Sherzod", "Aziza", "Doniyor", "Madina", "Alisher", "Sardor", "Nigora"],
    actions: ["yangi arizasini qoldirdi", "ro'yxatdan o'tdi", "konsultatsiya oldi", "guruhga qo'shildi"]
};

function createToast() {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';

    const randomName = fakeData.names[Math.floor(Math.random() * fakeData.names.length)];
    const randomAction = fakeData.actions[Math.floor(Math.random() * fakeData.actions.length)];

    toast.innerHTML = `🔔 <b>${randomName}</b> ${randomAction}`;
    container.appendChild(toast);

    // Animatsiya bilan yo'qotish
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => toast.remove(), 600);
    }, 4000);
}
// Har 12-15 soniyada bitta bildirishnoma chiqarish
setInterval(createToast, Math.random() * (15000 - 12000) + 12000);

/**
 * 4. FORMANI "YUBORISH" VA LOADER
 */
function sendData() {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const btn = document.getElementById('main-btn');
    const loader = document.getElementById('loader');

    // Validatsiya
    if (nameInput.value.trim().length < 3) {
        alert("Iltimos, ismingizni kiriting");
        return;
    }
    if (phoneInput.value.length < 19) {
        alert("Telefon raqamingizni to'liq kiriting");
        return;
    }

    // Jarayon boshlandi
    btn.style.display = 'none';
    loader.style.display = 'block';

    // 2.5 soniyadan keyin "Muvaffaqiyatli" oynasini ko'rsatish
    setTimeout(() => {
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('success-view').style.display = 'block';
        document.getElementById('thanks-name').innerText = `Rahmat, ${nameInput.value.split(' ')[0]}!`;
    }, 2500);
}