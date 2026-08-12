// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ----------------------- theme.js ----------------------------
// ------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const toggle = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");
    if (!toggle || !icon) return;
    const nav = document.querySelector("nav");
    const pathPrefix = (nav?.id === "admin" || nav?.id === "active") ? "../" : "";
    function updateLogos(dark) {
        document.querySelectorAll(".theme-logo").forEach(img => {
            const src = dark ? img.dataset.dark : img.dataset.light;
            if (src) {
                img.src = src;
            }
        });
    }
    function setTheme(dark, save = true) {
        root.classList.toggle("dark", dark);
        icon.src = dark
            ? `${pathPrefix}icons/lightMode.svg`
            : `${pathPrefix}icons/darkMode.svg`;
        updateLogos(dark);
        if (save) {
            localStorage.setItem("theme", dark ? "dark" : "light");
        }
    }
    const saved = localStorage.getItem("theme");
    if (saved) {
        setTheme(saved === "dark", false);
    } else {
        setTheme(
            window.matchMedia("(prefers-color-scheme: dark)").matches,
            false
        );
    }
    toggle.addEventListener("click", () => {
        setTheme(!root.classList.contains("dark"));
    });
    const observer = new MutationObserver(() => {
        updateLogos(root.classList.contains("dark"));
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});