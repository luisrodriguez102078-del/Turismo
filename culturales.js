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

// ══════════ VER MÁS / VER MENOS ══════════
document.addEventListener('DOMContentLoaded', () => {

  // Selectores donde aplicar "Ver más"
  // Agrupa párrafos dentro de .cul-info, .iglesia-content, .museo-intro-texto
  const contenedores = document.querySelectorAll(
    '.cul-info, .iglesia-content .iglesia-desc, .museo-intro-texto'
  );

  contenedores.forEach(contenedor => {
    // Para iglesia-desc aplicamos directo al párrafo
    if (contenedor.classList.contains('iglesia-desc')) {
      aplicarVerMas(contenedor, true);
      return;
    }

    // Para .cul-info y .museo-intro-texto: agrupar todos los párrafos .cul-desc / p
    const parrafos = contenedor.querySelectorAll('p.cul-desc, .museo-intro-texto > p');
    if (parrafos.length >= 2) {
      aplicarVerMasGrupo(parrafos);
    }
  });
});

function aplicarVerMas(el, esSolo) {
  const textoCompleto = el.textContent.trim();
  if (textoCompleto.length < 180) return; // No aplica si es corto

  // Mostrar solo los primeros ~120 caracteres cortando en palabra
  const preview = textoCompleto.substring(0, 120).replace(/\s\S+$/, '') + '…';

  el.setAttribute('data-completo', el.innerHTML);
  el.innerHTML = preview;
  el.classList.add('ver-mas-activo');

  const btn = crearBoton();
  el.insertAdjacentElement('afterend', btn);

  btn.addEventListener('click', () => toggleTexto(el, btn));
}

function aplicarVerMasGrupo(parrafos) {
  // Mostrar solo el primer párrafo, ocultar el resto
  const wrapper = document.createElement('div');
  wrapper.className = 'ver-mas-wrapper';

  const primero = parrafos[0];
  const ocultos = Array.from(parrafos).slice(1);

  // Crear contenedor colapsable
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
    btn.textContent = abierto ? '▾ Ver más' : '▴ Ver menos';
  });
}

function crearBoton() {
  const btn = document.createElement('button');
  btn.className = 'ver-mas-btn';
  btn.textContent = '▾ Ver más';
  return btn;
}

function toggleTexto(el, btn) {
  const abierto = el.classList.contains('expandido');
  if (abierto) {
    el.innerHTML = el.getAttribute('data-preview');
    el.classList.remove('expandido');
    btn.textContent = '▾ Ver más';
  } else {
    el.setAttribute('data-preview', el.innerHTML);
    el.innerHTML = el.getAttribute('data-completo');
    el.classList.add('expandido');
    btn.textContent = '▴ Ver menos';
  }
}