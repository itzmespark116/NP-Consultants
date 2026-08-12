// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ------------------- projects-grid.js ----------------------- 
// ------------------------------------------------------------

const projectsContainer = document.querySelector(".projects-container");

const FALLBACK_IMAGE = "img/placeholder-image.jpg";

let projects = [];
let rotationTimers = [];

async function loadProjects() {
    try {
        const response = await fetch("data/projects.json");

        if (!response.ok) {
            throw new Error(`Failed to load projects.json: ${response.status}`);
        }

        const data = await response.json();
        projects = data.projects || [];

        renderProjects();
    } catch (error) {
        console.error("Projects failed to load:", error);
    }
}

// Attaches an onerror fallback to an <img>, swapping to the
// placeholder image if the source fails to load (missing / 404 / etc).
function withImageFallback(img) {
    img.addEventListener("error", () => {
        if (img.src.endsWith(FALLBACK_IMAGE)) return; // avoid infinite loop
        img.src = FALLBACK_IMAGE;
    });

    return img;
}

function renderProjects() {
    if (!projectsContainer) return;

    projectsContainer.innerHTML = "";

    const sections = new Map();

    projects.forEach(project => {
        if (!sections.has(project.section)) {
            sections.set(project.section, {
                id: project.section,
                title: project.sectionTitle || project.section,
                projects: []
            });
        }

        sections.get(project.section).projects.push(project);
    });

    sections.forEach(section => {
        const sectionElement = document.createElement("section");

        sectionElement.className = "projects-section";
        sectionElement.id = section.id;

        sectionElement.innerHTML = `
            <div class="projects-section-title">
                <h2>${section.title}</h2>
            </div>

            <div class="projects-grid"></div>
        `;

        const grid = sectionElement.querySelector(".projects-grid");

        section.projects.forEach((project, index) => {
            grid.appendChild(createProjectCard(project, index));
        });

        projectsContainer.appendChild(sectionElement);
    });
}

function createProjectCard(project, index) {
    const card = document.createElement("article");

    card.className = "project-card";
    card.dataset.projectId = project.id;

    const images = [
        project["photo-main"],
        ...(project.photos || [])
    ].filter(Boolean);

    card.innerHTML = `
        <div class="project-card-image">
            <img
                src="${images[0] || FALLBACK_IMAGE}"
                alt="${project.title || "Project"}"
            >
        </div>

        <div class="project-card-content">
            <div class="project-card-meta">
                <span>${project.topic || ""}</span>
            </div>

            <h2>${project.title || "Project"}</h2>

            <p>${project.description || ""}</p>
        </div>
    `;

    withImageFallback(card.querySelector(".project-card-image img"));

    card.addEventListener("click", () => {
        openProjectGallery(project);
    });

    startImageRotation(card, images);

    return card;
}

function startImageRotation(card, images) {
    if (images.length <= 1) return;

    const image = card.querySelector(".project-card-image img");

    let currentIndex = 0;

    const timer = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;

        image.style.opacity = "0";

        setTimeout(() => {
            image.src = images[currentIndex] || FALLBACK_IMAGE;
            image.style.opacity = "1";
        }, 250);
    }, 5000);

    rotationTimers.push(timer);
}

function createGallery() {
    let popup = document.querySelector(".projects-gallery-popup");

    if (popup) return popup;

    popup = document.createElement("div");
    popup.className = "projects-gallery-popup";

    popup.innerHTML = `
        <div class="projects-gallery-backdrop"></div>

        <div class="projects-gallery">
            <button
                class="projects-gallery-close"
                type="button"
                aria-label="Close gallery"
            >
                &times;
            </button>

            <div class="projects-gallery-header">
                <span class="projects-gallery-topic"></span>
                <h2 class="projects-gallery-title"></h2>
                <p class="projects-gallery-description"></p>
            </div>

            <div class="projects-gallery-grid"></div>
        </div>
    `;

    document.body.appendChild(popup);

    popup
        .querySelector(".projects-gallery-close")
        .addEventListener("click", closeProjectGallery);

    popup
        .querySelector(".projects-gallery-backdrop")
        .addEventListener("click", closeProjectGallery);

    return popup;
}

function openProjectGallery(project) {
    const popup = createGallery();

    const title = popup.querySelector(".projects-gallery-title");
    const topic = popup.querySelector(".projects-gallery-topic");
    const description = popup.querySelector(".projects-gallery-description");
    const galleryGrid = popup.querySelector(".projects-gallery-grid");

    const images = [
        project["photo-main"],
        ...(project.photos || [])
    ].filter(Boolean);

    title.textContent = project.title || "Project";
    topic.textContent = project.topic || project.sectionTitle || "";
    description.textContent = project.description || "";

    galleryGrid.innerHTML = "";

    images.forEach((image, index) => {
        const item = document.createElement("div");
        item.className = "projects-gallery-item";

        const img = document.createElement("img");

        img.src = image || FALLBACK_IMAGE;
        img.alt = `${project.title || "Project"} - Image ${index + 1}`;
        img.loading = "lazy";

        withImageFallback(img);

        item.appendChild(img);
        galleryGrid.appendChild(item);
    });

    popup.classList.add("active");
    document.body.classList.add("projects-gallery-open");
}

function closeProjectGallery() {
    const popup = document.querySelector(".projects-gallery-popup");

    if (!popup) return;

    popup.classList.remove("active");
    document.body.classList.remove("projects-gallery-open");
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeProjectGallery();
    }
});

loadProjects();