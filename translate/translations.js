// JSON tarjima fayllarini yuklash
const translations = {
    uz: fetch('/translate/uz.json').then(res => res.json()),
    ko: fetch('/translate/ko.json').then(res => res.json()),
    en: fetch('/translate/en.json').then(res => res.json())
};

// LocalStorage orqali oxirgi tanlangan tilni olish
let currentLanguage = localStorage.getItem('language') || 'en';

// Tilni o'zgartirish funksiyasi
function changeLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('language', language); // LocalStorage-ga saqlash

    translations[language].then((langData) => {
        document.querySelectorAll('[data-key]').forEach((element) => {
            const key = element.getAttribute('data-key');
            if (langData[key]) {
                element.innerHTML = langData[key].replace(/\n/g, "<br>"); // Matnni formatlash
            }
        });
    });
}

// Sahifa yuklanganda avvalgi tanlangan tilni qo‘llash
window.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLanguage);
    document.getElementById('language').value = currentLanguage;

    // Tilni o‘zgartirish event listener
    document.getElementById('language').addEventListener('change', (event) => {
        changeLanguage(event.target.value);
    });
});
