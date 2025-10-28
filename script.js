// ===== MENU TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !expanded);
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('active');
  document.body.style.overflow = expanded ? '' : 'hidden';
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !navToggle.contains(e.target) && navLinks.classList.contains('active')) {
    navToggle.click();
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = document.querySelector('.header').offsetHeight;
      window.scrollTo({
        top: target.offsetTop - offset - 20,
        behavior: 'smooth'
      });
    }
  });
});

// ===== SCROLL REVEAL (Stagger) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      const cards = entry.target.querySelectorAll('[data-animate]');
      cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.section').forEach(section => observer.observe(section));

// ===== DYNAMIC YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();