const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function closeMenu() {
  if (!toggle || !navLinks) return;
  toggle.classList.remove('active');
  navLinks.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
}
function updateHeader() {
  if (header) header.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const revealTargets = document.querySelectorAll('.activity-card, .gallery-card, .about-copy, .contact-card, .intro-grid');
revealTargets.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('visible'));
}
