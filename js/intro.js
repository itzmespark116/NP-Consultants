// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ----------------------- intro.js ---------------------------
// ------------------------------------------------------------

(function () {

    function startIntro() {

        document.body.classList.add("intro-active");

        const intro = document.querySelector(".intro");

        setTimeout(function () {

            document.body.classList.remove("intro-active");

            if (intro) {
                intro.remove();
            }

        }, 1500);
    }

    // Works whether the script loads before or after DOMContentLoaded
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startIntro, {
            once: true
        });
    } else {
        startIntro();
    }

})();
