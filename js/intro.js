// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ----------------------- intro.js ---------------------------
// ------------------------------------------------------------

(() => {

    function startIntro() {

        const body = document.body;
        const intro = document.querySelector(".intro");

        // No intro element = nothing to do
        if (!intro) {
            body.classList.remove("intro-active");
            return;
        }

        // Start intro
        body.classList.add("intro-active");

        // Keep timing independent from browser animation events
        window.setTimeout(() => {

            body.classList.remove("intro-active");

            // Remove intro safely
            if (intro && intro.parentNode) {
                intro.remove();
            }

        }, 1500);
    }

    // Run as soon as DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startIntro, {
            once: true
        });
    } else {
        startIntro();
    }

})();

