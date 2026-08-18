/* ------------------------------------------------------------ */
/* -------------------- NP Consultants ------------------------ */
/* -------- webeditor-contact-main.js -------------------------- */
/* ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", async () => {

    const DATA_PATH = "../../../data/main-contact.json";

    const titleInput = document.getElementById("main-contact-title");
    const descriptionInput = document.getElementById("main-contact-description");
    const buttonInput = document.getElementById("main-contact-button");
    const buttonLinkInput = document.getElementById("main-contact-buttonLink");

    const saveButton = document.getElementById("save-button");
    const resetButton = document.getElementById("reset-button");
    const status = document.getElementById("webeditor-status");

    let originalData = null;

    function setStatus(message, type = "") {

        status.textContent = message;

        status.classList.remove(
            "success",
            "error",
            "warning"
        );

        if (type) {
            status.classList.add(type);
        }
    }

    function getData() {

        return {
            "main-contact-title": titleInput.value.trim(),
            "main-contact-description": descriptionInput.value.trim(),
            "main-contact-button": buttonInput.value.trim(),
            "main-contact-buttonLink": buttonLinkInput.value.trim()
        };
    }

    function setData(data) {

        titleInput.value =
            data["main-contact-title"] ?? "";

        descriptionInput.value =
            data["main-contact-description"] ?? "";

        buttonInput.value =
            data["main-contact-button"] ?? "";

        buttonLinkInput.value =
            data["main-contact-buttonLink"] ?? "";
    }

    function hasEmptyFields(data) {

        return Object.values(data).some(
            value => !value
        );
    }

    function isValidData(data) {

        const requiredFields = [
            "main-contact-title",
            "main-contact-description",
            "main-contact-button",
            "main-contact-buttonLink"
        ];

        return requiredFields.every(
            field =>
                Object.prototype.hasOwnProperty.call(data, field) &&
                typeof data[field] === "string"
        );
    }

    async function loadData() {

        setStatus("Loading contact data...");

        try {

            const response = await fetch(
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

            const data = await response.json();

            if (!data || typeof data !== "object" || Array.isArray(data)) {
                throw new Error(
                    "Invalid JSON data."
                );
            }

            if (!isValidData(data)) {
                throw new Error(
                    "Required contact fields are missing."
                );
            }

            originalData = {
                "main-contact-title": data["main-contact-title"],
                "main-contact-description": data["main-contact-description"],
                "main-contact-button": data["main-contact-button"],
                "main-contact-buttonLink": data["main-contact-buttonLink"]
            };

            setData(originalData);

            setStatus(
                "Contact data loaded.",
                "success"
            );

        } catch (error) {

            console.error(
                "Failed to load contact data:",
                error
            );

            titleInput.value = "";
            descriptionInput.value = "";
            buttonInput.value = "";
            buttonLinkInput.value = "";

            originalData = null;

            setStatus(
                "Unable to load contact data.",
                "error"
            );
        }
    }

    function saveData() {

        if (!originalData) {

            setStatus(
                "Contact data has not been loaded.",
                "error"
            );

            return;
        }

        const data = getData();

        if (hasEmptyFields(data)) {

            setStatus(
                "Please complete all fields before saving.",
                "error"
            );

            return;
        }

        /*
         * Temporary local save.
         *
         * Replace this with the authenticated backend
         * API when the backend is connected.
         */

        localStorage.setItem(
            "np-contact-main",
            JSON.stringify(data)
        );

        originalData = {
            ...data
        };

        setStatus(
            "Changes saved.",
            "success"
        );
    }

    function resetData() {

        if (!originalData) {

            setStatus(
                "Contact data has not been loaded.",
                "error"
            );

            return;
        }

        const confirmed = confirm(
            "Reset all changes to the last loaded values?"
        );

        if (!confirmed) {
            return;
        }

        setData(originalData);

        setStatus(
            "Changes reset.",
            "warning"
        );
    }

    titleInput.addEventListener(
        "input",
        () => setStatus("Unsaved changes.", "warning")
    );

    descriptionInput.addEventListener(
        "input",
        () => setStatus("Unsaved changes.", "warning")
    );

    buttonInput.addEventListener(
        "input",
        () => setStatus("Unsaved changes.", "warning")
    );

    buttonLinkInput.addEventListener(
        "input",
        () => setStatus("Unsaved changes.", "warning")
    );

    saveButton.addEventListener(
        "click",
        saveData
    );

    resetButton.addEventListener(
        "click",
        resetData
    );

    await loadData();

});