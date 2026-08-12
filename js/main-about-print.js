const MAIN_ABOUT_PATH = "../";
fetch("../data/main-about.json")
    .then(response => response.json())
    .then(data => {
        const about = document.querySelector(".main-about");
        about.innerHTML = `
            <div class="title">
                <h2>${data["main-about-title"]}</h2>
            </div>
            <div class="main-about-content">
                <div class="main-about-text">
                    ${data["main-about-text"].map(text => `<p>${text}</p>`).join("")}
                </div>
                <div class="main-about-grid">
                    ${data["main-about-projects"].map(project => `
                        <div class="main-about-card">
                            <img src="${MAIN_ABOUT_PATH}${project["main-about-image"]}" alt="${project["main-about-name"]}">
                            <div class="main-about-card-overlay">
                                <h3>${project["main-about-name"]}</h3>
                                <p>${project["main-about-type"]}</p>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    });