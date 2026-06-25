/* ============================================================
   CHICAMA – Sistema Turístico Inteligente
   funciones.js
   ============================================================ */

// ── DATOS DE LOS DESTINOS ──
// Para cambiar imágenes: pon los archivos en la carpeta "img/"
// y reemplaza el valor de "img" con el nombre del archivo.
// Ejemplo: img: 'img/casagrande.jpg'

const destinos = [
  {
    id: "chocope",
    nombre: "CHOCOPE\nCORAZÓN DEL VALLE",
    ubicacion: "Chocope, Provincia de Ascope, La Libertad",
    desc: "Ciudad fundada en 1538, conocida como el Corazón del Valle Chicama. Cuna de la cultura cañavelera, con su histórica Iglesia San Pedro y San Pablo y sus campos infinitos de caña de azúcar.",
    img: "img/CHOCOPE/Chocope1.jpg",    
    video: "https://res.cloudinary.com/dmtzm0btl/video/upload/q_auto/f_auto/v1781245110/vidchocope_aicslz.mp4",
    cardLabel: "VALLE CHICAMA",
    cardSub: "CHOCOPE",
    qrUrl: "chicama.pe/lugar/1",
  },
  {
    id: "Puertomalabrigo",
    nombre: "PUERTO\nMALABRIGO",
    ubicacion: "Valle Chicama, La Libertad",
    desc: "La ola izquierda más larga del mundo, con más de 2 km de recorrido. Destino icónico para el surf internacional y orgullo del norte peruano.",
    img: "img/PUERTO/Puerto2.jpeg",    
    video: "https://res.cloudinary.com/dmtzm0btl/video/upload/q_auto/f_auto/v1781245110/Puerto1_isxljd.mp4",
    cardLabel: "Puerto Chicama",
    cardSub: "PLAYA PUERTO MALABRIGO",
    qrUrl: "chicama.pe/lugar/1",
  },
  {
    id: "casagrande",
    nombre: "CASA\nGRANDE",
    ubicacion: "Casa Grande, Provincia de Ascope, La Libertad",
    desc: "Ciudad ubicada a 48 km al norte de Trujillo, capital del distrito del mismo nombre. Emblema de la agroindustria azucarera peruana, con haciendas centenarias y extensos cañaverales que definen la identidad del Valle Chicama.",
    img: "img/CASAGRANDE/casagrande1.jpg",   
    video: "https://res.cloudinary.com/dmtzm0btl/video/upload/q_auto/f_auto/v1781245108/Casagrande_xlb3xz.mp4",
    cardLabel: "PROVINCIA ASCOPE",
    cardSub: "CASAGRANDE",
    qrUrl: "chicama.pe/lugar/2",
  },
  {
    id: 4,
    nombre: "MAGDALENA\nDE CAO",
    ubicacion: "Magdalena de Cao, Provincia de Ascope, La Libertad",
    desc: "Capital del distrito de Magdalena de Cao, ubicada a 50 km al noroeste de Trujillo. Hogar del Complejo Arqueológico El Brujo, donde fue descubierta la Señora de Cao, primera gobernante mujer de América precolombina.",
    img: "img/ELBRUJO/elbrujo2.jpg",  
    video: "https://res.cloudinary.com/dmtzm0btl/video/upload/q_auto/f_auto/v1781245110/magdalena_xbomty.mp4",
    cardLabel: "PROVINCIA ASCOPE",
    cardSub: "MAGDALENA DE CAO",
    qrUrl: "chicama.pe/lugar/3",
  },
  {
    id: 5,
    nombre: "SAUSAL\nTIERRA DEL ETERNO SOL",
    ubicacion: "Sausal, Distrito \n de Chicama  Provincia de Ascope, La Libertad",
    desc: "Pueblo fundado en 1750 como 'Santo Domingo de Sausal', ubicado donde el Valle Chicama se abre hacia los llanos costeros. Tierra cañavelera rodeada de paisajes impresionantes y rica tradición artesanal.",
    img: "img/SAUSAL/imsausal3.jpg",
    video: "https://res.cloudinary.com/dmtzm0btl/video/upload/q_auto/f_auto/v1781187926/Sausal2_mmflwp.mp4",
    cardLabel: "SAUSAL",
    cardSub: "VALLE CHICAMA",
    qrUrl: "chicama.pe/lugar/4",
  },
  {
    id: "chiclin",
    nombre: "CENTRO POBLADO\nCHICLÍN",
    ubicacion: "Chiclin,La Libertad",
    desc: "Pueblo tradicional del Valle de Chicama, reconocido por su historia, tranquilidad y conexión con la cultura cañavelera del norte peruano.",
    img: "img/CHICLIN/Chiclin1.jpg",       
    video: "https://res.cloudinary.com/dmtzm0btl/video/upload/q_auto/f_auto/v1781245104/Chiclin_iva0ze.mp4",     
    cardLabel: "VALLE DE CHICAMA",
    cardSub: "PUEBLO CHICLÍN",
    qrUrl: "chicama.pe/lugar/4",
  },
];

// ── ESTADO ──
let currentIndex = 0;
let isTransitioning = false;



// ── REFERENCIAS AL DOM ──
const heroBg      = document.getElementById('heroBg');
const heroTitle   = document.getElementById('heroTitle');
const heroDesc    = document.getElementById('heroDesc');
const heroLoc     = document.getElementById('heroLocation');
const heroContent = document.getElementById('heroContent');
const destCards   = document.getElementById('destCards');
const heroDots    = document.getElementById('heroDots');
const qrModal     = document.getElementById('qrModal');
const qrUrl       = document.getElementById('qrUrl');
const qrTitle     = document.getElementById('qrTitle');

// ── INICIALIZACIÓN ──
function init() {
  destinos.forEach(d => {
    if(d.video){
      const vid = document.createElement('video');
      vid.id = 'video-' + d.id;
      vid.className = 'hero-video-item';
      vid.autoplay = true;
      vid.muted = true;
      vid.loop = true;
      vid.playsInline = true;
      vid.src = d.video;
      vid.style.opacity = "0";
      vid.style.filter = "brightness(0.35)";
      document.getElementById('hero').appendChild(vid);
    }
  });

  buildCards();
  buildDots();
  setDestino(0, false);
}



// Construye las tarjetas en el DOM
function buildCards() {
  destCards.innerHTML = '';
  destinos.forEach((d, i) => {
    const card = document.createElement('div');
    card.className = 'dest-card' + (i === 0 ? ' active' : '');
    card.dataset.index = i;
    card.innerHTML = `
      <img src="${d.img}" alt="${d.cardSub}" onerror="this.src='img/placeholder.jpg'"/>
      <div class="dest-card-info">
        <div class="dest-card-location">${d.cardLabel}</div>
        <div class="dest-card-name">${d.cardSub}</div>
      </div>
    `;
    card.addEventListener('click', () => changeDestino(i));
    destCards.appendChild(card);
  });
}

// Construye los puntos de navegación
function buildDots() {
  heroDots.innerHTML = '';
  destinos.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => changeDestino(i));
    heroDots.appendChild(dot);
  });
}

// ── CAMBIO DE DESTINO (con efecto glitch tecnológico) ──
function changeDestino(index) {
  if (isTransitioning || index === currentIndex) return;
  isTransitioning = true;

  const prevIndex = currentIndex;
  currentIndex = index;

  // 1. Efecto glitch en la tarjeta que se activa
  const cards = document.querySelectorAll('.dest-card');
  cards.forEach(c => c.classList.remove('active'));
  const activeCard = cards[index];
  activeCard.classList.add('active');

  // 2. Animación de salida del texto
  heroContent.classList.add('transitioning');

  // 3. Efecto glitch en el fondo
  

  // 4. A mitad del efecto, cambia la imagen y el contenido
  heroBg.classList.add('changing');

setDestino(index, true);
heroBg.classList.add('changing');
setTimeout(() => {
  heroBg.classList.remove('changing');
}, 260);

  
  setTimeout(() => {
  heroBg.style.transform = "scale(1)";
}, 50);

  // 5. Animación de entrada del texto
  setTimeout(() => {
    heroContent.classList.remove('transitioning');
    heroContent.classList.add('entering');
    setTimeout(() => heroContent.classList.remove('entering'), 600);
    isTransitioning = false;
  }, 320);

  // Actualiza puntos
  updateDots(index);
}

// Aplica los datos del destino al DOM
function setDestino(index, animate) {
  const d = destinos[index];

  // Imagen de fondo
  document.querySelectorAll('.hero-video-item').forEach(v => {
  v.style.opacity = "0";
});

if(d.video){
  const vid = document.getElementById('video-' + d.id);
  if(vid){
    vid.style.opacity = "1";
    vid.style.filter = "brightness(0.35)";
  }
  heroBg.style.opacity = "0";
}else{
  heroBg.style.opacity = "1";
  heroBg.style.backgroundImage = `url('${d.img}')`;
}

  // Texto
  heroTitle.innerHTML = d.nombre.replace('\n', '<br/>');
  heroDesc.textContent = d.desc;
  heroLoc.textContent  = d.ubicacion;

  // Marca la tarjeta activa
  document.querySelectorAll('.dest-card').forEach((c, i) => {
    c.classList.toggle('active', i === index);
  });
}

// Actualiza los dots
function updateDots(index) {
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
}

// ── BOTÓN EXPLORAR ──
function handleExplore() {
  const d = destinos[currentIndex];
  window.location.href = `destino.html?id=${d.id}`;
}

// ── BOTÓN QR ──
document.querySelector('.btn-qr').addEventListener('click', () => {
  const d = destinos[currentIndex];
  qrTitle.textContent = d.cardSub;
  qrUrl.textContent = d.qrUrl;
  qrModal.classList.add('open');
});

function closeQR() {
  qrModal.classList.remove('open');
}

// Cerrar modal al hacer clic fuera
qrModal.addEventListener('click', (e) => {
  if (e.target === qrModal) closeQR();
});

// ── BOTÓN TEMA (claro/oscuro) ──
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeBtn.textContent = document.body.classList.contains('light') ? '☀' : '☽';
});

// ── TECLADO: flechas para navegar ──
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    changeDestino((currentIndex + 1) % destinos.length);
  }
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    changeDestino((currentIndex - 1 + destinos.length) % destinos.length);
  }
  if (e.key === 'Escape') closeQR();
});

// ── AUTO-ROTACIÓN cada 6 segundos ──
let autoRotate = setInterval(() => {
  changeDestino((currentIndex + 1) % destinos.length);
}, 8000);

// Pausa auto-rotación si el usuario interactúa
destCards.addEventListener('click', () => {
  clearInterval(autoRotate);
  // Reinicia después de 15 segundos de inactividad
  autoRotate = setInterval(() => {
    changeDestino((currentIndex + 1) % destinos.length);
  }, 8000);
});

// ── BUSCADOR (básico) ──
document.getElementById('searchInput').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  if (!query) return;
  const idx = destinos.findIndex(d =>
    d.nombre.toLowerCase().includes(query) ||
    d.ubicacion.toLowerCase().includes(query) ||
    d.cardSub.toLowerCase().includes(query)
  );
  if (idx !== -1) changeDestino(idx);
});

// ── ARRANCAR ──
init();