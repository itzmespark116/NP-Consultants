// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ----------------- admin-nav-anim.js -------------------------
// ------------------------------------------------------------

(function () {
    function animationEndHandler(event) {
        var element = event.target;

        if (!element || !element.style) return;

        if (
            event.animationName === "admin-nav-drop-in" ||
            event.animationName === "admin-link-fade-in"
        ) {
            element.style.animation = "none";

            requestAnimationFrame(function () {
                element.style.removeProperty("animation");
            });
        }
    }

    document.addEventListener("animationend", animationEndHandler, true);
    document.addEventListener("webkitAnimationEnd", animationEndHandler, true);
})();
