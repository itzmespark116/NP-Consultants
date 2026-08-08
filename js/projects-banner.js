// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ------------------ projects-banner.js ----------------------
// ------------------------------------------------------------

const projectsBanner = document.querySelector('.projects-banner');

console.log(projectsBanner);

window.addEventListener('scroll', () => {

    projectsBanner.classList.toggle(
        'scrolled',
        window.scrollY > 40
    );
});