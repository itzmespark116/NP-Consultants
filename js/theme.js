// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ----------------------- theme.js ---------------------------
// ------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    const root = document.documentElement;
    const toggle = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");

    if (!toggle || !icon) return;

    // Admin pages are one directory deeper
    const nav = document.querySelector("nav");
    const pathPrefix = nav?.id === "admin" ? "../" : "";

    function setTheme(dark, save = true) {

        root.classList.toggle("dark", dark);

        // Theme button icon
        icon.src = dark
            ? `${pathPrefix}icons/lightMode.svg`
            : `${pathPrefix}icons/darkMode.svg`;

        // Swap all theme-aware logos/images
        document.querySelectorAll(".theme-logo").forEach((img) => {

            const src = dark
                ? img.dataset.dark
                : img.dataset.light;

            if (src) {
                img.src = src;
            }

        });

        if (save) {
            localStorage.setItem(
                "theme",
                dark ? "dark" : "light"
            );
        }
    }

    // --------------------------------------------------------
    // Load saved theme
    // --------------------------------------------------------

    const saved = localStorage.getItem("theme");

    if (saved) {

        setTheme(saved === "dark", false);

    } else {

        setTheme(
            window.matchMedia("(prefers-color-scheme: dark)").matches,
            false
        );

    }

    // --------------------------------------------------------
    // Toggle theme
    // --------------------------------------------------------

    toggle.addEventListener("click", () => {

        setTheme(
            !root.classList.contains("dark")
        );

    });

});