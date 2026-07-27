document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const header = document.querySelector(".header");
    const hero = document.querySelector(".page-one");

    requestAnimationFrame(() => body.classList.add("site-loaded"));

    const updateHeader = () => {
        if (!header) return;
        header.classList.toggle("header-scrolled", window.scrollY > 30);
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    const supportsPointer = window.matchMedia("(pointer: fine)").matches;
    if (hero && supportsPointer) {
        hero.addEventListener("pointermove", (event) => {
            const rect = hero.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            hero.style.setProperty("--mouse-x", `${x}%`);
            hero.style.setProperty("--mouse-y", `${y}%`);
        });
        hero.addEventListener("pointerleave", () => {
            hero.style.setProperty("--mouse-x", "75%");
            hero.style.setProperty("--mouse-y", "25%");
        });
    }

    const photoFrame = document.querySelector("[data-photo-frame]");
    const profilePhoto = document.querySelector("[data-profile-photo]");
    if (photoFrame && profilePhoto) {
        const markPhotoAsLoaded = () => photoFrame.classList.add("has-photo");
        if (profilePhoto.complete && profilePhoto.naturalWidth > 0) markPhotoAsLoaded();
        else profilePhoto.addEventListener("load", markPhotoAsLoaded, { once: true });
    }

    const learningToggle = document.querySelector("[data-learning-toggle]");
    const learningPanel = document.querySelector(".learning-panel");
    const learningToggleLabel = document.querySelector("[data-learning-toggle-label]");
    if (learningToggle && learningPanel && learningToggleLabel) {
        learningToggle.addEventListener("click", () => {
            const isOpen = learningPanel.classList.toggle("is-open");
            learningToggle.setAttribute("aria-expanded", String(isOpen));
            learningToggleLabel.textContent = isOpen ? "− Hide learning" : "+ View all learning";
        });
    }

    const revealElements = document.querySelectorAll([
        ".section-heading",
        ".about-grid",
        ".info-panel",
        ".experience-row",
        ".learning-panel",
        ".languages",
        ".why-row",
        ".beyond-row",
        ".switzerland-copy",
        ".contact-inner"
    ].join(","));

    body.classList.add("reveal-ready");
    revealElements.forEach((element) => element.classList.add("reveal"));

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observerInstance.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("is-visible"));
    }
});
