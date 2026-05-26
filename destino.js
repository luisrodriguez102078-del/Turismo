/**
 * CHICLIN
 */
const destinos = {

  chiclin: {
    nombre: "CENTRO POBLADO\nCHICLÍN",
    tag: "Valle Chicama · La Libertad · Perú",
    ubicacion: "Chiclin, Distrito de Chicama, Provincia de Ascope, La Libertad",
    desc: "Pueblo tradicional del Valle de Chicama, reconocido por su historia, tranquilidad y conexión con la cultura cañavelera del norte peruano.",
    badges: ["Cultura", "Tradición", "Caña de Azúcar"],


    heroSlides: [
      { img: "img/CHICLIN/atractivos/c9.jpg",       label: "Cristo Rey" },
      { img: "img/CHICLIN/fotos/d2.jpg",             label: "Museo Chiclín"   },       
      { img: "img/CHICLIN/fotos/d8.png",             label: "Pueblo"     },
      { img: "img/CHICLIN/fotos/Principal.jpg",      label: "Principal"  },
      { img: "img/CHICLIN/fotos/d7.png",             label: "Plaza de Armas" },
      { img: "img/CHICLIN/festividades/R3.jpg",             label: "Danza"     },
    ],

    historia: {
      titulo: "Historia de Chiclín",
      parrafos: [
        "Chiclín es un pueblo tradicional del Valle de Chicama, reconocido por su profunda conexión con la cultura cañavelera del norte peruano. Su historia está marcada por el auge de la industria azucarera que transformó toda la región.",
        "El pueblo creció alrededor de la actividad agroindustrial, formando una identidad única donde la caña de azúcar no solo representa economía sino también cultura, tradición y forma de vida para sus habitantes.",
        "La hacienda de Chiclín fue uno de los principales centros de producción azucarera del Valle Chicama durante el siglo XX, dejando un legado histórico que aún se puede apreciar en el pueblo.",
      ],
      img: "img/CHICLIN/historia/G5.jpg",
      caption: "Chiclín histórico",
      img2: "img/CHICLIN/historia/G3.jpg",
    },

    
    categorias: [
      {
        icono: "🎭",
        titulo: "Costumbres y tradiciones",
        enlace: "constumbres.html?id=chiclin",
        video: "videos/CHICLIN/danzas.mp4",
        items: [
          {
            nombre: "Danzas autóctonas",
            desc: "Expresiones culturales tradicionales que mantienen viva la identidad del Valle Chicama.",
            video: "videos/CHICLIN/constumbres.mp4",
          },
          {
            nombre: "Festividades religiosas y regionales",
            desc: "Celebraciones patronales que reúnen a la comunidad con fe, música y gastronomía típica.",
            video: "img/CHICLIN/festividades/patronal.jpg",
          },
          {
            nombre: "Artesanías",
            desc: "Producción artesanal local que refleja la creatividad y herencia cultural del pueblo.",
            video: "img/CHICLIN/actividades/artesanias.jpg",
          },
        ],
      },
      {
        icono: "🏛️",
        titulo: "Culturales",
        enlace: "culturales.html?id=chiclin",
        video: "videos/CHICLIN/constumbres1.mp4",
        items: [
          {
            nombre: "Museo",
            desc: "Colecciones históricas que narran la historia de Chiclín y el Valle Chicama.",
            video: "videos/CHICLIN/constumbres.mp4",
          },
          {
            nombre: "Monumentos",
            desc: "Obras arquitectónicas e históricas que representan el patrimonio cultural del pueblo.",
            img: "img/CHICLIN/historia/G4.png",
          },
        ],
      },
      {
        icono: "🏺",
        titulo: "Arqueológicos turísticos",
        enlace: "arqueologicos.html?id=chiclin",
        video: "videos/CHICLIN/arqueologicos.mp4",
        items: [
          {
            nombre: "Centros arqueológicos / Huacas",
            desc: "Vestigios precolombinos que evidencian la presencia de culturas antiguas en el Valle Chicama.",
            img: "img/CHICLIN/huacas/huaca1.jpg",
          },
          {
            nombre: "Lugares turísticos",
            desc: "Puntos de interés del pueblo que ofrecen una experiencia auténtica del Valle Chicama.",
            img: "img/CHICLIN/atractivos/lugares.jpg",
          },
        ],
      },
    ],

    video: "img/CHICLIN/videos/chiclin.mp4",
    videoTitulo: "CHICLÍN",

    mapa: {
      direccion: "Chiclín, Distrito de Chicama, Provincia de Ascope, La Libertad, Perú",
      distancia: "Aproximadamente 55 km al norte de Trujillo (45 min en auto)",
      horario: "Visita libre todo el día",
      transporte: "Combis desde Terminal de Trujillo hacia Chicama. Bajarse en Chiclín.",
      googleMapsUrl: "https://maps.google.com/?q=Chiclin,La+Libertad,Peru",
      embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31838.4!2d-79.0544!3d-7.8175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904916b5e12bc0c3%3A0x65e6e9d5a1b38db0!2sChicl%C3%ADn!5e0!3m2!1ses!2spe!4v1234567890",
    },
  },

};

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const d = destinos[id];
if (!d) window.location.href = 'index.html';

// Título pestaña
document.getElementById('pageTitle').textContent = d.nombre.replace('\n', ' ') + ' – Valle Chicama';

// Hero texto
document.getElementById('heroTag').textContent = d.tag;
document.getElementById('heroTitle').innerHTML = d.nombre.replace('\n', '<br/>');
document.getElementById('heroUbicacion').textContent = d.ubicacion;
document.getElementById('heroDesc').textContent = d.desc;

// Badges
const badgesEl = document.getElementById('heroBadges');
d.badges.forEach(b => {
  const s = document.createElement('span');
  s.className = 'badge';
  s.textContent = b;
  badgesEl.appendChild(s);
});

// ══ HERO SLIDES + THUMBNAIL CARDS ══
let currentSlide = 0;
const slidesEl = document.getElementById('heroSlides');
const dotsEl   = document.getElementById('heroDots');
const thumbsEl = document.getElementById('heroThumbs');

// Normalizar slides (acepta string o {img, label})
const slides = d.heroSlides.map(s =>
  typeof s === 'string' ? { img: s, label: '' } : s
);

slides.forEach((slide, i) => {
  // --- Slide de fondo ---
  const div = document.createElement('div');
  div.className = 'hero-slide' + (i === 0 ? ' active' : '');
  div.style.backgroundImage = `url('${slide.img}')`;
  slidesEl.appendChild(div);

  // --- Dot inferior ---
  const dot = document.createElement('div');
  dot.className = 'hdot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goToSlide(i));
  dotsEl.appendChild(dot);

  // --- Thumbnail card derecha ---
  const thumb = document.createElement('div');
  thumb.className = 'hero-thumb' + (i === 0 ? ' active' : '');
  thumb.innerHTML = `
    <div class="hero-thumb-dot"></div>
    <img class="hero-thumb-img" src="${slide.img}" alt="${slide.label}"
         onerror="this.style.background='#1a1d24'"/>
    <div class="hero-thumb-label">${slide.label}</div>
  `;
  thumb.addEventListener('click', () => { goToSlide(i); resetAuto(); });
  thumbsEl.appendChild(thumb);
});

function goToSlide(index) {
  // Slides fondo
  document.querySelectorAll('.hero-slide')[currentSlide].classList.remove('active');
  document.querySelectorAll('.hero-slide')[index].classList.add('active');
  // Dots
  document.querySelectorAll('.hdot')[currentSlide].classList.remove('active');
  document.querySelectorAll('.hdot')[index].classList.add('active');
  // Thumbs — rotación tipo carrusel
  const thumbs = document.querySelectorAll('.hero-thumb');
  const total = thumbs.length;
  thumbs.forEach((thumb, i) => {
    thumb.classList.remove('active');
    // Calcula la posición relativa al slide activo
    const pos = (i - index + total) % total;
    thumb.style.order = pos;
    thumb.style.opacity = pos === 0 ? '1' : pos === 1 ? '0.75' : pos === 2 ? '0.55' : '0.35';
    thumb.style.transform = pos === 0
      ? 'scale(1) translateY(0)'
      : `scale(${0.92 - pos * 0.04}) translateY(${pos * 8}px)`;
  });
  thumbs[index].classList.add('active');
  currentSlide = index;
}

function nextSlide() { goToSlide((currentSlide + 1) % slides.length); }
function prevSlide()  { goToSlide((currentSlide - 1 + slides.length) % slides.length); }



let autoSlide = setInterval(nextSlide, 8000);
function resetAuto() { clearInterval(autoSlide); autoSlide = setInterval(nextSlide, 8000); }

// Historia
document.getElementById('historiaTitle').textContent = d.historia.titulo;
const parrafosEl = document.getElementById('historiaParrafos');
d.historia.parrafos.forEach(p => {
  const el = document.createElement('p');
  el.textContent = p;
  parrafosEl.appendChild(el);
});
document.getElementById('historiaImg').src = d.historia.img;
document.getElementById('historiaCaption').textContent = d.historia.caption;
if (d.historia.img2) {
  document.getElementById('historiaImg2').src = d.historia.img2;
} else {
  document.getElementById('historiaImg2Wrap').style.display = 'none';
}

// Categorías — big card style
// Categorías — big card style
const catGrid = document.getElementById('categoriasGrid');
d.categorias.forEach((cat) => {
  const coverImg = cat.items[0]?.img || '';
  const pillsHTML = cat.items.map(item =>
    `<span class="cat-big-card-item-pill">${item.nombre}</span>`
  ).join('');

  // ✅ Decidir si usar video o imagen
  const mediaHTML = cat.video
    ? `<video class="cat-big-card-img" src="${cat.video}" autoplay muted loop playsinline></video>`
    : `<div class="cat-big-card-img" style="background-image:url('${coverImg}')"></div>`;

  const card = document.createElement('div');
  card.className = 'cat-big-card anim';
 card.style.cursor = 'pointer';
card.addEventListener('click', () => {
  if (cat.enlace) window.location.href = cat.enlace;
});

  
  card.innerHTML = `
    ${mediaHTML}
    <div class="cat-big-card-overlay"></div>
    <div class="cat-big-card-items">${pillsHTML}</div>
    <div class="cat-big-card-body">
      <span class="cat-big-card-icon">${cat.icono}</span>
      <div class="cat-big-card-title">${cat.titulo}</div>
      <div class="cat-big-card-sub">${cat.items.length} atractivos</div>
    </div>
  `;
  catGrid.appendChild(card);
});

// Video
const videoEl  = document.getElementById('destVideo');
const secVideo = document.getElementById('secVideo');
if (d.video) {
  videoEl.src = d.video;
  document.getElementById('videoTitulo').textContent = d.videoTitulo || '';
} else {
  secVideo.style.display = 'none';
}

// Mapa
document.getElementById('mapaDireccion').textContent  = d.mapa.direccion;
document.getElementById('mapaDistancia').textContent  = d.mapa.distancia;
document.getElementById('mapaHorario').textContent    = d.mapa.horario;
document.getElementById('mapaTransporte').textContent = d.mapa.transporte;
document.getElementById('btnMaps').href               = d.mapa.googleMapsUrl;
document.getElementById('mapaEmbed').src              = d.mapa.embed;

// Navbar scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Animaciones scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.anim').forEach(el => observer.observe(el));