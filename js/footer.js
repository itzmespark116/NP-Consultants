// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ---------------------- footer.js ----------------------------
// ------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    const footer = document.querySelector("footer");

    if (!footer) return;

    // Admin pages are one directory deeper
    const pathPrefix = footer.id === "admin" ? "../" : "";

    footer.innerHTML = `

        <div class="footer-main">

            <div class="footer-logo-card">
                <img
                    class="theme-logo"
                    data-dark="${pathPrefix}icons/icon_dark.png"
                    data-light="${pathPrefix}icons/icon_light.png"
                    src="${pathPrefix}icons/icon_dark.png"
                    alt="NP Consultants"
                >
            </div>

            <div class="footer-info-card">

                <div class="footer-title">
                    <h2>NP Consultants</h2>
                    <p>Engineering Consultancy Services</p>
                </div>

                <div class="footer-contact">

                    <p onclick="window.open('https://maps.app.goo.gl/6kavbqFQv9p5vgH98', '_blank')">
                        <svg class="footer-icon" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
                        </svg>
                        No. 318/3/1/1, Colombo Road, Negombo, Sri Lanka
                    </p>

                    <p onclick="window.location.href='tel:+94312222755'">
                        <svg class="footer-icon" viewBox="0 0 24 24">
                            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24c1.12.37 2.33.57 3.54.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.21.2 2.42.57 3.54a1 1 0 0 1-.24 1.05l-2.21 2.2z"/>
                        </svg>
                        +94 31 2222 755
                    </p>

                    <p onclick="window.location.href='mailto:info@npconsultants.info'">
                        <svg class="footer-icon" viewBox="0 0 24 24">
                            <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0-2 2v-?"/>
                        </svg>
                        info@npconsultants.info
                    </p>

                    <p onclick="window.location.href='mailto:nandanarce@gmail.com'">
                        <svg class="footer-icon" viewBox="0 0 24 24">
                            <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2V6l8 5 8-5v12a2 2 0 0 0-2 2h-16a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
                        </svg>
                        nandanarce@gmail.com
                    </p>

                </div>

            </div>

            <div class="footer-nav-card">

                <ul>
                    <li><a href="${pathPrefix}index.html">Home</a></li>
                    <li><a href="${pathPrefix}index.html#main-about">About Us</a></li>
                    <li><a href="${pathPrefix}index.html#main-services">Our Services</a></li>
                    <li><a href="${pathPrefix}index.html#main-team">Our Team</a></li>
                    <li><a href="${pathPrefix}index.html#main-contact">Contact Us</a></li>
                </ul>

            </div>

        </div>

        <div class="footer-copyright">
            <p>© 2026 NP Consultants. All Rights Reserved.</p>
        </div>

    `;

});