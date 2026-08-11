// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// --------------------- nav-print.js -------------------------
// ------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    const nav = document.querySelector("nav");

    if (!nav) return;

    if (nav.id === "active") {
    const pathPrefix = "";

    nav.innerHTML = `

            <a href="" class="admin-navbar-logo">
                <img class="theme-logo" data-dark="../icons/icon_dark.png" data-light="../icons/icon_light.png" src="../icons/icon_dark.png" alt="NP Consultants">
            </a>

        <div class="admin-navbar-links">

            <ul>
                <li>
                    <a href="index.html" class="admin-active">
                        Dashboard
                    </a>
                </li>
            </ul>

        </div>

        <button class="admin-themeButton" id="themeToggle">
            <img id="themeIcon" src="../icons/lightMode.svg" alt="NP Consultants - Theme Light">
        </button>

        <a href="../index.html" class="admin-website-link">
            WEBSITE
        </a>

    `;
    }

    // Public pages are unchanged

    else {
    const pathPrefix = "";

    nav.innerHTML = `

            <a href="" class="admin-navbar-logo">
                <img class="theme-logo" data-dark="../icons/icon_dark.png" data-light="../icons/icon_light.png" src="${pathPrefix}icons/icon_dark.png" alt="NP Consultants">
            </a>

        <div class="admin-navbar-links">

            <ul>
                <li>
                    <a href="index.html">
                        Dashboard
                    </a>
                </li>
            </ul>

        </div>

        <button class="admin-themeButton" id="themeToggle">
            <img id="themeIcon" src="../icons/lightMode.svg" alt="NP Consultants - Theme Light">
        </button>

        <a href="../index.html" class="admin-website-link">
            WEBSITE
        </a>

    `;
    }

    // Get current page
    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    // Add active class
    nav.querySelectorAll(".navbar-links a").forEach(link => {

        const linkPage =
            link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });

});
