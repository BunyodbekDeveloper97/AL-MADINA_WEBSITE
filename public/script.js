

// Navbar linklari orqali sahifada silliq harakatlanish
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const className = this.getAttribute('href').substring(1);
            if (!className) return;  // Agar href bo‘sh bo‘lsa, chiqib ketamiz

            const targetSection = document.querySelector(`.${className}`);
            if (!targetSection) return;  // Agar section topilmasa, davom etmaymiz

            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const offsetTop = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Agar menyu ochiq bo‘lsa, uni yopamiz (mobil versiya uchun)
            document.querySelector(".nav-links").classList.remove("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const navLinks = document.querySelector(".nav-links");
  
    menuIcon.addEventListener("click", function () {
      navLinks.classList.toggle("active");
  
      // Iconani almashtirish
      if (menuIcon.classList.contains("bx-menu")) {
        menuIcon.classList.remove("bx-menu");
        menuIcon.classList.add("bx-x"); // X ko‘rinishi
      } else {
        menuIcon.classList.remove("bx-x");
        menuIcon.classList.add("bx-menu");
      }
    });
  
    // Tashqariga bosilganda menyuni yopish
    document.addEventListener("click", function (event) {
      if (!navLinks.contains(event.target) && !menuIcon.contains(event.target)) {
        navLinks.classList.remove("active");
  
        // Ikonani qayta menu holatiga olib kelish
        menuIcon.classList.remove("bx-x");
        menuIcon.classList.add("bx-menu");
      }
    });
  });
  

// Kartadagi raqamni nusxalash (`copy-button`)
document.getElementById("copy-button").addEventListener("click", function() {
    const cardNumberElement = document.getElementById("card-number");
    if (!cardNumberElement) return;  // Agar element topilmasa, davom etmaymiz

    const cardNumber = cardNumberElement.textContent.trim();
    if (!navigator.clipboard) {
        console.error("Clipboard nusxalash qo‘llab-quvvatlanmaydi.");
        return;
    }

    navigator.clipboard.writeText(cardNumber).then(function() {
        const copiedText = document.getElementById("copied-text");
        if (!copiedText) return;

        copiedText.style.display = "block";
        setTimeout(() => copiedText.style.display = "none", 3000);
    }).catch(function(error) {
        console.error("Clipboard nusxalashda xatolik yuz berdi: ", error);
    });
});




///////////////////////////////////////

// Tarjima ma'lumotlarini saqlash uchun ob'ekt
let translations = {};

// Tanlangan tilni saqlash (LocalStorage dan olamiz yoki standart 'en')
let currentLanguage = localStorage.getItem('language') || 'en';

// Til ma'lumotlarini yuklash funksiyasi
async function loadTranslations(language) {
    try {
        const response = await fetch(`translate/${language}.json`);
        if (!response.ok) throw new Error(`JSON fayl topilmadi: ${language}`);
        translations[language] = await response.json();
    } catch (error) {
        console.error('Xato:', error);
    }
}

// Barcha tillarni yuklash
async function loadAllTranslations() {
    await Promise.all(['en', 'uz', 'ko'].map(loadTranslations));
}

// Tilni o'zgartirish funksiyasi
function changeLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('language', language); // Tanlangan tilni saqlash

    const langData = translations[language];
    if (!langData) return;

    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (langData[key]) {
            element.textContent = langData[key];
        }
    });
}

// Sahifa yuklanganda
window.addEventListener('DOMContentLoaded', async () => {
    await loadAllTranslations(); // Barcha tillarni yuklash
    changeLanguage(currentLanguage); // Joriy tilni qo‘llash

    // Til tanlash elementini topish
    const languageSelect = document.getElementById('language');
    if (languageSelect) {
        languageSelect.value = currentLanguage; // Joriy tilni tanlash

        // Til o'zgartirilganda
        languageSelect.addEventListener('change', (event) => {
            const selectedLanguage = event.target.value;
            changeLanguage(selectedLanguage);
        });
    }
});



////////////////// Qurbon hayiti eslatma Doska /////////////
function updateCountdown() {
    const countdownEl = document.getElementById('countdown');
    const eventDate = new Date('2025-06-07T07:00:00');
    const now = new Date();
    const diff = eventDate - now;
  
    if (!translations[currentLanguage]) return;
  
    if (diff <= 0) {
      // Vaqt o'tib bo'lgan bo‘lsa
      countdownEl.textContent = translations[currentLanguage]['startedText'];
      return;
    }
  
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
  
    // JSON dan `countdown` matnini olish va {{}} joylarini almashtirish
    const template = translations[currentLanguage]['countdown'];
    const formattedCountdown = template
      .replace('{{days}}', days)
      .replace('{{hours}}', hours)
      .replace('{{minutes}}', minutes)
      .replace('{{seconds}}', seconds);
  
    countdownEl.textContent = formattedCountdown;
  }
  
  // Har soniyada yangilash
  setInterval(updateCountdown, 1000);
  