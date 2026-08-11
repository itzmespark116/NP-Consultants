// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// --------------------- nav-print.js -------------------------
// ------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    const nav = document.querySelector("nav");

    if (!nav) return;

    // --------------------------------------------------------
    // ---------------------- ADMIN NAV -----------------------
    // --------------------------------------------------------

    if (nav.id === "admin") {

        // nav.innerHTML = `

        //     <a href="index.html" class="admin-navbar-logo">
        //         <img class="theme-logo"
        //              data-dark="icons/icon_dark.png"
        //              data-light="icons/icon_light.png"
        //              src="icons/icon_dark.png"
        //              alt="NP Consultants">
        //     </a>

        //     <div class="admin-navbar-links">

        //         <ul>
        //             <li>
        //                 <a href="index.html" class="admin-active">
        //                     Dashboard
        //                 </a>
        //             </li>
        //         </ul>

        //     </div>

        //     <a href="../index.html" class="admin-website-link">
        //         WEBSITE
        //     </a>

        // `;

        return;
    }

    // --------------------------------------------------------
    // ---------------------- PUBLIC NAV ----------------------
    // --------------------------------------------------------

    // Public pages are unchanged
    const pathPrefix = "";

    nav.innerHTML = `

        <a href="${pathPrefix}index.html" class="navbar-logo">
            <img class="theme-logo"
                 data-dark="${pathPrefix}icons/icon_dark.png"
                 data-light="${pathPrefix}icons/icon_light.png"
                 src="${pathPrefix}icons/icon_dark.png"
                 alt="NP Consultants">
        </a>

        <input type="checkbox" id="nav-toggle">

        <button class="themeButton" id="themeToggle">
            <img id="themeIcon" src="${pathPrefix}icons/lightMode.svg">
        </button>

        <label for="nav-toggle" class="open-nav">
            <span></span>
            <span></span>
            <span></span>
        </label>

        <label for="nav-toggle" class="nav-overlay"></label>

        <div class="navbar-links">

            <label for="nav-toggle" class="close-nav"></label>

            <ul>
                <li><a href="${pathPrefix}index.html">Home</a></li>
                <li><a href="${pathPrefix}services.html">Services</a></li>
                <li><a href="${pathPrefix}projects.html">Projects</a></li>
                <li><a href="${pathPrefix}contact.html">Contact Us</a></li>
            </ul>

        </div>
    `;

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
