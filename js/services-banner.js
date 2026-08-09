// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ------------------ services-banner.js ----------------------
// ------------------------------------------------------------

const servicesBanner = document.querySelector('.services-banner');

// console.log(servicesBanner);

window.addEventListener('scroll', () => {

    servicesBanner.classList.toggle(
        'scrolled',
        window.scrollY > 40
    );
});