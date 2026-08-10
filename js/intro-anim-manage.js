// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ----------------- intro-anim-manage.js ---------------------
// ------------------------------------------------------------

(function () {

    function setupAnimationManager() {

        document.addEventListener("animationend", function (e) {

            const element = e.target;

            if (!element || !element.style) {
                return;
            }

            element.style.removeProperty("animation");
            element.style.removeProperty("animation-name");

        }, true);

    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupAnimationManager, {
            once: true
        });
    } else {
        setupAnimationManager();
    }

})();
