// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ----------------------- intro.js ---------------------------
// ------------------------------------------------------------

(function () {

    function startIntro() {

        var body = document.body;
        var intro = document.querySelector(".intro");

        // Safety check
        if (!body) {
            return;
        }

        // Activate intro
        body.classList.add("intro-active");

        // Remove intro after 1.5 seconds
        setTimeout(function () {

            body.classList.remove("intro-active");

            // Remove intro safely
            if (intro && intro.parentNode) {
                intro.parentNode.removeChild(intro);
            }

        }, 1500);
    }


    // --------------------------------------------------------
    // Start as soon as the DOM is ready
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
