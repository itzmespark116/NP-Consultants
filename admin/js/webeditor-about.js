/* ------------------------------------------------------------ */
/* -------------------- NP Consultants ------------------------ */
/* ------------------ webeditor-about.js ---------------------- */
/* ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", async () => {

    const form = document.getElementById("about-form");
    const projectsContainer = document.getElementById("projects-container");
    const saveButton = document.getElementById("save-button");
    const resetButton = document.getElementById("reset-button");
    const status = document.getElementById("webeditor-status");

    if (!form || !projectsContainer) return;

    const JSON_PATH = "../../../data/main-about.json";

    let originalData = {};

    /* -------------------------------------------------------- */

    function setStatus(message, type = "") {

        if (!status) return;

        status.textContent = message;
        status.className = "webeditor-status";

        if (type) {
            status.classList.add(type);
        }

    }

    /* -------------------------------------------------------- */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

    /* -------------------------------------------------------- */

    function createProject(project, index) {

        const projectElement =
            document.createElement("div");

        projectElement.className = "project-editor";

        projectElement.innerHTML = `

            <div class="project-header">

                <div class="project-number">
                    Project ${String(index + 1).padStart(2, "0")}
                </div>

            </div>

            <div class="project-fields">

                <div class="field project-image-field">

                    <label for="main-about-image-${index}">
                        Project Image
                    </label>

                    <div class="file-input">

                        <input
                            type="file"
                            id="main-about-image-${index}"
                            name="main-about-image-${index}"
                            accept="image/jpeg,image/png,image/webp"
                        >

                        <label
                            for="main-about-image-${index}"
                            class="file-button"
                        >
                            Choose Image
                        </label>

                        <div
                            class="file-name"
                            id="main-about-image-name-${index}"
                        >
                            ${escapeHTML(
                                project["main-about-image"] ||
                                "No image selected"
                            )}
                        </div>

                    </div>

                </div>

                <div class="field">

                    <label for="main-about-name-${index}">
                        Project Name
                    </label>

                    <input
                        type="text"
                        id="main-about-name-${index}"
                        name="main-about-name-${index}"
                        value="${escapeHTML(
                            project["main-about-name"] || ""
                        )}"
                        autocomplete="off"
                        placeholder="Project Name"
                    >

                </div>

                <div class="field">

                    <label for="main-about-type-${index}">
                        Project Type
                    </label>

                    <input
                        type="text"
                        id="main-about-type-${index}"
                        name="main-about-type-${index}"
                        value="${escapeHTML(
                            project["main-about-type"] || ""
                        )}"
                        autocomplete="off"
                        placeholder="Structural Design"
                    >

                </div>

            </div>

        `;

        projectsContainer.appendChild(projectElement);

        const imageInput =
            document.getElementById(
                `main-about-image-${index}`
            );

        const imageName =
            document.getElementById(
                `main-about-image-name-${index}`
            );

        if (imageInput) {

            imageInput.addEventListener(
                "change",
                () => {

                    imageName.textContent =
                        imageInput.files.length > 0
                            ? imageInput.files[0].name
                            : project["main-about-image"] ||
                              "No image selected";

                }
            );

        }

    }

    /* -------------------------------------------------------- */

    function setFormData(data) {

        const title =
            document.getElementById("main-about-title");

        if (title) {
            title.value =
                data["main-about-title"] || "";
        }

        const text =
            data["main-about-text"] || [];

        for (let i = 0; i < 3; i++) {

            const field =
                document.getElementById(
                    `main-about-text-${i}`
                );

            if (field) {
                field.value =
                    text[i] || "";
            }

        }

        projectsContainer.innerHTML = "";

        const projects =
            data["main-about-projects"] || [];

        projects.forEach((project, index) => {

            createProject(project, index);

        });

    }

    /* -------------------------------------------------------- */

    function getFormData() {

        const data = {

            "main-about-title":
                document.getElementById(
                    "main-about-title"
                )?.value || "",

            "main-about-text": [],

            "main-about-projects": []

        };

        for (let i = 0; i < 3; i++) {

            const field =
                document.getElementById(
                    `main-about-text-${i}`
                );

            data["main-about-text"].push(
                field?.value || ""
            );

        }

        const projects =
            originalData["main-about-projects"] || [];

        projects.forEach((project, index) => {

            const name =
                document.getElementById(
                    `main-about-name-${index}`
                );

            const type =
                document.getElementById(
                    `main-about-type-${index}`
                );

            const image =
                document.getElementById(
                    `main-about-image-${index}`
                );

            data["main-about-projects"].push({

                "main-about-image":
                    image?.files.length > 0
                        ? image.files[0].name
                        : project["main-about-image"] || "",

                "main-about-name":
                    name?.value || "",

                "main-about-type":
                    type?.value || ""

            });

        });

        return data;

    }

    /* -------------------------------------------------------- */

    async function loadData() {

        try {

            setStatus("Loading...");

            const response = await fetch(
                JSON_PATH + "?t=" + Date.now()
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to load main-about.json"
                );
            }

            originalData =
                await response.json();

            setFormData(originalData);

            setStatus("Loaded");

        } catch (error) {

            console.error(
                "Webeditor:",
                error
            );

            setStatus(
                "Unable to load About data.",
                "error"
            );

        }

    }

    /* -------------------------------------------------------- */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            () => {

                setFormData(originalData);

                setStatus(
                    "Changes reset."
                );

            }
        );

    }

    /* -------------------------------------------------------- */

    if (saveButton) {

        saveButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const data =
                    getFormData();

                console.log(
                    "Current About data:",
                    data
                );

                setStatus(
                    "Editing is available. Saving will be connected to the backend later.",
                    "success"
                );

            }
        );

    }

    /* -------------------------------------------------------- */

    await loadData();

});