/* ------------------------------------------------------------ */
/* -------------------- NP Consultants ------------------------ */
/* ---------------- webeditor-projects.js --------------------- */
/* ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", async () => {
    const DATA_PATH = "../../../data/projects.json";
    const PLACEHOLDER = "../../../img/placeholder-project.jpg";

    const projectList = document.getElementById("project-list");
    const projectListView = document.getElementById("project-list-view");
    const projectEditor = document.getElementById("project-editor");
    const status = document.getElementById("webeditor-status");
    const saveButton = document.getElementById("save-button");
    const resetButton = document.getElementById("reset-button");
    const addProjectButton = document.getElementById("add-project-button");

    const sectionNames = {
        projects1: "Structural Design",
        projects2: "Structural Detailing",
        projects3: "Structural Design, Architectural Design & Project Management",
        projects4: "Structural Design, Architectural Design & Consultancy"
    };

    let data = null;
    let originalData = null;
    let selectedProjectId = null;

    /* ------------------------------------------------------------ */

    function setStatus(message, type = "") {
        status.textContent = message;
        status.className = "webeditor-status";

        if (type) {
            status.classList.add(type);
        }
    }

    /* ------------------------------------------------------------ */

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /* ------------------------------------------------------------ */

    function imagePath(path) {
        return path && path.trim()
            ? path
            : PLACEHOLDER;
    }

    /* ------------------------------------------------------------ */

    function createImage(path, className) {
        const image = document.createElement("img");

        image.className = className;
        image.src = imagePath(path);

        image.onerror = () => {
            image.onerror = null;
            image.src = PLACEHOLDER;
        };

        return image;
    }

    /* ------------------------------------------------------------ */

    function getTypes() {
        const types = new Set();

        if (Array.isArray(data.types)) {
            data.types.forEach(type => {
                if (String(type).trim()) {
                    types.add(String(type).trim());
                }
            });
        }

        data.projects.forEach(project => {
            if (project.type && String(project.type).trim()) {
                types.add(String(project.type).trim());
            }
        });

        return [...types].sort((a, b) =>
            a.localeCompare(b)
        );
    }

    /* ------------------------------------------------------------ */

    function addType(type) {
        type = String(type || "").trim();

        if (!type) {
            return;
        }

        if (!Array.isArray(data.types)) {
            data.types = [];
        }

        if (!data.types.some(
            existing =>
                String(existing).toLowerCase() ===
                type.toLowerCase()
        )) {
            data.types.push(type);
        }
    }

    /* ------------------------------------------------------------ */

    function generateProjectId() {
        const ids = data.projects
            .map(project => Number(project.id))
            .filter(id => Number.isFinite(id));

        if (!ids.length) {
            return 1;
        }

        return Math.max(...ids) + 1;
    }

    /* ------------------------------------------------------------ */

    function createEmptyProject() {
        const types = getTypes();

        return {
            id: generateProjectId(),
            section: Object.keys(sectionNames)[0] || "",
            type: types[0] || "",
            title: "New Project",
            topic: "",
            location: "",
            year: new Date().getFullYear().toString(),
            featured: 0,
            ongoing: false,
            description: "",
            "photo-main": "",
            photos: []
        };
    }

    /* ------------------------------------------------------------ */

    function addProject() {
        if (!data || !Array.isArray(data.projects)) {
            return;
        }

        const project = createEmptyProject();

        data.projects.push(project);
        selectedProjectId = project.id;

        projectListView.style.display = "none";
        projectEditor.style.display = "block";

        renderEditor(project);

        setStatus(
            `Project #${project.id} created. Not saved yet.`,
            "success"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    /* ------------------------------------------------------------ */

    function removeProject(id) {
        const index = data.projects.findIndex(
            project => project.id === id
        );

        if (index === -1) {
            return;
        }

        const project = data.projects[index];

        const confirmed = confirm(
            `Delete "${project.title || "Untitled Project"}"?\n\nThis project will be removed from the editor. Save Changes to permanently apply the deletion.`
        );

        if (!confirmed) {
            return;
        }

        data.projects.splice(index, 1);

        selectedProjectId = null;

        projectEditor.style.display = "none";
        projectListView.style.display = "block";

        renderProjects();

        setStatus(
            `"${project.title || "Untitled Project"}" deleted. Not saved yet.`,
            "success"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    /* ------------------------------------------------------------ */

    function getProjectPriority(project) {
        const featured = Boolean(project.featured);
        const ongoing = Boolean(project.ongoing);

        if (featured && ongoing) {
            return 0;
        }

        if (featured) {
            return 1;
        }

        if (ongoing) {
            return 2;
        }

        return 3;
    }

    /* ------------------------------------------------------------ */

    function renderProjects() {
        projectList.innerHTML = "";

        const projects = [...data.projects].sort((a, b) => {
            return getProjectPriority(a) - getProjectPriority(b);
        });

        if (!projects.length) {
            projectList.innerHTML = `
                <div class="projects-empty">
                    No projects available. Add your first project.
                </div>
            `;

            setStatus(
                "0 projects loaded.",
                "success"
            );

            return;
        }

        projects.forEach(project => {
            const card = document.createElement("button");

            card.type = "button";
            card.className = "project-card";

            if (project.featured) {
                card.classList.add("featured");
            }

            if (project.ongoing) {
                card.classList.add("ongoing");
            }

            const image = createImage(
                project["photo-main"],
                "project-card-image"
            );

            const content = document.createElement("div");

            content.className = "project-card-content";

            content.innerHTML = `
                <div class="project-card-top">
                    <div class="project-card-tags">
                        ${
                            project.type
                                ? `
                                    <span class="project-card-type">
                                        ${escapeHTML(project.type)}
                                    </span>
                                `
                                : ""
                        }

                        ${
                            project.ongoing
                                ? `
                                    <span class="project-card-ongoing">
                                        Ongoing
                                    </span>
                                `
                                : ""
                        }
                    </div>

                    ${
                        project.featured
                            ? `
                                <span class="project-card-featured">
                                    Featured
                                </span>
                            `
                            : ""
                    }
                </div>

                <div class="project-card-section">
                    ${escapeHTML(
                        sectionNames[project.section] ||
                        project.section ||
                        "Uncategorised"
                    )}
                </div>

                <div class="project-card-title">
                    ${escapeHTML(
                        project.title ||
                        "Untitled Project"
                    )}
                </div>

                <div class="project-card-topic">
                    ${escapeHTML(
                        project.topic ||
                        "No client"
                    )}
                </div>

                <div class="project-card-meta">
                    <span>
                        ${escapeHTML(
                            project.location ||
                            "No location"
                        )}
                    </span>

                    <span>
                        ${escapeHTML(
                            project.year ||
                            "—"
                        )}
                    </span>
                </div>
            `;

            card.append(
                image,
                content
            );

            card.addEventListener(
                "click",
                () => {
                    openProject(project.id);
                }
            );

            projectList.appendChild(card);
        });

        setStatus(
            `${data.projects.length} projects loaded.`,
            "success"
        );
    }

    /* ------------------------------------------------------------ */

    function openProject(id) {
        const project = data.projects.find(
            item => item.id === id
        );

        if (!project) {
            return;
        }

        selectedProjectId = id;

        projectListView.style.display = "none";
        projectEditor.style.display = "block";

        renderEditor(project);

        setStatus(
            `Project #${project.id} selected.`,
            "success"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    /* ------------------------------------------------------------ */

    function renderEditor(project) {
        const types = getTypes();

        if (
            project.type &&
            !types.some(
                type =>
                    type.toLowerCase() ===
                    String(project.type).toLowerCase()
            )
        ) {
            types.push(project.type);
        }

        projectEditor.innerHTML = `
            <div class="project-editor-header">
                <div class="project-editor-heading">
                    <button
                        type="button"
                        class="webeditor-button back"
                        id="projects-back"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 18L9 12L15 6"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>

                        Projects
                    </button>

                    <div>
                        <div class="webeditor-title">
                            Project Editor
                        </div>

                        <div class="webeditor-subtitle">
                            ${escapeHTML(
                                project.title ||
                                "New Project"
                            )}
                        </div>
                    </div>
                </div>

                <div class="project-editor-actions">
                    <button
                        type="button"
                        class="webeditor-button delete"
                        id="delete-project-button"
                    >
                        Delete Project
                    </button>
                </div>
            </div>

            <section class="element">
                <div class="element-header">
                    <div class="element-name">
                        Project Information
                    </div>

                    <div class="element-description">
                        Edit the project information.
                    </div>
                </div>

                <div class="element-fields">
                    <div class="field">
                        <label for="project-section">
                            Section
                        </label>

                        <select
                            id="project-section"
                            class="project-select"
                        >
                            ${Object.entries(
                                sectionNames
                            ).map(
                                ([key, name]) => `
                                    <option
                                        value="${escapeHTML(key)}"
                                        ${
                                            project.section === key
                                                ? "selected"
                                                : ""
                                        }
                                    >
                                        ${escapeHTML(name)}
                                    </option>
                                `
                            ).join("")}
                        </select>
                    </div>

                    <div class="field">
                        <label for="project-type">
                            Type
                        </label>

                        <div class="type-selector">
                            <select
                                id="project-type"
                                class="project-select"
                            >
                                <option value="">
                                    Select project type
                                </option>

                                ${types.map(
                                    type => `
                                        <option
                                            value="${escapeHTML(type)}"
                                            ${
                                                String(project.type || "")
                                                    .toLowerCase() ===
                                                String(type).toLowerCase()
                                                    ? "selected"
                                                    : ""
                                            }
                                        >
                                            ${escapeHTML(type)}
                                        </option>
                                    `
                                ).join("")}
                            </select>

                            <button
                                type="button"
                                class="add-type-button"
                                id="add-type-button"
                            >
                                + Add Type
                            </button>
                        </div>
                    </div>

                    <div class="field">
                        <label for="project-title">
                            Title
                        </label>

                        <input
                            id="project-title"
                            type="text"
                            value="${escapeHTML(
                                project.title
                            )}"
                        >
                    </div>

                    <div class="field">
                        <label for="project-topic">
                            Client / Topic
                        </label>

                        <input
                            id="project-topic"
                            type="text"
                            value="${escapeHTML(
                                project.topic
                            )}"
                        >
                    </div>

                    <div class="field">
                        <label for="project-location">
                            Location
                        </label>

                        <input
                            id="project-location"
                            type="text"
                            value="${escapeHTML(
                                project.location
                            )}"
                        >
                    </div>

                    <div class="field">
                        <label for="project-year">
                            Year
                        </label>

                        <input
                            id="project-year"
                            type="text"
                            value="${escapeHTML(
                                project.year
                            )}"
                        >
                    </div>

                    <div class="field">
                        <label>
                            Status
                        </label>

                        <div class="status-checkboxes">
                            <label class="checkbox-control">
                                <input
                                    type="checkbox"
                                    id="project-featured"
                                    ${
                                        project.featured
                                            ? "checked"
                                            : ""
                                    }
                                >

                                <span class="custom-checkbox"></span>

                                <span class="checkbox-text">
                                    Featured
                                </span>
                            </label>

                            <label class="checkbox-control ongoing-control">
                                <input
                                    type="checkbox"
                                    id="project-ongoing"
                                    ${
                                        project.ongoing
                                            ? "checked"
                                            : ""
                                    }
                                >

                                <span class="custom-checkbox"></span>

                                <span class="checkbox-text">
                                    Ongoing
                                </span>
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <label for="project-description">
                            Description
                        </label>

                        <textarea
                            id="project-description"
                            rows="5"
                        >${escapeHTML(
                            project.description
                        )}</textarea>
                    </div>
                </div>
            </section>

            <section class="element">
                <div class="element-header">
                    <div class="element-name">
                        Main Image
                    </div>

                    <div class="element-description">
                        Upload a replacement image.
                    </div>
                </div>

                <div class="project-media">
                    <div class="project-image-preview">
                        <img
                            id="project-main-preview"
                            src="${escapeHTML(
                                imagePath(
                                    project["photo-main"]
                                )
                            )}"
                        >
                    </div>

                    <div class="file-input">
                        <input
                            type="file"
                            id="project-main-image"
                            accept="image/jpeg,image/png,image/webp"
                        >

                        <label
                            for="project-main-image"
                            class="file-button"
                        >
                            Choose Image
                        </label>

                        <div
                            class="file-name"
                            id="project-main-name"
                        >
                            ${escapeHTML(
                                project["photo-main"] ||
                                "No image"
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section class="element">
                <div class="element-header">
                    <div class="element-name">
                        Additional Images
                    </div>

                    <div class="element-description">
                        Project gallery images.
                    </div>
                </div>

                <div
                    class="project-gallery"
                    id="project-gallery"
                ></div>

                <div class="file-input">
                    <input
                        type="file"
                        id="project-gallery-images"
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                    >

                    <label
                        for="project-gallery-images"
                        class="file-button"
                    >
                        Choose Images
                    </label>

                    <div class="file-name">
                        Select gallery images
                    </div>
                </div>
            </section>
        `;

        renderGallery(project);

        document
            .getElementById("projects-back")
            .addEventListener(
                "click",
                closeEditor
            );

        document
            .getElementById("delete-project-button")
            .addEventListener(
                "click",
                () => {
                    removeProject(project.id);
                }
            );

        bindEditorFields(project);
        bindImageInputs();
    }

    /* ------------------------------------------------------------ */

    function bindEditorFields(project) {
        const typeSelect =
            document.getElementById("project-type");

        const addTypeButton =
            document.getElementById("add-type-button");

        const featured =
            document.getElementById("project-featured");

        const ongoing =
            document.getElementById("project-ongoing");

        document
            .getElementById("project-section")
            .addEventListener(
                "change",
                event => {
                    project.section =
                        event.target.value;

                    setStatus(
                        "Section changed. Not saved yet.",
                        "success"
                    );
                }
            );

        typeSelect.addEventListener(
            "change",
            () => {
                project.type =
                    typeSelect.value;

                setStatus(
                    "Project type changed. Not saved yet.",
                    "success"
                );
            }
        );

        addTypeButton.addEventListener(
            "click",
            () => {
                const type = prompt(
                    "Enter the new project type:"
                );

                if (!type) {
                    return;
                }

                const cleanType =
                    type.trim();

                if (!cleanType) {
                    return;
                }

                const existing =
                    getTypes().find(
                        existingType =>
                            existingType.toLowerCase() ===
                            cleanType.toLowerCase()
                    );

                if (existing) {
                    typeSelect.value =
                        existing;

                    project.type =
                        existing;

                    setStatus(
                        `"${existing}" already exists and was selected.`,
                        "success"
                    );

                    return;
                }

                addType(cleanType);

                const option =
                    document.createElement("option");

                option.value =
                    cleanType;

                option.textContent =
                    cleanType;

                typeSelect.appendChild(option);

                typeSelect.value =
                    cleanType;

                project.type =
                    cleanType;

                setStatus(
                    `New type "${cleanType}" added. Not saved yet.`,
                    "success"
                );
            }
        );

        featured.addEventListener(
            "change",
            () => {
                project.featured =
                    featured.checked
                        ? 1
                        : 0;

                setStatus(
                    `Featured ${project.featured ? "enabled" : "disabled"}. Not saved yet.`,
                    "success"
                );
            }
        );

        ongoing.addEventListener(
            "change",
            () => {
                project.ongoing =
                    ongoing.checked;

                setStatus(
                    `Ongoing ${project.ongoing ? "enabled" : "disabled"}. Not saved yet.`,
                    "success"
                );
            }
        );

        document
            .getElementById("project-title")
            .addEventListener(
                "input",
                event => {
                    project.title =
                        event.target.value;
                }
            );

        document
            .getElementById("project-topic")
            .addEventListener(
                "input",
                event => {
                    project.topic =
                        event.target.value;
                }
            );

        document
            .getElementById("project-location")
            .addEventListener(
                "input",
                event => {
                    project.location =
                        event.target.value;
                }
            );

        document
            .getElementById("project-year")
            .addEventListener(
                "input",
                event => {
                    project.year =
                        event.target.value;
                }
            );

        document
            .getElementById("project-description")
            .addEventListener(
                "input",
                event => {
                    project.description =
                        event.target.value;
                }
            );
    }

    /* ------------------------------------------------------------ */

    function renderGallery(project) {
        const gallery =
            document.getElementById("project-gallery");

        gallery.innerHTML = "";

        if (
            !project.photos ||
            !project.photos.length
        ) {
            gallery.innerHTML = `
                <div class="projects-empty">
                    No additional images.
                </div>
            `;

            return;
        }

        project.photos.forEach(
            (photo, index) => {
                const item =
                    document.createElement("div");

                item.className =
                    "project-gallery-item";

                const image =
                    createImage(
                        photo,
                        ""
                    );

                item.appendChild(image);

                const info =
                    document.createElement("div");

                info.className =
                    "project-gallery-info";

                info.textContent =
                    `Image ${index + 1}`;

                item.appendChild(info);

                gallery.appendChild(item);
            }
        );
    }

    /* ------------------------------------------------------------ */

    function bindImageInputs() {
        const mainInput =
            document.getElementById("project-main-image");

        const mainPreview =
            document.getElementById("project-main-preview");

        const mainName =
            document.getElementById("project-main-name");

        mainInput.addEventListener(
            "change",
            () => {
                const file =
                    mainInput.files[0];

                if (!file) {
                    return;
                }

                mainName.textContent =
                    file.name;

                const reader =
                    new FileReader();

                reader.onload =
                    event => {
                        mainPreview.src =
                            event.target.result;
                    };

                reader.readAsDataURL(file);

                setStatus(
                    "Main image selected. Not saved yet.",
                    "success"
                );
            }
        );

        const galleryInput =
            document.getElementById("project-gallery-images");

        galleryInput.addEventListener(
            "change",
            () => {
                if (!galleryInput.files.length) {
                    return;
                }

                const gallery =
                    document.getElementById("project-gallery");

                gallery.innerHTML = "";

                [
                    ...galleryInput.files
                ].forEach(
                    (file, index) => {
                        const reader =
                            new FileReader();

                        reader.onload =
                            event => {
                                const item =
                                    document.createElement("div");

                                item.className =
                                    "project-gallery-item";

                                item.innerHTML = `
                                    <img
                                        src="${event.target.result}"
                                    >

                                    <div class="project-gallery-info">
                                        New Image ${index + 1}
                                    </div>
                                `;

                                gallery.appendChild(item);
                            };

                        reader.readAsDataURL(file);
                    }
                );

                setStatus(
                    `${galleryInput.files.length} image(s) selected. Not saved yet.`,
                    "success"
                );
            }
        );
    }

    /* ------------------------------------------------------------ */

    function closeEditor() {
        projectEditor.style.display = "none";
        projectListView.style.display = "block";

        selectedProjectId = null;

        renderProjects();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    /* ------------------------------------------------------------ */

    if (addProjectButton) {
        addProjectButton.addEventListener(
            "click",
            addProject
        );
    }

    /* ------------------------------------------------------------ */

    if (resetButton) {
        resetButton.addEventListener(
            "click",
            () => {
                if (!originalData) {
                    return;
                }

                const confirmed =
                    confirm(
                        "Reset all unsaved project changes?"
                    );

                if (!confirmed) {
                    return;
                }

                data =
                    JSON.parse(
                        JSON.stringify(originalData)
                    );

                if (selectedProjectId !== null) {
                    const project =
                        data.projects.find(
                            item =>
                                item.id ===
                                selectedProjectId
                        );

                    if (project) {
                        renderEditor(project);
                    } else {
                        selectedProjectId = null;

                        projectEditor.style.display =
                            "none";

                        projectListView.style.display =
                            "block";

                        renderProjects();
                    }
                } else {
                    renderProjects();
                }

                setStatus(
                    "Changes reset.",
                    "success"
                );
            }
        );
    }

    /* ------------------------------------------------------------ */

    if (saveButton) {
        saveButton.addEventListener(
            "click",
            () => {
                console.log(
                    "Project data:",
                    JSON.stringify(
                        data,
                        null,
                        4
                    )
                );

                setStatus(
                    "Changes prepared. Backend save required.",
                    "success"
                );
            }
        );
    }

    /* ------------------------------------------------------------ */

    setStatus(
        "Loading project data..."
    );

    try {
        const response =
            await fetch(
                `${DATA_PATH}?t=${Date.now()}`,
                {
                    cache: "no-store"
                }
            );

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        data =
            await response.json();

        if (
            !data ||
            !Array.isArray(data.projects)
        ) {
            throw new Error(
                "Invalid JSON structure."
            );
        }

        if (
            !Array.isArray(data.types)
        ) {
            data.types =
                getTypes();
        }

        originalData =
            JSON.parse(
                JSON.stringify(data)
            );

        renderProjects();

    } catch (error) {
        console.error(
            "Webeditor Projects:",
            error
        );

        projectList.innerHTML = `
            <div class="projects-empty">
                Failed to load project data.
            </div>
        `;

        setStatus(
            `Failed to load JSON: ${error.message}`,
            "error"
        );
    }
});
