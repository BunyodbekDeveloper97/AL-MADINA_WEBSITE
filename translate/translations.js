// JSON tarjima fayllarini olish
const translations = {
    uz: fetch('/translate/uz.json').then(res => res.json()).catch(err => console.error("Uzbek JSON fayli yuklanmadi:", err)),
    ko: fetch('/translate/ko.json').then(res => res.json()).catch(err => console.error("Korean JSON fayli yuklanmadi:", err)),
    en: fetch('/translate/en.json').then(res => res.json()).catch(err => console.error("English JSON fayli yuklanmadi:", err)),
};

// LocalStorage orqali oxirgi tanlangan tilni olish
let currentLanguage = localStorage.getItem('language') || 'en';

// Tilni o'zgartirish funksiyasi
async function changeLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('language', language); // LocalStorage-ga saqlash

    try {
        const langData = await translations[language];

        // Tarjima elementlarini yangilash
        document.querySelectorAll('[data-key]').forEach((element) => {
            const key = element.getAttribute('data-key');
            if (langData[key]) {
                element.innerHTML = langData[key].replace(/\n/g, "<br>"); // Matnni formatlash
            }
        });
    } catch (error) {
        console.error("Tarjima ma'lumotlari yuklanishda xatolik:", error);
    }
}

// Sahifa yuklanganda avvalgi tanlangan tilni qo‘llash
window.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLanguage);  // Ilk tanlangan tilni qo‘llash
    document.getElementById('language').value = currentLanguage;

    // Tilni o‘zgartirish event listener
    document.getElementById('language').addEventListener('change', (event) => {
        changeLanguage(event.target.value);
    });
});
