/* =========================================================================
   PORTFOLIO SCRIPT — vanilla JS only, no libraries.
   Handles: mobile nav toggle, active nav link on scroll,
   and a simple fade-in reveal for sections as they enter the viewport.
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------------------------------
     1. Mobile navbar toggle
     --------------------------------------------------------------------- */
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".navbar__toggle");
  const navLinksWrap = document.querySelector(".navbar__links");

  if (navToggle && navLinksWrap && navbar) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinksWrap.classList.toggle("is-open");
      navbar.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the mobile menu after a link is tapped
    navLinksWrap.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinksWrap.classList.remove("is-open");
        navbar.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------------------
     2. Active nav link tracking while scrolling (Home / Projects / Contact)
     --------------------------------------------------------------------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".navbar__link[data-nav]");

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const setActiveLink = (id) => {
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.nav === id);
      });
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------------------------------------------------------------------
     3. Fade-in reveal for elements marked with .reveal
     --------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");

  if (revealEls.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: if IntersectionObserver isn't supported, just show everything
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
});
