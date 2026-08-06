// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ----------------------- theme.js ---------------------------
// ------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");

  function setTheme(dark, save = true) {
    root.classList.toggle("dark", dark);

    icon.src = dark ? "icons/lightMode.svg" : "icons/darkMode.svg";

    // Swap any logo/image tagged with .theme-logo using its
    // data-dark / data-light attributes (nav logo, intro logo, etc.)
    document.querySelectorAll(".theme-logo").forEach((img) => {
      const src = dark ? img.dataset.dark : img.dataset.light;
      if (src) img.src = src;
    });

    if (save) localStorage.setItem("theme", dark ? "dark" : "light");
  }

  const saved = localStorage.getItem("theme");

  if (saved) {
    setTheme(saved === "dark", false);
  } else {
    setTheme(window.matchMedia("(prefers-color-scheme:dark)").matches, false);
  }

  toggle.addEventListener("click", () => {
    setTheme(!root.classList.contains("dark"));
  });
});
