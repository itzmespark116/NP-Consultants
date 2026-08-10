// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ----------------------- intro.js ---------------------------
// ------------------------------------------------------------

(function () {

    function startIntro() {

        const body = document.body;
        const intro = document.querySelector(".intro");

        // If intro doesn't exist, do nothing
        if (!intro) {
            body.classList.remove("intro-active");
            return;
        }

        body.classList.add("intro-active");

        setTimeout(function () {

            body.classList.remove("intro-active");

            if (intro && intro.parentNode) {
                intro.parentNode.removeChild(intro);
            }

        }, 1500);

    }

    // Run as soon as the DOM is available
    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            startIntro,
            { once: true }
        );

    } else {

        startIntro();

    }

})();
