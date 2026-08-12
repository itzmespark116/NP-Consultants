
const servicesContainer = document.querySelector(".services-container");

async function loadServices() {
    try {
        const response = await fetch("../data/services.json");

        if (!response.ok) {
            throw new Error(`Failed to load services.json: ${response.status}`);
        }

        const data = await response.json();

        servicesContainer.innerHTML = (data.services || []).map(service => `
            <section class="services-section">
                <h2>${service["services-title"]}</h2>
                ${(service["services-paragraphs"] || []).map(paragraph => `
                    <p>${paragraph}</p>
                `).join("")}
                ${service["services-list"] ? `
                    <ul>
                        ${service["services-list"].map(item => `
                            <li>${item}</li>
                        `).join("")}
                    </ul>
                ` : ""}
            </section>
        `).join("");
    } catch (error) {
        console.error("Services loading error:", error);
    }
}

loadServices();