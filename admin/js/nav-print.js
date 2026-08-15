document.addEventListener("DOMContentLoaded", () => {

    const nav = document.querySelector("nav");

    if (!nav) return;

    if (nav.id === "active") {

        nav.innerHTML = `

            <a href="./" class="admin-navbar-logo">
                <img
                    class="theme-logo"
                    data-dark="../icons/icon_dark.png"
                    data-light="../icons/icon_light.png"
                    src="../icons/icon_dark.png"
                    alt="NP Consultants"
                >
            </a>

            <div class="admin-navbar-links">

                <ul>
                    <li>
                        <a href="../">
                            Dashboard
                        </a>
                    </li>
                </ul>

            </div>

            <button class="admin-themeButton" id="themeToggle">
                <img
                    id="themeIcon"
                    src="../icons/lightMode.svg"
                    alt="NP Consultants - Theme Light"
                >
            </button>

            <a href="../home/" class="admin-website-link">
                WEBSITE
            </a>

        `;

    } else if (nav.id === "webeditor") {

        nav.innerHTML = `

            <a href="../../" class="admin-navbar-logo">
                <img
                    class="theme-logo"
                    data-dark="../../../icons/icon_dark.png"
                    data-light="../../../icons/icon_light.png"
                    src="../../../icons/icon_dark.png"
                    alt="NP Consultants"
                >
            </a>

            <div class="admin-navbar-links">

                <ul>
                    <li>
                        <a href="../../">
                            Dashboard
                        </a>
                    </li>
                </ul>

            </div>

            <button class="admin-themeButton" id="themeToggle">
                <img
                    id="themeIcon"
                    src="../../../icons/lightMode.svg"
                    alt="NP Consultants - Theme Light"
                >
            </button>

            <a href="../../../home/" class="admin-website-link">
                WEBSITE
            </a>

        `;

    } else {

        nav.innerHTML = `

            <a href="../" class="admin-navbar-logo">
                <img
                    class="theme-logo"
                    data-dark="../../icons/icon_dark.png"
                    data-light="../../icons/icon_light.png"
                    src="../../icons/icon_dark.png"
                    alt="NP Consultants"
                >
            </a>

            <div class="admin-navbar-links">

                <ul>
                    <li>
                        <a href="../">
                            Dashboard
                        </a>
                    </li>
                </ul>

            </div>

            <button class="admin-themeButton" id="themeToggle">
                <img
                    id="themeIcon"
                    src="../icons/lightMode.svg"
                    alt="NP Consultants - Theme Light"
                >
            </button>

            <a href="../../home/" class="admin-website-link">
                WEBSITE
            </a>

        `;

    }

    const currentPath =
        window.location.pathname.replace(/\/+$/, "") || "/";

    nav.querySelectorAll(".admin-navbar-links a").forEach(link => {

        const linkPath =
            new URL(link.getAttribute("href"), window.location.href)
                .pathname
                .replace(/\/+$/, "") || "/";

        if (linkPath === currentPath) {
            link.classList.add("active");
        }

    });

});