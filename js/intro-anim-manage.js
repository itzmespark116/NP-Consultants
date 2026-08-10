// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ----------------- intro-anim-manage.js ---------------------
// ------------------------------------------------------------

(function () {

    function animationEndHandler(event) {

        var element = event.target;

        if (!element || !element.style) {
            return;
        }

        element.style.removeProperty("animation");
        element.style.removeProperty("animation-name");
    }


    // Standard animation event
    document.addEventListener(
        "animationend",
        animationEndHandler,
        true
    );


    // Older WebKit browsers
    document.addEventListener(
        "webkitAnimationEnd",
        animationEndHandler,
        true
    );

})();