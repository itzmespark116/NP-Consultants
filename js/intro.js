// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ----------------------- intro.js ---------------------------
// ------------------------------------------------------------

(function () {

    function startIntro() {

        var body = document.body;
        var intro = document.querySelector(".body-intro");

        if (!body || !intro) {
            return;
        }

        // Check user's reduced-motion preference
        var reducedMotion = false;

        if (window.matchMedia) {
            reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;
        }

        // ----------------------------------------------------
        // Reduced motion → skip intro completely
        // ----------------------------------------------------

        if (reducedMotion) {

            body.classList.remove("intro-active");

            intro.style.display = "none";

            if (intro.parentNode) {
                intro.parentNode.removeChild(intro);
            }

            return;
        }


        // ----------------------------------------------------
        // Normal intro
        // ----------------------------------------------------

        body.classList.add("intro-active");


        // ----------------------------------------------------
        // Remove intro after 1.5 seconds
        // ----------------------------------------------------

        window.setTimeout(function () {

            body.classList.remove("intro-active");

            if (intro && intro.parentNode) {
                intro.parentNode.removeChild(intro);
            }

        }, 1500);

    }


    // --------------------------------------------------------
    // Start when DOM is ready
    // --------------------------------------------------------

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            startIntro,
            false
        );

    } else {

        startIntro();

    }

})();