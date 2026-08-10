// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ----------------- intro-anim-manage.js ---------------------
// ------------------------------------------------------------

(() => {

    function setupAnimationManager() {

        document.addEventListener("animationend", (event) => {

            const element = event.target;

            if (!(element instanceof HTMLElement)) {
                return;
            }

            // Only clean animations that actually belong
            // to the intro system.
            if (
                element.classList.contains("intro") ||
                element.closest(".intro")
            ) {
                element.style.removeProperty("animation");
                element.style.removeProperty("animation-name");
            }

        }, true);

    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            setupAnimationManager,
            { once: true }
        );
    } else {
        setupAnimationManager();
    }

})();
