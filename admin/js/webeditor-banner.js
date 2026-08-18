/* ------------------------------------------------------------ */
/* -------------------- NP Consultants ------------------------ */
/* ------------------ webeditor-banner.js --------------------- */
/* ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", async () => {

    const form = document.getElementById("banner-form");
    const saveButton = document.getElementById("save-button");
    const resetButton = document.getElementById("reset-button");
    const status = document.getElementById("webeditor-status");

    if (!form) return;

    const JSON_PATH = "../../../data/main-banner.json";

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

    function setFormData(data) {

        Object.entries(data).forEach(([key, value]) => {

            const field = document.getElementById(key);

            if (!field) return;

            if (field.type === "file") return;

            field.value = value ?? "";

        });

    }

    /* -------------------------------------------------------- */

    function getFormData() {

        const data = {};

        form.querySelectorAll(
            "input:not([type='file']), textarea"
        ).forEach(field => {

            data[field.name] = field.value;

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
                    "Failed to load main-banner.json"
                );
            }

            originalData = await response.json();

            setFormData(originalData);

            setStatus("Loaded");

        } catch (error) {

            console.error(
                "Webeditor:",
                error
            );

            setStatus(
                "Unable to load banner data.",
                "error"
            );

        }

    }

    /* -------------------------------------------------------- */

    if (resetButton) {

        resetButton.addEventListener("click", () => {

            setFormData(originalData);

            if (videoInput) {
                videoInput.value = "";
            }

            if (posterInput) {
                posterInput.value = "";
            }

            if (videoName) {
                videoName.textContent = "No file selected";
            }

            if (posterName) {
                posterName.textContent = "No file selected";
            }

            setStatus("Changes reset.");

        });

    }

    /* -------------------------------------------------------- */

    if (saveButton) {

        saveButton.addEventListener("click", event => {

            event.preventDefault();

            const data = getFormData();

            console.log("Current editor data:", data);

            setStatus(
                "Editing is available. Saving will be connected to the backend later.",
                "success"
            );

        });

    }

    /* -------------------------------------------------------- */

    const videoInput =
        document.getElementById("main-banner-video");

    const posterInput =
        document.getElementById("main-banner-poster");

    const videoName =
        document.getElementById("main-banner-video-name");

    const posterName =
        document.getElementById("main-banner-poster-name");

    /* -------------------------------------------------------- */

    if (videoInput) {

        videoInput.addEventListener("change", () => {

            videoName.textContent =
                videoInput.files.length > 0
                    ? videoInput.files[0].name
                    : "No file selected";

        });

    }

    /* -------------------------------------------------------- */

    if (posterInput) {

        posterInput.addEventListener("change", () => {

            posterName.textContent =
                posterInput.files.length > 0
                    ? posterInput.files[0].name
                    : "No file selected";

        });

    }

    /* -------------------------------------------------------- */

    await loadData();

});