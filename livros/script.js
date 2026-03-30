const year = document.querySelector("#year");
const stickyCta = document.querySelector("[data-sticky]");
const heroSection = document.querySelector(".hero");
const revealItems = document.querySelectorAll("[data-reveal]");
const waLinks = document.querySelectorAll("[data-wa-message]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const whatsappNumber = "558597004668";

waLinks.forEach((link) => {
  const message = link.getAttribute("data-wa-message");

  if (!message) {
    return;
  }

  link.setAttribute(
    "href",
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  );
});

if (year) {
  year.textContent = new Date().getFullYear();
}

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  revealItems.forEach((item) => {
    item.classList.add("reveal-hidden");
    observer.observe(item);
  });
}

const updateStickyCta = () => {
  if (!stickyCta || !heroSection) {
    return;
  }

  const triggerPoint = heroSection.offsetHeight * 0.55;
  const shouldShow = window.scrollY > triggerPoint;
  stickyCta.classList.toggle("is-visible", shouldShow);
};

window.addEventListener("scroll", updateStickyCta, { passive: true });
window.addEventListener("resize", updateStickyCta);
updateStickyCta();
