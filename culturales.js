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
// ══════════ QR MODAL ══════════
function abrirQR(ancla, nombre) {
  const base = window.location.href.split('#')[0].split('?')[0];
  const url  = base + '#' + ancla;

  const modal   = document.getElementById('qr-modal');
  const qrBox   = document.getElementById('qr-modal-code');
  const urlText = document.getElementById('qr-modal-url');

  // Limpiar QR anterior
  qrBox.innerHTML = '';

  // Actualizar texto
  urlText.textContent = url;

  // Insertar nombre si no existe ya
  let nameEl = document.getElementById('qr-modal-name');
  if (!nameEl) {
    nameEl = document.createElement('p');
    nameEl.id = 'qr-modal-name';
    nameEl.className = 'qr-modal-name';
    qrBox.parentNode.insertBefore(nameEl, qrBox);
  }
  nameEl.textContent = nombre;

  // Generar QR
  new QRCode(qrBox, {
    text: url,
    width: 200,
    height: 200,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  modal.classList.add('active');
}

function cerrarQR(e) {
  if (e.target === document.getElementById('qr-modal')) {
    document.getElementById('qr-modal').classList.remove('active');
  }
}

// Cerrar con Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('qr-modal').classList.remove('active');
});