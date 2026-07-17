
const projects = [
  {
    id: 'p1',
    title: { fr: 'Agri-Tech Cameroun', en: 'Agri-Tech Cameroon' },
    desc: {
      fr: 'Modernisation de l’agriculture locale par la technologie.',
      en: 'Modernizing local agriculture through technology.'
    },
    longDesc: `
      <p>
        Ce projet vise à connecter les petits exploitants agricoles
        aux outils numériques modernes afin d’augmenter les rendements,
        réduire les pertes et améliorer la traçabilité.
      </p>
    `,
    images: [
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
      'https://images.unsplash.com/photo-1598514982845-f02e2d83f3b3',
      'https://images.unsplash.com/photo-1560493676-04071c5f467b'
    ],
    video: null,
    owner: {
      name: 'Marc Ndzié',
      age: 36,
      city: 'Douala',
      role: 'CEO & Fondateur',
      avatar: 'https://i.pravatar.cc/150?u=marc'
    },
    raised: 812500,
    goal: 1250000,
    contributors: 24,
    createdAt: '2026-01-05'
  },

  {
    id: 'p2',
    title: { fr: 'Énergie Solaire Rurale', en: 'Rural Solar Energy' },
    desc: {
      fr: 'Installation de kits solaires dans les villages.',
      en: 'Solar kits installation in rural areas.'
    },
    longDesc: `<p>Accès à l’énergie propre pour les zones rurales.</p>`,
    images: [
      'https://images.unsplash.com/photo-1509395176047-4a66953fd231',
      'https://images.unsplash.com/photo-1584270354949-1bafbfbc1c23'
    ],
    video: null,
    owner: {
      name: 'Aline K.',
      age: 29,
      city: 'Bafoussam',
      role: 'Ingénieure énergie',
      avatar: 'https://i.pravatar.cc/150?u=aline'
    },
    raised: 420000,
    goal: 900000,
    contributors: 12,
    createdAt: '2026-01-12'
  },

  {
    id: 'p3',
    title: { fr: 'Kribi Beach VR', en: 'Kribi Beach VR' },
    desc: {
      fr: 'Expérience de réalité virtuelle pour la plage de Kribi.',
      en: 'Virtual reality experience for Kribi beach.'
    },
    longDesc: `<p>Projet pour promouvoir le tourisme via la VR.</p>`,
    images: [
      'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=800&q=80'
    ],
    video: null,
    owner: {
      name: 'Jean Dupont',
      age: 32,
      city: 'Kribi',
      role: 'Développeur VR',
      avatar: 'https://i.pravatar.cc/150?u=jean'
    },
    raised: 450000,
    goal: 1500000,
    contributors: 12,
    createdAt: '2026-01-15'
  },

  {
    id: 'p4',
    title: { fr: 'Solar Adamaoua', en: 'Adamaoua Solar' },
    desc: {
      fr: 'Énergie solaire dans l’Adamaoua.',
      en: 'Solar energy in Adamaoua.'
    },
    longDesc: `<p>Installation de panneaux solaires dans la région de l'Adamaoua.</p>`,
    images: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80'
    ],
    video: null,
    owner: {
      name: 'Ahmed B.',
      age: 40,
      city: 'Ngaoundéré',
      role: 'Ingénieur',
      avatar: 'https://i.pravatar.cc/150?u=ahmed'
    },
    raised: 10000000,
    goal: 10000000,
    contributors: 89,
    createdAt: '2025-11-01'  // Date ancienne pour que le projet soit terminé
  },

  {
    id: 'p5',
    title: { fr: 'EdTech Douala', en: 'EdTech Douala' },
    desc: {
      fr: 'Technologie éducative à Douala.',
      en: 'Educational technology in Douala.'
    },
    longDesc: `<p>Plateforme d'apprentissage en ligne pour les étudiants.</p>`,
    images: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
    ],
    video: null,
    owner: {
      name: 'Sophie M.',
      age: 28,
      city: 'Douala',
      role: 'Éducatrice',
      avatar: 'https://i.pravatar.cc/150?u=sophie'
    },
    raised: 2500000,
    goal: 5000000,
    contributors: 56,
    createdAt: '2026-01-10'
  },

  {
    id: 'p6',
    title: { fr: 'Eco-Packaging Yaoundé', en: 'Eco-Packaging Yaounde' },
    desc: {
      fr: 'Emballages écologiques à Yaoundé.',
      en: 'Eco-friendly packaging in Yaounde.'
    },
    longDesc: `<p>Production d'emballages durables et écologiques.</p>`,
    images: [
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80'
    ],
    video: null,
    owner: {
      name: 'Paul T.',
      age: 35,
      city: 'Yaoundé',
      role: 'Entrepreneur',
      avatar: 'https://i.pravatar.cc/150?u=paul'
    },
    raised: 150000,
    goal: 1000000,
    contributors: 7,
    createdAt: '2026-01-20'
  }
];

let currentLang = localStorage.getItem('lang') || 'fr';
let currentTheme = localStorage.getItem('theme') || 'dark';

function addDaysISO(base, days) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}
function daysBetweenISO(iso) {
  const now = new Date();
  const d = new Date(iso);
  return Math.ceil((d - now) / (1000 * 60 * 60 * 24));
}
function fmt(n) {
  return Number(n).toLocaleString('fr-FR');
}

const translations = {
  fr: {
    investors: 'contributeurs',
    view_project: 'Voir le projet',
    support: 'Soutenir',
    days_remaining: 'jours restants',
    finished: 'Terminé'
  },
  en: {
    investors: 'contributors',
    view_project: 'View project',
    support: 'Support',
    days_remaining: 'days remaining',
    finished: 'Finished'
  }
};

function applyAllUpdates() {
  document.documentElement.setAttribute('data-theme', currentTheme);
  renderProjectPreviews();
}

/* ---------- RENDER PROJECTS (corrected) ---------- */
function renderProjectPreviews() {
  // accepte plusieurs sélecteurs pour être compatible avec ton HTML
  const wrap = document.querySelector('.projects-grid') || document.getElementById('projets') || document.getElementById('projects');
  if (!wrap) return;

  wrap.innerHTML = '';

  projects.forEach(p => {
    // safe deadline fallback (si tu n'as pas deadline, on calcule depuis createdAt)
    const base = p.deadline || addDaysISO(p.createdAt || new Date().toISOString(), 30);
    const days = (() => {
      try { return daysBetweenISO(base); } catch(e){ return 0; }
    })();

    const pct = Math.min(100, Math.round((Number(p.raised || 0) / Number(p.goal || 1)) * 100));
    const imgSrc = (Array.isArray(p.images) && p.images.length) ? (p.images[0] + '?auto=format&fit=crop&w=800&q=80') : 'https://via.placeholder.com/800x480?text=Projet';

    const card = document.createElement('div');
    card.className = 'glass-panel project-card';

    card.innerHTML = `
      <img
        src="${imgSrc}"
        class="card-img"
        alt="${(p.title && (p.title[currentLang] || p.title.fr || p.title.en)) || 'Projet'}"
        loading="lazy"
        onerror="this.onerror=null;this.src='https://via.placeholder.com/800x480?text=Projet';"
      >
      <div class="card-meta" style="display:flex;justify-content:space-between;margin-top:8px;">
        <span class="timer-badge">${days < 0 ? 'Terminé' : (days===0 ? 'Dernier jour' : days + ' jours restants')}</span>
        <span class="contributors-count">${p.contributors || 0} ${translations[currentLang].investors || 'contributeurs'}</span>
      </div>
      <h3>${(p.title && (p.title[currentLang] || p.title.fr || p.title.en)) || ''}</h3>
      <p style="opacity:0.8;">${(p.desc && (p.desc[currentLang] || p.desc.fr || p.desc.en)) || ''}</p>
      <div class="progress-container"><div class="progress-bar" data-width="${pct}" style="width:${pct}%;"></div></div>
      <div class="flex-between" style="font-size:0.85rem;margin-top:8px;">
        <span>${fmt(p.raised || 0)} / ${fmt(p.goal || 0)} FCFA</span>
        <b style="color:var(--primary);">${pct}%</b>
      </div>
      <div style="margin-top:10px; display:flex; gap:8px;">
        <button class="btn-main" onclick="viewProject('${p.id}')">${translations[currentLang].view_project || 'Voir le projet'}</button>
        <button class="glass-panel" onclick="quickSupport('${p.id}')">${translations[currentLang].support || 'Soutenir'}</button>
      </div>
    `;

    wrap.appendChild(card);
  });
}

function viewProject(id) {
  const session = localStorage.getItem('userSession');
  if (!session) {
    localStorage.setItem('redirectAfterLogin', `details-projet.html?id=${id}`);
    location.href = 'auth.html';
    return;
  }
  location.href = `details-projet.html?id=${id}`;
}

function quickSupport(id) {
  const session = localStorage.getItem('userSession');
  if (!session) {
    localStorage.setItem('redirectAfterLogin', `payment.html?project=${id}`);
    location.href = 'auth.html';
    return;
  }
  location.href = `payment.html?project=${id}`;
}

(function protectPages() {
  const publicPages = ['index.html', 'auth.html'];
  const page = location.pathname.split('/').pop() || 'index.html';
  const session = localStorage.getItem('userSession');

  if (!publicPages.includes(page) && !session) {
    localStorage.setItem('redirectAfterLogin', page + location.search);
    location.href = 'auth.html';
  }
})();

document.addEventListener('DOMContentLoaded', applyAllUpdates);

(function(){

  document.querySelectorAll('img[data-sources]').forEach(img=>{
    let sources;
    try{ sources = JSON.parse(img.getAttribute('data-sources')); } catch(e){ sources = [img.getAttribute('src')||'']; }
    let idx = 0;

    img.addEventListener('error', function tryNext(){
      if(idx >= sources.length) {
        const initials = (img.alt || 'LOGO').split(' ').map(w=>w[0]).slice(0,3).join('').toUpperCase();
        const bg = '#eee';
        const fg = '#222';
        const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='36'><rect width='100%' height='100%' fill='\( {bg}' rx='6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-weight='700' font-size='14' fill=' \){fg}'>${initials}</text></svg>`;
        img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
        img.removeEventListener('error', tryNext);
        return;
      }
      img.src = sources[idx++];
    });
    img.dispatchEvent(new Event('error'));
  });
})();

window.toggleTheme = () => {
    currentTheme = (currentTheme === 'dark') ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
};


window.toggleLang = () => {

    currentLang = (currentLang === 'fr') ? 'en' : 'fr';
  
    localStorage.setItem('lang', currentLang);
    
    applyLanguage(currentLang);
    
    if (typeof renderProjectPreviews === 'function') {
        renderProjectPreviews();
    }
};

function applyLanguage(lang) {
 
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        
        const source = window.texts || translations;
        
        if (source[lang] && source[lang][key]) {
            el.innerText = source[lang][key];
        }
    });

    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.innerText = lang.toUpperCase();
}


document.addEventListener('DOMContentLoaded', () => {

    applyLanguage(currentLang);

    applyAllUpdates();
});

(function(){
  document.querySelectorAll('img[data-sources]').forEach(img=>{
    let sources;
    try{ sources = JSON.parse(img.getAttribute('data-sources')); } catch(e){ sources = [img.getAttribute('src')||'']; }
    let idx = 0;
    img.addEventListener('error', function tryNext(){
      if(idx >= sources.length) {
        const initials = (img.alt || 'LOGO').split(' ').map(w=>w[0]).slice(0,3).join('').toUpperCase();
        const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='36'><rect width='100%' height='100%' fill='#eee' rx='6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-weight='700' font-size='14' fill='#222'>${initials}</text></svg>`;
        img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
        img.removeEventListener('error', tryNext);
        return;
      }
      img.src = sources[idx++];
    });
    img.dispatchEvent(new Event('error'));
  });
})();