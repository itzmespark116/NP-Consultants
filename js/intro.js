// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ----------------------- intro.js ---------------------------
// ------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    const intro = document.querySelector(".body-intro");

    if (!intro) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Skip intro completely
    if (reducedMotion) {

        document.body.classList.remove("intro-active");

        intro.remove();

        return;
    }

    // Normal intro
    document.body.classList.add("intro-active");

    setTimeout(() => {

        document.body.classList.remove("intro-active");

        if (intro && intro.parentNode) {
            intro.remove();
        }

    }, 1500);

});