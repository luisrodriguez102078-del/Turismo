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
  // URL siempre apunta a GitHub Pages — sin detección de hostname
  const url = 'https://luisrodriguez102078-del.github.io/Turismo/culturales.html#' + ancla;

  const modal   = document.getElementById('qr-modal');
  const qrBox   = document.getElementById('qr-modal-code');
  const urlText = document.getElementById('qr-modal-url');
  const nameEl  = document.getElementById('qr-modal-name');

  nameEl.textContent = nombre;
  urlText.textContent = url;

  const encoded = encodeURIComponent(url);
  qrBox.innerHTML = `<img 
    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}&color=000000&bgcolor=ffffff&margin=10" 
    alt="Código QR de ${nombre}"
    width="200" height="200"
    style="border-radius:8px; display:block;"
  />`;

  modal.classList.add('active');
}

function cerrarQR(e) {
  if (e.target === document.getElementById('qr-modal')) {
    document.getElementById('qr-modal').classList.remove('active');
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('qr-modal').classList.remove('active');
});

// ══════════ VER MÁS / VER MENOS ══════════
document.addEventListener('DOMContentLoaded', () => {

  // Iglesias: párrafo directo
  document.querySelectorAll('.iglesia-desc').forEach(el => {
    aplicarVerMas(el);
  });

  // Monumentos y museo: solo párrafos <p>, NUNCA .cul-cita
  document.querySelectorAll('.cul-info, .museo-intro-texto').forEach(contenedor => {
    const parrafos = Array.from(contenedor.querySelectorAll('p.cul-desc, p')).filter(
    p => !p.closest('blockquote')
);
    if (parrafos.length >= 2) {
      aplicarVerMasGrupo(Array.from(parrafos));
    }
  });
});

function aplicarVerMas(el) {
  if (el.textContent.trim().length < 150) return;
  const htmlCompleto = el.innerHTML;
  const textoCorto = el.textContent.trim().substring(0, 130).replace(/\s\S+$/, '') + '…';

  el.innerHTML = textoCorto;
  el.dataset.completo = htmlCompleto;
  el.dataset.expandido = 'no';

  const btn = crearBoton();
  el.insertAdjacentElement('afterend', btn);

  btn.addEventListener('click', () => {
    if (el.dataset.expandido === 'no') {
      el.innerHTML = el.dataset.completo;
      el.dataset.expandido = 'si';
      btn.innerHTML = '▴ Ver menos';
    } else {
      el.innerHTML = textoCorto;
      el.dataset.expandido = 'no';
      btn.innerHTML = '▾ Ver más';
    }
  });
}

function aplicarVerMasGrupo(parrafos) {
  if (parrafos.length < 2) return;
  const primero = parrafos[0];
  const ocultos = parrafos.slice(1);

  const colapsable = document.createElement('div');
  colapsable.className = 'ver-mas-colapsable';
  colapsable.style.display = 'none';

  ocultos.forEach(p => {
    colapsable.appendChild(p.cloneNode(true));
    p.remove();
  });

  primero.insertAdjacentElement('afterend', colapsable);

  const btn = crearBoton();
  colapsable.insertAdjacentElement('afterend', btn);

  btn.addEventListener('click', () => {
    const abierto = colapsable.style.display !== 'none';
    colapsable.style.display = abierto ? 'none' : 'block';
    btn.innerHTML = abierto ? '▾ Ver más' : '▴ Ver menos';
  });
}

function crearBoton() {
  const btn = document.createElement('button');
  btn.className = 'ver-mas-btn';
  btn.innerHTML = '▾ Ver más';
  return btn;
}

// ══════════ HAMBURGER MENU ══════════
function toggleMenu() {
  const nav = document.getElementById('nav-links');
  const btn = document.getElementById('hamburger');
  const abierto = nav.classList.toggle('menu-abierto');
  btn.classList.toggle('abierto', abierto);
  document.body.style.overflow = abierto ? 'hidden' : '';
}

function cerrarMenu() {
  document.getElementById('nav-links').classList.remove('menu-abierto');
  document.getElementById('hamburger').classList.remove('abierto');
  document.body.style.overflow = '';
}

window.addEventListener('scroll', () => {
  if (document.getElementById('nav-links').classList.contains('menu-abierto')) {
    cerrarMenu();
  }
}, { passive: true });

// ══════════ ABRIR IMAGEN FULLSCREEN ══════════
function abrirImagen(src) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed; inset:0; background:rgba(0,0,0,0.95);
    z-index:99999; display:flex; align-items:center;
    justify-content:center; cursor:zoom-out;
    padding:16px; box-sizing:border-box;
  `;
  overlay.innerHTML = `
    <button onclick="this.parentElement.remove()" style="
      position:absolute; top:16px; right:20px;
      background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2);
      color:#fff; font-size:1.4rem; width:40px; height:40px;
      border-radius:50%; cursor:pointer; display:flex;
      align-items:center; justify-content:center;">✕</button>
    <img src="${src}" style="
      max-width:100%; max-height:90vh;
      object-fit:contain; border-radius:10px;
      box-shadow:0 0 60px rgba(0,0,0,0.8);">
  `;
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.remove();
  });
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); }
  });
  document.body.appendChild(overlay);
}

// ══════════ VER MÁS: GALERÍA Y LÍNEA DEL TIEMPO ══════════
function aplicarVerMasVisual(selectorContenedor, selectorItems, cantidadVisible, textoBtn) {
  const contenedor = document.querySelector(selectorContenedor);
  if (!contenedor) return;

  const items = Array.from(contenedor.querySelectorAll(selectorItems));
  if (items.length <= cantidadVisible) return;

  items.forEach((item, i) => {
    if (i >= cantidadVisible) item.classList.add('vm-oculto');
  });

  const btn = document.createElement('button');
  btn.className = 'vm-visual-btn';
  btn.innerHTML = `▾ ${textoBtn}`;
  contenedor.insertAdjacentElement('afterend', btn);

  btn.addEventListener('click', () => {
    const expandido = btn.dataset.expandido === 'si';
    items.forEach((item, i) => {
      if (i >= cantidadVisible) item.classList.toggle('vm-oculto', expandido);
    });
    btn.dataset.expandido = expandido ? 'no' : 'si';
    btn.innerHTML = expandido ? `▾ ${textoBtn}` : '▴ Ver menos';
    if (expandido) {
      contenedor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  aplicarVerMasVisual('.museo-gal-grid', '.museo-gal-item', 6, 'Ver más fotos');
  aplicarVerMasVisual('.museo-tl-grid', '.museo-tl-item', 3, 'Ver más historia');
});

// ══════════ QR HACIA PÁGINA EXTERNA (no ancla de culturales.html) ══════════
function abrirQRPagina(urlCompleta, nombre) {
  const modal   = document.getElementById('qr-modal');
  const qrBox   = document.getElementById('qr-modal-code');
  const urlText = document.getElementById('qr-modal-url');
  const nameEl  = document.getElementById('qr-modal-name');

  nameEl.textContent = nombre;
  urlText.textContent = urlCompleta;

  const encoded = encodeURIComponent(urlCompleta);
  qrBox.innerHTML = `<img 
    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}&color=000000&bgcolor=ffffff&margin=10" 
    alt="Código QR de ${nombre}"
    width="200" height="200"
    style="border-radius:8px; display:block;"
  />`;

  modal.classList.add('active');
}