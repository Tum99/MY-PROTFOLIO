const directoryData = [
  {
    title: 'PROJECTS',
    sub: 'These are the projects i have been working on',
    color: '#531E3D',
    items: [
      {
        featureTitle: 'CAFFEINE & CHAOS',
        image: '/static/images/caffeine-chaos-logo.png',
        blurb: 'Caffeine & Chaos is a dynamic web application and digital marketplace designed to bridge the gap between local coffee farmers and buyers across Kenya. The platform empowers growers by providing them with custom digital storefronts and dedicated farm profiles where they can showcase their harvest details—such as origin, altitude, and quality certifications—to build trust and transparency with the market. Beyond the marketplace, the platform also features a fully integrated cafe experience, complete with a diverse menu of expertly brewed coffee and a vibrant community space that brings coffee enthusiasts and industry professionals together. With robust buyer and grower dashboards, a dynamic messaging system, and real-time transaction tracking, the platform streamlines the entire supply chain from farm to cup.',
        meta: [
          ['Backend', 'Python & Flask'],
          ['Database & ORM', 'PostgreSQL & SQLAlchemy'],
          ['Frontend', 'HTML5, CSS3, and JavaScript'],
          ['Deployment', 'Render (Sandbox hosting)']
        ]
      },
      {
        featureTitle: 'TASK MANAGEMENT PLATFORM',
        image: '',
        blurb: 'An efficient tracking engine complete with complex subtask workflows and an AI-driven automated voice transcription system utilizing generative structuring modules.',
        meta: [
          ['Backend', 'Flask Application Core'],
          ['Architecture', 'Structured JSON Processing Pipeline'],
          ['Frontend', 'Interactive Action State Matrices']
        ]
      }
    ]
  },
  {
    title: 'WORK',
    sub: 'Professional experience and structural roles',
    color: '#531E3D',
    items: [
      {
        featureTitle: 'FULL-STACK SOFTWARE DEVELOPER',
        image: '',
        blurb: 'Building highly resilient web ecosystems, focusing on database normalization paradigms, end-to-end API configuration architectures, and custom user interface applications.',
        meta: [
          ['Focus Area', 'E-commerce Architecture & Web Deployment Optimization'],
          ['Platforms', 'Custom Flask Implementations & Dynamic Integration Frameworks']
        ]
      }
    ]
  },

  {
    title: 'ABOUT',
    sub: 'Personal narrative and developer profile',
    color: '#531E3D',
    items: [
      {
        featureTitle: 'FAITH TUM',
        image: '',
        blurb: 'A dedicated full-stack developer focused on engineering functional digital systems that solve localized tracking, community-building, and transaction workflows.',
        meta: [
          ['Theme Preferences', 'Minimalist aesthetics utilizing structural slate, charcoal, and dark accents']
        ]
      }
    ]
  },
  {
    title: 'BLOG',
    sub: 'Written ideas on architecture, coding, and workflow design',
    color: '#531E3D',
    items: [
      {
        featureTitle: 'DESIGNING COMPACT MARGIN SYLVAN DESIGN BASES',
        image: '',
        blurb: 'Exploratory structural analysis covering common dashboard layout traps, dealing with unaligned flexbox dot vectors within list structures, and optimizing line alignments safely.',
        meta: [
          ['Published', 'July 2026'],
          ['Reading Time', '4 mins']
        ]
      }
    ]
  }
];

const wheel = document.getElementById('wheel');
const n = directoryData.length;

let currentCategory = null;
let currentItemIndex = 0;
let lastFocused = null;

directoryData.forEach((section, i) => {
  const angle = (360 / n) * i;
  const item = document.createElement('div');
  item.className = 'item';
  item.style.setProperty('--a', angle + 'deg');

  const btn = document.createElement('button');
  btn.className = 'item-btn';
  
  // Explicitly link layout angles down to the animated node
  btn.style.setProperty('--a', angle + 'deg');
  btn.style.setProperty('--base-rot', `-${angle}deg`); // Keeps text upright (0 degrees)

  btn.setAttribute('aria-label', `Explore the ${section.title} section`);
  btn.innerHTML = `
    <div class="art" style="--card--color:${section.color}">
      <span class="letter">${section.title.charAt(0)}</span>
    </div>
    <div class="caption">
      <span class="title">${section.title}</span>
    </div>
  `;
  btn.addEventListener('click', () => openDetail(section));
  item.appendChild(btn);
  wheel.appendChild(item);
});

const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function openDetail(section) {
  lastFocused = document.activeElement;
  currentCategory = section;
  currentItemIndex = 0;
  
  document.getElementById('dTitle').textContent = section.title;
  document.getElementById('dSub').textContent = section.sub;
  document.getElementById('panelTop').style.setProperty('--hue', section.hue + 'deg');

  renderCarouselItem();

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

function renderCarouselItem() {
  if (!currentCategory || !currentCategory.items.length) return;
  
  const currentItem = currentCategory.items[currentItemIndex];
  const totalItems = currentCategory.items.length;

  document.getElementById('itemCounter').textContent = `${currentItemIndex + 1}/${totalItems}`;
  document.getElementById('dFeatureTitle').textContent = currentItem.featureTitle;
  document.getElementById('dBlurb').textContent = currentItem.blurb;

  const imgEl = document.getElementById('dFeatureImage');
  const fallbackEl = document.getElementById('dFallbackGraphic');

  if (currentItem.image && currentItem.image.trim() !== "") {
    imgEl.src = currentItem.image;
    imgEl.style.display = 'block';
    fallbackEl.style.display = 'none';
  } else {
    imgEl.src = '';
    imgEl.style.display = 'none';
    fallbackEl.style.display = 'flex';
  }

  const metaContainer = document.getElementById('dMetadataStack');
  metaContainer.innerHTML = '';
  
  if (currentItem.meta && currentItem.meta.length > 0) {
    const sectionHeading = document.createElement('h4');
    sectionHeading.className = 'meta-block-heading';
    sectionHeading.textContent = currentCategory.title === 'PROJECTS' ? 'TECH STACK' : 'DETAILS';
    metaContainer.appendChild(sectionHeading);

    currentItem.meta.forEach(([key, val]) => {
      const metaRow = document.createElement('div');
      metaRow.className = 'meta-row-item';
      metaRow.innerHTML = `<strong>${key}:</strong> <span>${val}</span>`;
      metaContainer.appendChild(metaRow);
    });
  }
}

prevBtn.addEventListener('click', () => {
  if (!currentCategory) return;
  currentItemIndex = (currentItemIndex - 1 + currentCategory.items.length) % currentCategory.items.length;
  renderCarouselItem();
});

nextBtn.addEventListener('click', () => {
  if (!currentCategory) return;
  currentItemIndex = (currentItemIndex + 1) % currentCategory.items.length;
  renderCarouselItem();
});

function closeDetail() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

closeBtn.addEventListener('click', closeDetail);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeDetail(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('open')) closeDetail();
});