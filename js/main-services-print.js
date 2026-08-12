const MAIN_SERVICES_PATH = "../";
fetch("../data/main-services.json")
    .then(response => response.json())
    .then(data => {
        document.querySelector(".main-services").innerHTML = `
            <div class="main-services-title">
                <h2 class="main-services-heading">${data["main-services-title"]}</h2>
            </div>
            <p class="main-services-description">${data["main-services-description"]}</p>
            <a href="${data["main-services-buttonLink"]}" class="main-services-button">${data["main-services-button"]}</a>
            <div class="main-services-grid">
                ${data["main-services"].slice(0, 4).map(service => `
                    <div class="main-services-panel main-services-panel-left">
                        <h3>${service["main-services-name"]}</h3>
                        <p>${service["main-services-description"]}</p>
                    </div>
                `).join("")}
                <div class="main-services-image">
                    <img src="${MAIN_SERVICES_PATH}${data["main-services-image"]}" alt="Our Services">
                </div>
                ${data["main-services"].slice(4).map(service => `
                    <div class="main-services-panel main-services-panel-right">
                        <h3>${service["main-services-name"]}</h3>
                        <p>${service["main-services-description"]}</p>
                    </div>
                `).join("")}
            </div>
        `;
    });