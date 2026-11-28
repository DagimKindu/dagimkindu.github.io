/* ============================================================
   NAVBAR — scroll effect
============================================================ */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
  updateActiveLink();
  toggleBackToTop();
});

/* ============================================================
   MOBILE MENU
============================================================ */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const icon = navToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    const icon = navToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
  });
});

/* ============================================================
   ACTIVE LINK ON SCROLL
============================================================ */
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute("id");
  });
  navItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

/* ============================================================
   TYPING EFFECT
============================================================ */
const typedEl = document.querySelector(".typed-text");
const roles = [
  "Health Informatics Professional",
  "Data Analyst",
  "Research Assistant",
  "DHIS2 & HMIS Specialist",
  "Problem Solver"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 45 : 90;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }
  setTimeout(typeRole, speed);
}
typeRole();

/* ============================================================
   STATS COUNTER
============================================================ */
const statNumbers = document.querySelectorAll(".stat-number");
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  const statsSection = document.querySelector(".stats");
  if (!statsSection) return;
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    statsAnimated = true;
    statNumbers.forEach((num) => {
      const target = +num.dataset.target;
      const duration = 1600;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        num.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
        else num.textContent = target.toLocaleString() + (target === 1000 ? "+" : "");
      }
      requestAnimationFrame(update);
    });
  }
}
window.addEventListener("scroll", animateStats);
animateStats();

/* ============================================================
   SCROLL REVEAL
============================================================ */
const revealEls = document.querySelectorAll(
  ".section-header, .about-text, .highlight-card, .skill-card, .timeline-item, .project-card, .edu-card, .cert-card, .contact-card"
);
revealEls.forEach((el) => el.classList.add("fade-in"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
revealEls.forEach((el) => revealObserver.observe(el));

/* ============================================================
   BACK TO TOP
============================================================ */
const backToTop = document.getElementById("backToTop");

function toggleBackToTop() {
  backToTop.classList.toggle("show", window.scrollY > 500);
}

/* ============================================================
   FOOTER YEAR
============================================================ */
document.getElementById("year").textContent = new Date().getFullYear();
