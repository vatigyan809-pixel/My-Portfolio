
/* ==================================
   1. TYPING ANIMATION
================================== */

const typingText = document.getElementById("typingText");

const words = [
    "Web Developer",
    "Programmer",
    "DSA Learner",
    "CSIT Student"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent = currentWord.substring(0, charIndex);

    let delay = isDeleting ? 55 : 110;

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        delay = 1200;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 300;
    }

    setTimeout(typeEffect, delay);
}

typeEffect();


/* ==================================
   2. MOBILE MENU
================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("open");

        const menuOpen = navLinks.classList.contains("open");

        menuBtn.textContent = menuOpen ? "✕" : "☰";
        menuBtn.setAttribute("aria-expanded", menuOpen);
        menuBtn.setAttribute(
            "aria-label",
            menuOpen ? "Close menu" : "Open menu"
        );
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");

            menuBtn.textContent = "☰";
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Open menu");
        });
    });
}


/* ==================================
   3. DARK / LIGHT MODE
================================== */

const themeToggle = document.getElementById("themeToggle");

function updateThemeButton() {
    if (!themeToggle) return;

    const lightMode = document.body.classList.contains("light-theme");

    themeToggle.textContent = lightMode ? "🌙" : "☀️";
    themeToggle.setAttribute(
        "aria-label",
        lightMode ? "Switch to dark mode" : "Switch to light mode"
    );
}

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("light-theme");
        updateThemeButton();
    });
}


/* ==================================
   4. PROJECT FILTERS
================================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        // Sab buttons se active class hatao
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });

        // Click kiye gaye button ko active banao
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        const selectedCategory = button.dataset.filter;

        projectCards.forEach(function (card) {
            const category = card.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === category
            ) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});


/* ==================================
   5. SCROLL REVEAL ANIMATION
================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        observer.observe(element);
    });

} else {
    // Fallback for older browsers
    revealElements.forEach(function (element) {
        element.classList.add("show");
    });
}


/* ==================================
   6. CONTACT FORM
================================== */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            formStatus.textContent = "Please fill in all fields.";
            return;
        }

        const subject = encodeURIComponent(
            "Portfolio Message from " + name
        );

        const body = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );

        formStatus.textContent =
            "Opening your email application...";

        window.location.href =
            "mailto:vatigyan809@gmail.com" +
            "?subject=" + subject +
            "&body=" + body;
    });
}


/* ==================================
   7. AUTOMATIC COPYRIGHT YEAR
================================== */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* ==================================
   8. BACK TO TOP BUTTON
================================== */

const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 350) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* ==================================
   9. ACTIVE NAVBAR LINK
================================== */

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navItems.forEach(function (link) {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        );
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });
}
