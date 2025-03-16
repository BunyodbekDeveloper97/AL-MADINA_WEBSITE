

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




