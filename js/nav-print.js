
document.addEventListener("DOMContentLoaded", () => {

    const nav = document.querySelector("nav");

    if (!nav) return;

    if (nav.id === "admin") {

        nav.innerHTML = `

            <a href="index.html" class="admin-navbar-logo">
                <img class="theme-logo"
                     data-dark="../icons/icon_dark.png"
                     data-light="../icons/icon_light.png"
                     src="../icons/icon_dark.png"
                     alt="NP Consultants">
            </a>

            <div class="admin-navbar-links">

                <ul>
                    <li>
                        <a href="index.html">
                            Dashboard
                        </a>
                    </li>

                    <li>
                        <a href="editor.html">
                            Editor
                        </a>
                    </li>

                    <li>
                        <a href="feedbacks.html">
                            Feedback
                        </a>
                    </li>

                    <li>
                        <a href="visitors.html">
                            Visitors
                        </a>
                    </li>

                    <li>
                        <a href="activity.html">
                            Activity
                        </a>
                    </li>

                    <li>
                        <a href="media.html">
                            Media
                        </a>
                    </li>

                    <li>
                        <a href="backups.html">
                            Backups
                        </a>
                    </li>

                    <li>
                        <a href="settings.html">
                            Settings
                        </a>
                    </li>
                </ul>

            </div>

            <a href="../home/" class="admin-website-link">
                WEBSITE
            </a>
        `;

        const currentPage =
            window.location.pathname.split("/").pop() || "index.html";

        nav.querySelectorAll(".admin-navbar-links a").forEach(link => {

            const linkPage =
                link.getAttribute("href").split("/").pop();

            if (linkPage === currentPage) {
                link.classList.add("admin-active");
            }

        });

        return;
    }

    nav.innerHTML = `

        <a href="../home/" class="navbar-logo">
            <img class="theme-logo"
                 data-dark="../icons/icon_dark.png"
                 data-light="../icons/icon_light.png"
                 src="../icons/icon_dark.png"
                 alt="NP Consultants">
        </a>

        <input type="checkbox" id="nav-toggle">

        <button class="themeButton" id="themeToggle">
            <img id="themeIcon" src="../icons/lightMode.svg">
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
                <li><a href="../home/">Home</a></li>
                <li><a href="../services/">Services</a></li>
                <li><a href="../projects/">Projects</a></li>
                <li><a href="../contact/">Contact Us</a></li>
            </ul>

        </div>
    `;

    const currentPage =
        window.location.pathname.split("/").filter(Boolean).pop()
        || "index.html";

    nav.querySelectorAll(".navbar-links a").forEach(link => {

        const linkPage =
            link.getAttribute("href").split("/").filter(Boolean).pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });

});