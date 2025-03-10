

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

// Menu ikonasi bosilganda menyuni ochish/yopish
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const navLinks = document.querySelector(".nav-links");

    menuIcon.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    // Tashqariga bosilganda menyuni yopish
    document.addEventListener("click", function (event) {
        if (!navLinks.contains(event.target) && !menuIcon.contains(event.target)) {
            navLinks.classList.remove("active");
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











/*
let translate = 0;
function Language(type){
  console.log("working!!!!!");
    if(type == "uz"){
        let H2 = document.getElementsByClassName("translate");
        for(let i = 0; i < H2.length;i++){
          H2.innertext = "Assalommmm";
        }
    }else{
        translate = 0;
    }
}*/
/*
document.getElementById("language").addEventListener("change", function(e) {
    const translations = {
        uz: {
            hadis1: "Uzbekcha",
            hadis2: "Bu ikkinchi hadis - uzbekcha",
            hadis3: "Bu uchinchi hadis - uzbekcha"
        },
        en: {
            hadis1: "English",
            hadis2: "This is the second hadith - English",
            hadis3: "This is the third hadith - English"
        },
        ko: {
            hadis1: "한국어",
            hadis2: "이것은 두 번째 하디스입니다 - 한국어",
            hadis3: "이것은 세 번째 하디스입니다 - 한국어"
        }
    };

    let selectedLang = e.target.value;

    // Agar tanlangan til mavjud bo'lsa, tarjimalarni qo‘llash
    if (translations[selectedLang]) {
        document.getElementById("hadis1").textContent = translations[selectedLang].hadis1;
        document.getElementById("hadis2").textContent = translations[selectedLang].hadis2;
        document.getElementById("hadis3").textContent = translations[selectedLang].hadis3;
    }
});*/
