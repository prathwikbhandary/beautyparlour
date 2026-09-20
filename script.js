// Navbar scroll + hamburger
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const hamburgerIcon = document.getElementById('hamburgerIcon');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navOverlay.classList.toggle('active', open);
  hamburgerIcon.className = open ? 'fas fa-times' : 'fas fa-bars';
});

navOverlay.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navOverlay.classList.remove('active');
  hamburgerIcon.className = 'fas fa-bars';
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    navLinks.classList.remove('open');
    navOverlay.classList.remove('active');
    hamburgerIcon.className = 'fas fa-bars';
  });
});

// Services tabs
const categories = [
  { id: 'face', icon: '🌸', title: 'Eyebrow & Face', color: '#f7e8ec', accent: '#c9748a', services: ['Eyebrow Threading','Upper Lip','Forehead Threading','Full Face Threading','Face Cleanup','Facial','Bleach','De-Tan','Face Massage'] },
  { id: 'hair', icon: '💇', title: 'Hair Services', color: '#fdf0f5', accent: '#a85570', services: ['Haircut','Hair Styling','Hair Wash','Hair Spa','Hair Straightening','Hair Curling','Hair Coloring','Hair Treatments'] },
  { id: 'hands', icon: '💅', title: 'Hand & Feet', color: '#fef6ee', accent: '#c9a96e', services: ['Manicure','Pedicure','Spa Pedicure','Nail Care','Nail Polish','Nail Art'] },
  { id: 'waxing', icon: '✨', title: 'Waxing', color: '#f5f0fe', accent: '#9b72cf', services: ['Full Hand Waxing','Full Leg Waxing','Underarm Waxing','Full Body Waxing','Half Leg Waxing','Half Hand Waxing'] },
  { id: 'skin', icon: '🌿', title: 'Skin Care', color: '#f0faf5', accent: '#4caf82', services: ['Basic Facial','Gold Facial','Bridal Facial','Fruit Facial','Glow Facial','Cleanup','De-Tan Treatment','Skin Polishing'] },
  { id: 'nails', icon: '💎', title: 'Nail Art', color: '#fff0f8', accent: '#e91e8c', services: ['Nail Extensions','Gel Nails','Acrylic Nails','Nail Art Designs','French Manicure','Nail Stamping'] },
];

let activeId = 'face';

function renderTabs() {
  const tabsEl = document.getElementById('servicesTabs');
  tabsEl.innerHTML = categories.map(cat => `
    <button class="svc-tab${cat.id === activeId ? ' active' : ''}" data-id="${cat.id}"
      style="${cat.id === activeId ? `background:${cat.accent};color:#fff;border-color:${cat.accent}` : ''}">
      ${cat.icon} ${cat.title}
    </button>
  `).join('');
  tabsEl.querySelectorAll('.svc-tab').forEach(btn => {
    btn.addEventListener('click', () => { activeId = btn.dataset.id; renderTabs(); renderPanel(); });
  });
}

function renderPanel() {
  const cat = categories.find(c => c.id === activeId);
  document.getElementById('servicesPanel').innerHTML = `
    <div class="panel-header" style="background:${cat.color}">
      <span class="panel-icon" style="color:${cat.accent}">${cat.icon}</span>
      <div>
        <h3 style="color:${cat.accent}">${cat.title}</h3>
        <p>${cat.services.length} Services Available</p>
      </div>
    </div>
    <div class="services-grid">
      ${cat.services.map(s => `
        <div class="svc-card">
          <span class="svc-dot" style="background:${cat.accent}"></span>
          <span class="svc-name">${s}</span>
          <span class="svc-price">Contact for pricing</span>
        </div>
      `).join('')}
    </div>
  `;
}

renderTabs();
renderPanel();

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.section-header, .about-visual, .about-content, .makeup-grid, .makeup-cta, .why-grid, .insta-handle, .insta-grid, .contact-grid, .appt-container, .services-tabs, .services-panel, .services-note').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});
