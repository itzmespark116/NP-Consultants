/* ------------------------------------------------------------ */
/* -------------------- NP Consultants ------------------------ */
/* -------------- webeditor-main-services.js ----------------- */
/* ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", async () => {

    const form = document.getElementById("services-form");
    const servicesContainer = document.getElementById("services-container");
    const saveButton = document.getElementById("save-button");
    const resetButton = document.getElementById("reset-button");
    const status = document.getElementById("webeditor-status");

    if (!form || !servicesContainer) return;

    const JSON_PATH = "../../../data/main-services.json";

    let originalData = {};

    /* -------------------------------------------------------- */

    function setStatus(message, type = "") {

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

    function createService(service, index) {

        const element = document.createElement("div");

        element.className = "service-editor";

        element.innerHTML = `

            <div class="service-header">

                <div class="service-number">
                    Service ${String(index + 1).padStart(2, "0")}
                </div>

            </div>

            <div class="service-fields">

                <div class="service-field">

                    <label for="main-services-name-${index}">
                        Service Name
                    </label>

                    <input
                        type="text"
                        id="main-services-name-${index}"
                        value="${escapeHTML(
                            service["main-services-name"] || ""
                        )}"
                        autocomplete="off"
                        placeholder="Service Name"
                    >

                </div>

                <div class="service-field">

                    <label for="main-services-description-${index}">
                        Description
                    </label>

                    <textarea
                        id="main-services-description-${index}"
                        rows="4"
                        placeholder="Description - Write a breif description"
                    >${escapeHTML(
                        service["main-services-description"] || ""
                    )}</textarea>

                </div>

                <div class="service-field">

                    <label>
                        Side
                    </label>

                    <div class="side-selector">

                        <button
                            type="button"
                            class="side-button ${
                                service["main-services-side"] === "left"
                                    ? "active"
                                    : ""
                            }"
                            data-side="left"
                        >
                            Left
                        </button>

                        <button
                            type="button"
                            class="side-button ${
                                service["main-services-side"] === "right"
                                    ? "active"
                                    : ""
                            }"
                            data-side="right"
                        >
                            Right
                        </button>

                    </div>

                </div>

            </div>

        `;

        servicesContainer.appendChild(element);

        const sideButtons =
            element.querySelectorAll(".side-button");

        sideButtons.forEach(button => {

            button.addEventListener("click", () => {

                sideButtons.forEach(item => {
                    item.classList.remove("active");
                });

                button.classList.add("active");

            });

        });

    }

    /* -------------------------------------------------------- */

    function setFormData(data) {

        document.getElementById(
            "main-services-title"
        ).value =
            data["main-services-title"] || "";

        document.getElementById(
            "main-services-description"
        ).value =
            data["main-services-description"] || "";

        document.getElementById(
            "main-services-button"
        ).value =
            data["main-services-button"] || "";

        document.getElementById(
            "main-services-buttonLink"
        ).value =
            data["main-services-buttonLink"] || "";

        document.getElementById(
            "main-services-image-name"
        ).textContent =
            data["main-services-image"] ||
            "No file selected";

        servicesContainer.innerHTML = "";

        const services =
            data["main-services"] || [];

        services.forEach((service, index) => {
            createService(service, index);
        });

    }

    /* -------------------------------------------------------- */

    function getFormData() {

        const data = {

            "main-services-title":
                document.getElementById(
                    "main-services-title"
                ).value,

            "main-services-description":
                document.getElementById(
                    "main-services-description"
                ).value,

            "main-services-button":
                document.getElementById(
                    "main-services-button"
                ).value,

            "main-services-buttonLink":
                document.getElementById(
                    "main-services-buttonLink"
                ).value,

            "main-services-image":
                originalData["main-services-image"] || "",

            "main-services": []

        };

        const image =
            document.getElementById(
                "main-services-image"
            );

        if (image.files.length > 0) {

            data["main-services-image"] =
                image.files[0].name;

        }

        const services =
            servicesContainer.children;

        Array.from(services).forEach(serviceElement => {

            const activeSide =
                serviceElement.querySelector(
                    ".side-button.active"
                );

            data["main-services"].push({

                "main-services-name":
                    serviceElement.querySelector(
                        "input"
                    ).value,

                "main-services-description":
                    serviceElement.querySelector(
                        "textarea"
                    ).value,

                "main-services-side":
                    activeSide
                        ? activeSide.dataset.side
                        : "left"

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
                    "Failed to load main-services.json"
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
                "Unable to load homepage services data.",
                "error"
            );

        }

    }

    /* -------------------------------------------------------- */

    const imageInput =
        document.getElementById(
            "main-services-image"
        );

    const imageName =
        document.getElementById(
            "main-services-image-name"
        );

    if (imageInput) {

        imageInput.addEventListener(
            "change",
            () => {

                imageName.textContent =
                    imageInput.files.length > 0
                        ? imageInput.files[0].name
                        : originalData["main-services-image"] ||
                          "No file selected";

            }
        );

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
                    "Homepage Main Services:",
                    data
                );

                setStatus(
                    "Changes are ready. Saving will be connected to the backend later.",
                    "success"
                );

            }
        );

    }

    /* -------------------------------------------------------- */

    await loadData();

});