// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ----------------- intro-anim-manage.js ---------------------
// ------------------------------------------------------------

window.addEventListener("load", () => {
    document.addEventListener("animationend", (e) => {
        e.target.style.removeProperty("animation");
        e.target.style.removeProperty("animation-name");
    }, true);
});