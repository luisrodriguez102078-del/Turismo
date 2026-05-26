// ============================================================
//   CHICLIN – culturales.js
// ============================================================

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ── ANIMACIONES SCROLL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.cul-bloque, .museo-intro, .museo-gal-grid').forEach(el => {
  observer.observe(el);
});