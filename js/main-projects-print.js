// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ---------------- main-projects-print.js --------------------
// ------------------------------------------------------------

const mainProjects = document.querySelector(".main-projects");
const MAIN_PROJECTS_FALLBACK = "img/placeholder-project.jpg";

async function loadFeaturedProjects() {
    try {
        const response = await fetch("data/projects.json");

        if (!response.ok) {
            throw new Error(`Failed to load projects.json: ${response.status}`);
        }

        const data = await response.json();

        const featuredProjects = (data.projects || [])
            .filter(project => project.featured === 1)
            .slice(0, 3);

        renderFeaturedProjects(data, featuredProjects);
    } catch (error) {
        console.error("Featured projects failed to load:", error);
    }
}

function renderFeaturedProjects(data, projects) {
    if (!mainProjects) return;

    mainProjects.innerHTML = `
        <div class="main-projects-title">
            <h2 class="main-projects-heading">${data["main-projects-title"]}</h2>
        </div>

        <p class="main-projects-description">
            ${data["main-projects-description"]}
        </p>

        <div class="main-projects-grid">
            ${projects.map(project => `
                <article class="main-projects-card">
                    <div class="main-projects-image">
                        <img
                            src="${project["photo-main"] || MAIN_PROJECTS_FALLBACK}"
                            alt="${project.title || "Project"}"
                            onerror="this.onerror=null;this.src='${MAIN_PROJECTS_FALLBACK}'"
                        >
                    </div>

                    <div class="main-projects-overlay"></div>

                    <div class="main-projects-info">
                        <h3>${project.title || "Project"}</h3>
                        <p>${project.description || ""}</p>
                    </div>
                </article>
            `).join("")}
        </div>

        <a href="${data["main-projects-buttonLink"]}" class="main-projects-button">
            ${data["main-projects-button"]}
        </a>
    `;
}

loadFeaturedProjects();