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

// Close on outside click or ESC key
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !navToggle.contains(e.target) && navLinks.classList.contains('active')) {
    navToggle.click();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('active')) {
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
        top: target.offsetTop - offset - 30,
        behavior: 'smooth'
      });
      if (navLinks.classList.contains('active')) {
        navToggle.click();
      }
    }
  });
});

// ===== SCROLL REVEAL (Staggered with improved performance) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      const elements = entry.target.querySelectorAll('[data-animate]');
      elements.forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.15}s`;
        el.classList.add('animate-in');
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.section').forEach(section => observer.observe(section));

// ===== DYNAMIC YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== LAZY LOADING IMAGES (Already handled by loading="lazy", but enhance if needed) =====