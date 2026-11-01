
document.addEventListener("DOMContentLoaded", () => {
    // Inisialisasi ikon Feather
    if (typeof feather !== "undefined") {
        feather.replace();
    }

    
    const themeButton = document.getElementById("theme-button");
    const currentTheme = localStorage.getItem("selected-theme") || "dark";

    document.documentElement.setAttribute("data-theme", currentTheme);

    themeButton.addEventListener("click", () => {
        const activeTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = activeTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("selected-theme", newTheme);
    });

    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navClose = document.getElementById("nav-close");
    const navLinks = document.querySelectorAll(".nav__link");

    if (navToggle) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.add("show-menu");
        });
    }

    if (navClose) {
        navClose.addEventListener("click", () => {
            navMenu.classList.remove("show-menu");
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("show-menu");
        });
    });
    const header = document.getElementById("header");
    const backToTop = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;

        if (scrollY > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }

        if (scrollY > 350) {
            backToTop.classList.add("show-scroll");
        } else {
            backToTop.classList.remove("show-scroll");
        }
    });

    const sections = document.querySelectorAll("section[id]");

    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");
            const sectionsClass = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

            if (sectionsClass) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    sectionsClass.classList.add("active-link");
                } else {
                    sectionsClass.classList.remove("active-link");
                }
            }
        });
    };
    window.addEventListener("scroll", scrollActive);

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animElements = document.querySelectorAll(
        ".section__title, .section__subtitle, .info-card, .skill__card, .project__card, .timeline__item, .contact__card, .contact__form"
    );

    animElements.forEach((el) => {
        el.classList.add("reveal");
        revealObserver.observe(el);
    });

    const contactForm = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const formStatus = document.getElementById("form-status");

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateField = (input, condition) => {
        const formGroup = input.parentElement;
        if (!condition) {
            formGroup.classList.add("has-error");
            return false;
        } else {
            formGroup.classList.remove("has-error");
            return true;
        }
    };

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const isNameValid = validateField(nameInput, nameInput.value.trim().length > 0);
            const isEmailValid = validateField(emailInput, validateEmail(emailInput.value.trim()));
            const isMessageValid = validateField(messageInput, messageInput.value.trim().length > 0);

            if (isNameValid && isEmailValid && isMessageValid) {
                formStatus.textContent = "Thank you! Your message has been prepared.";
                formStatus.className = "form__status success";

                const mailtoUrl = `mailto:your.email@example.com?subject=Portfolio Contact from ${encodeURIComponent(
                    nameInput.value
                )}&body=${encodeURIComponent(messageInput.value + "\n\nFrom: " + emailInput.value)}`;

                setTimeout(() => {
                    window.location.href = mailtoUrl;
                    contactForm.reset();
                    formStatus.textContent = "Message processed!";
                }, 600);
            } else {
                formStatus.textContent = "";
            }
        });

        [nameInput, emailInput, messageInput].forEach((input) => {
            input.addEventListener("input", () => {
                input.parentElement.classList.remove("has-error");
            });
        });
    }
});