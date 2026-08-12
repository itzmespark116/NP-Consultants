// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ------------------------ nav.js ----------------------------
// ------------------------------------------------------------

const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });  