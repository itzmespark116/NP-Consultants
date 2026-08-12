// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ------------------- contact-banner.js ----------------------
// ------------------------------------------------------------

const contactBanner = document.querySelector('.contact-banner');

console.log(contactBanner);

window.addEventListener('scroll', () => {

    contactBanner.classList.toggle(
        'scrolled',
        window.scrollY > 40
    );
});