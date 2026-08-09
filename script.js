// ==========================================================
// GIVE A SMILE — script.js
// Toutes les interactions du site sont regroupées ici,
// section par section, avec des commentaires en français.
// ==========================================================

// ---------- 1. Menu mobile (burger) ----------
const burger = document.getElementById('burger');
const mainNav = document.getElementById('main-nav');

burger.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

// Ferme le menu mobile quand on clique sur un lien
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});


// ---------- 2. Année automatique dans le footer ----------
document.getElementById('year').textContent = new Date().getFullYear();


// ---------- 3. Galerie : ouverture en grand (lightbox) ----------
const galleryImages = document.querySelectorAll('#gallery-grid img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.dataset.full || img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  // ferme seulement si on clique sur le fond, pas sur l'image
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});


// ---------- 4. Boutons de montant pour le don ----------

// 👉 REMPLACE chaque lien ci-dessous par TES vrais liens Wave
// (générés dans l'app Wave Business, un lien différent par montant).
// Le lien "autre" sert pour l'option "Autre montant" (le donateur
// choisit lui-même la somme dans l'app Wave).
const WAVE_LINKS = {
  "5000":  "https://pay.wave.com/m/M_ci_P6ItIAj4alRu/c/ci?amount=5000",  // lien pour 5 000 FCFA
  "10000": "https://pay.wave.com/m/M_ci_P6ItIAj4alRu/c/ci?amount=10000", // lien pour 10 000 FCFA
  "25000": "https://pay.wave.com/m/M_ci_P6ItIAj4alRu/c/ci?amount=25000", // lien pour 25 000 FCFA
  "autre": "https://pay.wave.com/m/M_ci_P6ItIAj4alRu/c/ci/", // lien libre, sans montant fixé
};

const amountButtons = document.querySelectorAll('.amount-btn');
const donateBtn = document.getElementById('donate-btn');
let selectedAmount = null;

amountButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    amountButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedAmount = btn.dataset.amount;

    // Met à jour le texte du bouton principal si un montant est choisi
    if (selectedAmount && selectedAmount !== 'autre') {
      donateBtn.textContent = `Faire un don de ${btn.textContent}`;
    } else {
      donateBtn.textContent = 'Faire un don maintenant';
    }
  });
});

// Ouvre le lien de paiement Wave correspondant au montant choisi.
// Si aucun montant n'a été cliqué, on utilise le lien "autre" par défaut.
donateBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const link = WAVE_LINKS[selectedAmount] || WAVE_LINKS["autre"];

    console.log("Lien :", link);

    window.open(link, "_blank");
});

// ---------- 5. Formulaire de contact ----------
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // NOTE : pour un vrai envoi d'email, connecte ce formulaire à un service
  // comme Formspree, EmailJS, ou un backend (voir explications dans le README).
  formFeedback.textContent = "Merci ! Votre message a bien été noté (branchez un service d'envoi réel pour le recevoir par email).";
  contactForm.reset();
});


// ---------- 6. Animation d'apparition au scroll ----------
// On ajoute la classe "reveal" à certains blocs, puis on les rend
// visibles ("visible") quand ils entrent dans l'écran.
const revealTargets = document.querySelectorAll(
  '.card, .mission-media, .mission-text, .impact-item, .gallery-grid img, .temoignage-box'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));
