
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const footerPath = "../";
    fetch(`${footerPath}data/contact.json`)
        .then(response => response.json())
        .then(data => {
            const footerData = data.footer;
            footer.innerHTML = `
                <div class="footer-main">
                    <div class="footer-logo-card">
                        <img class="theme-logo" data-dark="${footerPath}icons/icon_dark.png" data-light="${footerPath}icons/icon_light.png" src="${footerPath}icons/icon_dark.png" alt="${footerData.title}">
                    </div>
                    <div class="footer-info-card">
                        <div class="footer-title">
                            <h2>${footerData.title}</h2>
                            <p>${footerData.subtitle}</p>
                        </div>
                        <div class="footer-contact">
                            ${data.info.map(item => `
                            <p data-action="${item.action}">
                                <svg class="footer-icon" viewBox="0 0 24 24">
                                    <path d="${item.icon}"/>
                                </svg>
                                ${item.text}
                            </p>
                            `).join("")}
                        </div>
                    </div>
                    <div class="footer-nav-card">
                        <ul>
                            ${footerData.navigation.map(item => `
                            <li><a href="${footerPath}${item.url}">${item.label}</a></li>
                            `).join("")}
                        </ul>
                    </div>
                </div>
                <div class="footer-copyright">
                    <p>${footerData.copyright}</p>
                </div>
            `;
            footer.querySelectorAll("[data-action]").forEach(element => {
                element.addEventListener("click", () => {
                    const action = element.dataset.action;
                    if (action.startsWith("http")) {
                        window.open(action, "_blank");
                    } else {
                        window.location.href = action;
                    }
                });
            });
        })
        .catch(error => console.error("Failed to load footer data:", error));
});