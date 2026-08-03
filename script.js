// ---------- typing effect ----------
function typeLine(el, text, speed, done) {
  let i = 0;
  el.textContent = '';
  const timer = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      if (done) done();
    }
  }, speed);
}

document.addEventListener('DOMContentLoaded', () => {
  const nameEl = document.getElementById('typedName');
  const roleEl = document.getElementById('typedRole');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (nameEl && roleEl) {
    if (prefersReduced) {
      nameEl.textContent = 'Robiul Islam Noyan';
      roleEl.textContent = 'Software Engineering student · Backend Developer · Competitive Programmer';
    } else {
      setTimeout(() => {
        typeLine(nameEl, 'Robiul Islam Noyan', 45, () => {
          setTimeout(() => {
            typeLine(roleEl, 'Software Engineering student · Backend Developer · Competitive Programmer', 22);
          }, 350);
        });
      }, 300);
    }
  }

  // ---------- mobile nav toggle ----------
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- scroll reveal ----------
  const revealTargets = document.querySelectorAll(
    '.section-title, .about-grid, .skills-grid, .timeline, .project-card, .split-grid, .terminal-contact'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window && !prefersReduced) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  // ---------- footer year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});