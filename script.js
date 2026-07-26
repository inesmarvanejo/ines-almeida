document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".header");
  const hero = document.querySelector(".page-one");

  /* =================================
       HERO ENTRANCE
    ================================= */

  requestAnimationFrame(() => {
    body.classList.add("site-loaded");
  });

  /* =================================
       NAVBAR ON SCROLL
    ================================= */

  const updateHeader = () => {
    if (!header) {
      return;
    }

    header.classList.toggle("header-scrolled", window.scrollY > 30);
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, { passive: true });

  /* =================================
       HERO GLOW
    ================================= */

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

  /* =================================
       SCROLL REVEAL
    ================================= */

  const revealElements = document.querySelectorAll(
    [
      ".section-heading",
      ".experience-row",
      ".languages",
      ".why-row",
      ".contact",
    ].join(","),
  );

  body.classList.add("reveal-ready");

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");

          observerInstance.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  /* =================================
       EXPERIENCE ACCORDION
    ================================= */

  const experienceRows = document.querySelectorAll(".experience-row");

  experienceRows.forEach((row) => {
    const button = row.querySelector(".experience-summary");

    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      const isCurrentlyOpen = row.classList.contains("is-open");

      /*
       * Close the other experience rows.
       * Keeps the section compact.
       */

      experienceRows.forEach((otherRow) => {
        const otherButton = otherRow.querySelector(".experience-summary");

        otherRow.classList.remove("is-open");

        if (otherButton) {
          otherButton.setAttribute("aria-expanded", "false");
        }
      });

      /*
       * Open selected row unless
       * it was already open.
       */

      if (!isCurrentlyOpen) {
        row.classList.add("is-open");

        button.setAttribute("aria-expanded", "true");
      }
    });
  });
});
