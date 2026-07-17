document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('[data-aos]').forEach((el) => {
      el.classList.add('aos-animate');
    });
  }, 4000);

  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80
    });
  }

  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');
  const scrollContainer = document.getElementById('scroll-container');
  const scrollLeftBtn = document.getElementById('scroll-left');
  const scrollRightBtn = document.getElementById('scroll-right');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const themeToggle = document.getElementById('themeToggle');
  const langToggle = document.getElementById('langToggle');
  const newsletterForm = document.querySelector('.newsletter form');
  const footerYear = document.getElementById('footerYear');

  if (footerYear) {
    footerYear.textContent = '© ' + new Date().getFullYear();
  }

  const autoScrollState = {
    pointerDown: false,
    startX: 0,
    startScrollLeft: 0,
    lastX: 0,
    direction: 1,
    isPaused: false,
    pauseTimeout: null,
    cardStep: 300,
    speed: 0.6,
    resumeDelay: 2000
  };

  if (scrollContainer) {
    scrollContainer.style.touchAction = 'pan-y';
    scrollContainer.classList.add('auto-scrolling');
  }

  const translations = {
    fr: {
      "nav.about": "À propos",
      "nav.skills": "Compétences",
      "nav.projects": "Projets",
      "nav.contact": "Contact",
      "hero.titleLine1": "Développeur Web.",
      "hero.titleLine2": "Créatif. Précis. Moderne.",
      "hero.text": "Salut, moi c’est <strong>Le JUSTE</strong>. Je suis développeur web, spécialisé dans les applications, les sites web, les bots et le graphisme. J’aime construire des interfaces modernes, rapides, responsives et élégantes. Je réalise aussi des créations visuelles comme des logos, flyers, affiches et identités graphiques, avec une approche propre, cohérente et professionnelle.",
      "hero.badge1": "Front-end Developer",
      "hero.badge2": "UI/UX Clean",
      "hero.badge3": "Applications",
      "hero.badge4": "Bots & Automatisation",
      "hero.badge5": "Graphisme & Branding",
      "hero.ctaProjects": "Voir mes projets →",
      "hero.ctaContact": "Me contacter",
      "side.title": "Le JUSTE",
      "side.text": "Développeur web et designer graphique, orienté interfaces modernes, solutions utiles et identité visuelle soignée.",
      "side.stat1": "Projets présentés",
      "side.stat2": "Présence en ligne",
      "side.stat3": "UI Soignée & moderne",
      "side.stat4": "Design Logos & visuels",
      "about.title": "À propos",
      "about.subtitle": "Une présentation claire, crédible et élégante de mon profil et de ma manière de travailler.",
      "about.text": "Salut, moi c’est <strong>Le JUSTE</strong>. Je suis développeur web, spécialisé dans les applications, les sites web et les bots. J’aime construire des interfaces modernes, rapides, responsives et agréables à utiliser. Je travaille aussi dans le graphisme, notamment la création de logos, flyers, affiches et visuels de communication.<br><br>Mon objectif est simple : créer des expériences web et visuelles qui donnent immédiatement une impression de sérieux, de qualité et de maîtrise technique. J’accorde beaucoup d’importance au design, à la cohérence, à la performance et à une structure propre pour faciliter l’évolution future du projet.",
      "about.xp1.title": "Développement web",
      "about.xp1.text": "Création de sites vitrines, portfolios, plateformes et interfaces dynamiques.",
      "about.xp2.title": "Développement d'applications",
      "about.xp2.text": "Conception d’interfaces, logique applicative, organisation du code et modularité.",
      "about.xp3.title": "Bots & automatisation",
      "about.xp3.text": "Bots d’interaction, outils de gestion et solutions pratiques pour gagner du temps.",
      "about.xp4.title": "Graphisme & identité visuelle",
      "about.xp4.text": "Création de logos, flyers, affiches, bannières et supports visuels cohérents.",
      "skills.title": "Compétences",
      "skills.subtitle": "Un aperçu visuel de mes domaines de compétence principaux.",
      "skills.web.title": "Développement web",
      "skills.web.text": "HTML, CSS, JavaScript, design responsive, animations et intégration moderne.",
      "skills.app.title": "Développement d'applications",
      "skills.app.text": "Construction d’interfaces, logique applicative, organisation du code et modularité.",
      "skills.bot.title": "Bots",
      "skills.bot.text": "Bots d’interaction, automatisation et outils de gestion pour différents usages.",
      "skills.design.title": "Graphisme & design",
      "skills.design.text": "Création de logos, flyers, affiches, visuels de marque et contenus promotionnels.",
      "projects.title": "Mes Projets",
      "projects.subtitle": "Une galerie de projets présentée de manière moderne, avec navigation fluide et auto-défilement.",
      "projects.hint": "Défile automatiquement. Flèches du clavier pour changer la direction. Swipe ou glisse à la souris pour naviguer.",
      "projects.p1.title": "Site de vente de serveurs",
      "projects.p1.desc": "Un site de vente de serveur Pterodactyl, pensé pour présenter une offre claire et professionnelle.",
      "projects.p2.title": "Collecte de fonds pour start-ups",
      "projects.p2.desc": "Projet de crowdfunding et d’investissement participatif au Cameroun, conçu pour connecter projets et contributeurs.",
      "projects.p3.title": "Wemove",
      "projects.p3.desc": "<strong>Solutions en Mouvement // We Move Together</strong> Wemove accompagne les jeunes start-ups, marques et entreprises dans leur croissance grâce à des solutions créatives, innovantes et performantes — de la stratégie au produit fini.",
      "projects.p4.title": "Horloge Numérique",
      "projects.p4.desc": "Un site d'horloge numérique avec quelques pays inclus, au style simple et efficace.",
      "projects.p5.title": "Site de E-Bookshop",
      "projects.p5.desc": "Un site de vente de fourniture scolaire en ligne, conçu pour une présentation propre et pratique.",
      "projects.p6.title": "Site de Vote",
      "projects.p6.desc": "Un site de vote pour des petits projets entre amis, avec une logique simple et accessible.",
      "projects.p7.title": "Calculatrice Scientifique",
      "projects.p7.desc": "Calculatrice scientifique avec différentes fonctions intégrées, propre et réactive.",
      "projects.p8.title": "Site de Shopping",
      "projects.p8.desc": "Plateforme de vente de vêtements et accessoires associés, pensée pour l’expérience utilisateur.",
      "projects.p9.title": "Biographie étudiée de quelques hautes personnalités",
      "projects.p9.desc": "Notamment au Cameroun, avec une mise en page adaptée à la lecture et à la présentation.",
      "projects.p10.title": "Tictactoe Game",
      "projects.p10.desc": "Jeu amical, léger et divertissant, avec une interface simple et intuitive.",
      "projects.p11.title": "Chat Bot \"mini IA\"",
      "projects.p11.desc": "Un bot d'interaction conçu pour donner une impression d’assistance rapide et intelligente.",
      "projects.p12.title": "Bot Whatsapp Multi-Device",
      "projects.p12.desc": "Un bot de gestion WhatsApp pensé pour la réduction de mouvement et l’automatisation.",
      "projects.p13.title": "Création de logos, flyers et affiches",
      "projects.p13.desc": "Travaux de graphisme et d’identité visuelle pour accompagner les projets web et les marques.",
      "contact.title": "Contact",
      "contact.subtitle": "Mes informations principales et mes canaux de contact.",
      "contact.cardTitle": "Mes informations",
      "contact.email": "Email : <a href=\"mailto:kingnaljks@gmail.com\" class=\"blue-link\">kingnaljks@gmail.com</a>",
      "contact.github": "GitHub : <a href=\"https://github.com/Lord-ShAdOw-24\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"blue-link\">github.com/Lord-ShAdOw-24</a>",
      "contact.whatsapp": "Rejoins ma chaîne WhatsApp ici !",
      "contact.newsletterTitle": "Soyez informé de mes nouveaux projets et ne ratez rien :",
      "contact.newsletterText": "FOLLOW ME",
      "contact.placeholder": "Votre email ici...",
      "contact.button": "S'inscrire",
      "contact.bottomText": "Tu peux aussi suivre mes actus sur WhatsApp, Discord et GitHub.",
      "footer.brandTitle": "Le JUSTE",
      "footer.brandText": "Développeur web et designer graphique, orienté interfaces modernes et solutions utiles.",
      "footer.copy": "By NALJ. Tous droits réservés."
    },
    en: {
      "nav.about": "About",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.contact": "Contact",
      "hero.titleLine1": "Web Developer.",
      "hero.titleLine2": "Creative. Precise. Modern.",
      "hero.text": "Hi, I'm <strong>Le JUSTE</strong>. I'm a web developer specializing in applications, websites, bots, and graphic design. I love building modern, fast, responsive, and elegant interfaces. I also create visual assets like logos, flyers, posters, and graphic identities with a clean, coherent, and professional approach.",
      "hero.badge1": "Front-end Developer",
      "hero.badge2": "Clean UI/UX",
      "hero.badge3": "Applications",
      "hero.badge4": "Bots & Automation",
      "hero.badge5": "Graphics & Branding",
      "hero.ctaProjects": "View my projects →",
      "hero.ctaContact": "Contact me",
      "side.title": "Le JUSTE",
      "side.text": "Web developer and graphic designer, focused on modern interfaces, useful solutions, and neat visual identity.",
      "side.stat1": "Projects presented",
      "side.stat2": "Online presence",
      "side.stat3": "Neat & modern UI",
      "side.stat4": "Logos & visuals design",
      "about.title": "About",
      "about.subtitle": "A clear, credible, and elegant presentation of my profile and way of working.",
      "about.text": "Hi, I'm <strong>Le JUSTE</strong>. I'm a web developer specializing in applications, websites, and bots. I love building modern, fast, responsive, and enjoyable interfaces to use. I also work in graphic design, including creating logos, flyers, posters, and communication visuals.<br><br>My goal is simple: to create web and visual experiences that immediately give an impression of seriousness, quality, and technical mastery. I attach great importance to design, consistency, performance, and a clean structure to facilitate the future evolution of the project.",
      "about.xp1.title": "Web development",
      "about.xp1.text": "Creation of showcase sites, portfolios, platforms, and dynamic interfaces.",
      "about.xp2.title": "Application development",
      "about.xp2.text": "Interface design, application logic, code organization, and modularity.",
      "about.xp3.title": "Bots & automation",
      "about.xp3.text": "Interaction bots, management tools, and practical solutions to save time.",
      "about.xp4.title": "Graphics & visual identity",
      "about.xp4.text": "Creation of consistent logos, flyers, posters, banners, and visual media.",
      "skills.title": "Skills",
      "skills.subtitle": "A visual overview of my main areas of expertise.",
      "skills.web.title": "Web development",
      "skills.web.text": "HTML, CSS, JavaScript, responsive design, animations, and modern integration.",
      "skills.app.title": "Application development",
      "skills.app.text": "Building interfaces, application logic, code organization, and modularity.",
      "skills.bot.title": "Bots",
      "skills.bot.text": "Interaction bots, automation, and management tools for various uses.",
      "skills.design.title": "Graphics & design",
      "skills.design.text": "Creation of logos, flyers, posters, brand visuals, and promotional content.",
      "projects.title": "My Projects",
      "projects.subtitle": "A gallery of projects presented in a modern way, with fluid navigation and auto-scrolling.",
      "projects.hint": "Scrolls automatically. Keyboard arrows to change direction. Swipe or drag with the mouse to navigate.",
      "projects.p1.title": "Server Sales Website",
      "projects.p1.desc": "A Pterodactyl server sales website, designed to present a clear and professional offer.",
      "projects.p2.title": "Crowdfunding for Startups",
      "projects.p2.desc": "Crowdfunding and participatory investment project in Cameroon, designed to connect projects and contributors.",
      "projects.p3.title": "Wemove",
      "projects.p3.desc": "<strong>Solutions in Motion // We Move Together</strong> Wemove accompanies young start-ups, brands, and companies in their growth thanks to creative, innovative, and high-performance solutions — from strategy to finished product.",
      "projects.p4.title": "Digital Clock",
      "projects.p4.desc": "A digital clock website with a few countries included, in a simple and efficient style.",
      "projects.p5.title": "E-Bookshop Website",
      "projects.p5.desc": "An online school supply sales website, designed for a clean and practical presentation.",
      "projects.p6.title": "Voting Website",
      "projects.p6.desc": "A voting website for small projects between friends, with a simple and accessible logic.",
      "projects.p7.title": "Scientific Calculator",
      "projects.p7.desc": "Scientific calculator with various integrated functions, clean and responsive.",
      "projects.p8.title": "Shopping Website",
      "projects.p8.desc": "Platform for selling clothes and associated accessories, designed for user experience.",
      "projects.p9.title": "Studied Biography of High Personalities",
      "projects.p9.desc": "Notably in Cameroon, with a layout adapted for reading and presentation.",
      "projects.p10.title": "TicTacToe Game",
      "projects.p10.desc": "Friendly, light, and entertaining game, with a simple and intuitive interface.",
      "projects.p11.title": "Chat Bot \"mini IA\"",
      "projects.p11.desc": "An interaction bot designed to give an impression of quick and intelligent assistance.",
      "projects.p12.title": "Multi-Device WhatsApp Bot",
      "projects.p12.desc": "A WhatsApp management bot designed for motion reduction and automation.",
      "projects.p13.title": "Creation of Logos, Flyers, and Posters",
      "projects.p13.desc": "Graphic design and visual identity work to accompany web projects and brands.",
      "contact.title": "Contact",
      "contact.subtitle": "My main information and contact channels.",
      "contact.cardTitle": "My information",
      "contact.email": "Email: <a href=\"mailto:kingnaljks@gmail.com\" class=\"blue-link\">kingnaljks@gmail.com</a>",
      "contact.github": "GitHub: <a href=\"https://github.com/Lord-ShAdOw-24\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"blue-link\">github.com/Lord-ShAdOw-24</a>",
      "contact.whatsapp": "Join my WhatsApp channel here!",
      "contact.newsletterTitle": "Be informed of my new projects and don't miss anything:",
      "contact.newsletterText": "FOLLOW ME",
      "contact.placeholder": "Your email here...",
      "contact.button": "Subscribe",
      "contact.bottomText": "You can also follow my updates on WhatsApp, Discord, and GitHub.",
      "footer.brandTitle": "Le JUSTE",
      "footer.brandText": "Web developer and graphic designer, oriented towards modern interfaces and useful solutions.",
      "footer.copy": "By NALJ. All rights reserved."
    }
  };

  function applyTranslations(lang) {
    const langData = translations[lang];
    if (!langData) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (langData[key]) el.textContent = langData[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (langData[key]) el.innerHTML = langData[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (langData[key]) el.setAttribute('placeholder', langData[key]);
    });

    if (typeof AOS !== 'undefined') AOS.refresh();
  }

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const currentLang = document.documentElement.getAttribute('data-lang') || 'fr';
      const nextLang = currentLang === 'fr' ? 'en' : 'fr';
      document.documentElement.setAttribute('data-lang', nextLang);
      document.documentElement.setAttribute('lang', nextLang);
      langToggle.textContent = nextLang === 'fr' ? 'EN' : 'FR';
      applyTranslations(nextLang);
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', nextTheme);
      themeToggle.textContent = nextTheme === 'dark' ? '☾' : '☀';
    });
  }

  function updateCardStep() {
    if (!scrollContainer) return;
    const firstCard = scrollContainer.querySelector('.project-card');
    if (!firstCard) return;
    const containerStyle = getComputedStyle(scrollContainer);
    const gap = parseFloat(containerStyle.gap || containerStyle.columnGap || '16') || 16;
    autoScrollState.cardStep = firstCard.getBoundingClientRect().width + gap;
  }

  function pauseAutoScroll() {
    autoScrollState.isPaused = true;
    clearTimeout(autoScrollState.pauseTimeout);
  }

  function scheduleResume() {
    clearTimeout(autoScrollState.pauseTimeout);
    autoScrollState.pauseTimeout = setTimeout(() => {
      autoScrollState.isPaused = false;
    }, autoScrollState.resumeDelay);
  }

  function handleDirectionClick(dir) {
    autoScrollState.direction = dir;
    pauseAutoScroll();
    if (scrollContainer) {
      scrollContainer.scrollBy({ left: dir * autoScrollState.cardStep, behavior: 'smooth' });
    }
    scheduleResume();
  }

  function autoScrollLoop() {
    if (scrollContainer && !autoScrollState.pointerDown && !autoScrollState.isPaused) {
      scrollContainer.scrollLeft += autoScrollState.direction * autoScrollState.speed;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

      if (scrollContainer.scrollLeft <= 0) {
        scrollContainer.scrollLeft = 0;
        autoScrollState.direction = 1;
      } else if (scrollContainer.scrollLeft >= maxScroll - 1) {
        scrollContainer.scrollLeft = maxScroll;
        autoScrollState.direction = -1;
      }
    }
    requestAnimationFrame(autoScrollLoop);
  }

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('open'));
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') navMenu.classList.remove('open');
    });
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (scrollLeftBtn && scrollContainer) {
    scrollLeftBtn.addEventListener('click', () => handleDirectionClick(-1));
  }

  if (scrollRightBtn && scrollContainer) {
    scrollRightBtn.addEventListener('click', () => handleDirectionClick(1));
  }

  document.addEventListener('click', (e) => {
    if (navMenu && !e.target.closest('.nav')) {
      navMenu.classList.remove('open');
    }
  });

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentLang = document.documentElement.getAttribute('data-lang') || 'fr';
      const emailInput = newsletterForm.querySelector('.email-input');
      const email = emailInput ? emailInput.value.trim() : '';
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValidEmail) {
        alert(currentLang === 'fr' ? 'Merci d\'entrer une adresse email valide.' : 'Please enter a valid email address.');
        return;
      }

      alert(currentLang === 'fr' ? 'Merci pour ton inscription !' : 'Thank you for subscribing!');
      newsletterForm.reset();
    });
  }

  if (scrollContainer) {
    scrollContainer.addEventListener('pointerdown', (e) => {
      autoScrollState.pointerDown = true;
      autoScrollState.startX = e.clientX;
      autoScrollState.lastX = e.clientX;
      autoScrollState.startScrollLeft = scrollContainer.scrollLeft;
      pauseAutoScroll();
      scrollContainer.classList.add('dragging');
      scrollContainer.setPointerCapture(e.pointerId);
    });

    scrollContainer.addEventListener('pointermove', (e) => {
      if (!autoScrollState.pointerDown) return;
      const delta = e.clientX - autoScrollState.startX;
      scrollContainer.scrollLeft = autoScrollState.startScrollLeft - delta;
      autoScrollState.lastX = e.clientX;
    });

    const endSwipe = (e) => {
      if (!autoScrollState.pointerDown) return;
      const delta = autoScrollState.lastX - autoScrollState.startX;
      if (Math.abs(delta) > 15) {
        autoScrollState.direction = delta > 0 ? -1 : 1;
      }
      autoScrollState.pointerDown = false;
      scrollContainer.classList.remove('dragging');
      if (scrollContainer.hasPointerCapture(e.pointerId)) {
        scrollContainer.releasePointerCapture(e.pointerId);
      }
      scheduleResume();
    };

    scrollContainer.addEventListener('pointerup', endSwipe);
    scrollContainer.addEventListener('pointercancel', endSwipe);
    scrollContainer.addEventListener('pointerleave', endSwipe);
  }

  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (e.key === 'ArrowLeft') handleDirectionClick(-1);
    if (e.key === 'ArrowRight') handleDirectionClick(1);
  });

  window.addEventListener('resize', updateCardStep);
  updateCardStep();
  requestAnimationFrame(autoScrollLoop);
});
