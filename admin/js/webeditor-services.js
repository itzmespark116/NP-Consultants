/* ------------------------------------------------------------ */
/* -------------------- NP Consultants ------------------------ */
/* ---------------- webeditor-services.js --------------------- */
/* ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", async () => {

    const DATA_PATH = "../../../data/services.json";

    const servicesList = document.getElementById("services-list");
    const addServiceButton = document.getElementById("add-service-button");
    const saveButton = document.getElementById("save-button");
    const resetButton = document.getElementById("reset-button");
    const status = document.getElementById("webeditor-status");

    let originalData = null;
    let currentData = null;

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

    function createEmptyService() {

        return {
            "services-title": "",
            "services-paragraphs": [
                ""
            ],
            "services-list": []
        };
    }

    function createField(
        label,
        key,
        value = "",
        textarea = false,
        placeholder = ""
    ) {

        const field = document.createElement("div");

        field.className = "field";

        if (textarea) {
            field.classList.add("full");
        }

        const labelElement = document.createElement("label");

        labelElement.textContent = label;

        const input = textarea
            ? document.createElement("textarea")
            : document.createElement("input");

        input.value = value ?? "";
        input.dataset.key = key;

        if (placeholder) {
            input.placeholder = placeholder;
        }

        if (textarea) {
            input.rows = 4;
        } else {
            input.type = "text";
            input.autocomplete = "off";
        }

        const fieldKey = document.createElement("div");

        fieldKey.className = "field-key";
        fieldKey.textContent = key;

        field.appendChild(labelElement);
        field.appendChild(input);
        field.appendChild(fieldKey);

        return {
            field,
            input
        };
    }

    function renderServices(data) {

        servicesList.innerHTML = "";

        data.services.forEach(
            (service, serviceIndex) => {

                const element = document.createElement("section");

                element.className = "service-element";

                const header = document.createElement("div");

                header.className = "service-header";

                const headerInfo = document.createElement("div");

                const number = document.createElement("div");

                number.className = "service-number";
                number.textContent =
                    `SERVICE ${String(serviceIndex + 1).padStart(2, "0")}`;

                const name = document.createElement("div");

                name.className = "service-name";

                name.textContent =
                    service["services-title"] ||
                    `Service ${serviceIndex + 1}`;

                const description = document.createElement("div");

                description.className = "service-description";
                description.textContent =
                    "Edit the service title, paragraphs and service list.";

                headerInfo.appendChild(number);
                headerInfo.appendChild(name);
                headerInfo.appendChild(description);

                const removeButton = document.createElement("button");

                removeButton.type = "button";
                removeButton.className = "remove-service-button";
                removeButton.textContent = "Remove Service";

                removeButton.addEventListener(
                    "click",
                    () => {

                        const confirmed = confirm(
                            `Remove "${service["services-title"] || "this service"}"?`
                        );

                        if (!confirmed) {
                            return;
                        }

                        data.services.splice(
                            serviceIndex,
                            1
                        );

                        renderServices(data);

                        setStatus(
                            "Service removed. Unsaved changes.",
                            "warning"
                        );
                    }
                );

                header.appendChild(headerInfo);
                header.appendChild(removeButton);

                element.appendChild(header);

                const fields = document.createElement("div");

                fields.className = "element-fields";

                const title = createField(
                    "Service Title",
                    "services-title",
                    service["services-title"],
                    false,
                    "STRUCTURAL DESIGNING"
                );

                title.input.addEventListener(
                    "input",
                    () => {

                        service["services-title"] =
                            title.input.value;

                        name.textContent =
                            title.input.value ||
                            `Service ${serviceIndex + 1}`;

                        setStatus(
                            "Unsaved changes.",
                            "warning"
                        );
                    }
                );

                fields.appendChild(title.field);

                const paragraphsSection =
                    document.createElement("div");

                paragraphsSection.className = "subsection";

                const paragraphsHeader =
                    document.createElement("div");

                paragraphsHeader.className =
                    "subsection-header";

                const paragraphsTitle =
                    document.createElement("div");

                paragraphsTitle.className =
                    "subsection-title";

                paragraphsTitle.textContent =
                    "Paragraphs";

                const addParagraphButton =
                    document.createElement("button");

                addParagraphButton.type = "button";
                addParagraphButton.className =
                    "add-item-button";

                addParagraphButton.textContent =
                    "Add Paragraph";

                paragraphsHeader.appendChild(
                    paragraphsTitle
                );

                paragraphsHeader.appendChild(
                    addParagraphButton
                );

                const paragraphList =
                    document.createElement("div");

                paragraphList.className =
                    "item-list";

                function renderParagraphs() {

                    paragraphList.innerHTML = "";

                    service["services-paragraphs"]
                        .forEach(
                            (paragraph, paragraphIndex) => {

                                const row =
                                    document.createElement("div");

                                row.className = "item-row";

                                const textarea =
                                    document.createElement("textarea");

                                textarea.rows = 4;
                                textarea.value =
                                    paragraph ?? "";

                                textarea.placeholder =
                                    "Enter service paragraph...";

                                textarea.addEventListener(
                                    "input",
                                    () => {

                                        service[
                                            "services-paragraphs"
                                        ][paragraphIndex] =
                                            textarea.value;

                                        setStatus(
                                            "Unsaved changes.",
                                            "warning"
                                        );
                                    }
                                );

                                const remove =
                                    document.createElement("button");

                                remove.type = "button";
                                remove.className =
                                    "remove-item-button";

                                remove.textContent =
                                    "Remove";

                                remove.addEventListener(
                                    "click",
                                    () => {

                                        service[
                                            "services-paragraphs"
                                        ].splice(
                                            paragraphIndex,
                                            1
                                        );

                                        renderParagraphs();

                                        setStatus(
                                            "Paragraph removed. Unsaved changes.",
                                            "warning"
                                        );
                                    }
                                );

                                row.appendChild(textarea);
                                row.appendChild(remove);

                                paragraphList.appendChild(row);
                            }
                        );
                }

                addParagraphButton.addEventListener(
                    "click",
                    () => {

                        service[
                            "services-paragraphs"
                        ].push("");

                        renderParagraphs();

                        setStatus(
                            "Paragraph added. Unsaved changes.",
                            "warning"
                        );
                    }
                );

                paragraphsSection.appendChild(
                    paragraphsHeader
                );

                paragraphsSection.appendChild(
                    paragraphList
                );

                fields.appendChild(
                    paragraphsSection
                );

                renderParagraphs();

                const listSection =
                    document.createElement("div");

                listSection.className = "subsection";

                const listHeader =
                    document.createElement("div");

                listHeader.className =
                    "subsection-header";

                const listTitle =
                    document.createElement("div");

                listTitle.className =
                    "subsection-title";

                listTitle.textContent =
                    "Service List";

                const addListButton =
                    document.createElement("button");

                addListButton.type = "button";
                addListButton.className =
                    "add-item-button";

                addListButton.textContent =
                    "Add Item";

                listHeader.appendChild(
                    listTitle
                );

                listHeader.appendChild(
                    addListButton
                );

                const list =
                    document.createElement("div");

                list.className = "item-list";

                function renderList() {

                    list.innerHTML = "";

                    service["services-list"]
                        .forEach(
                            (item, itemIndex) => {

                                const row =
                                    document.createElement("div");

                                row.className =
                                    "item-row";

                                const input =
                                    document.createElement("input");

                                input.type = "text";
                                input.autocomplete = "off";
                                input.value =
                                    item ?? "";

                                input.placeholder =
                                    "Enter service list item...";

                                input.addEventListener(
                                    "input",
                                    () => {

                                        service[
                                            "services-list"
                                        ][itemIndex] =
                                            input.value;

                                        setStatus(
                                            "Unsaved changes.",
                                            "warning"
                                        );
                                    }
                                );

                                const remove =
                                    document.createElement("button");

                                remove.type = "button";
                                remove.className =
                                    "remove-item-button";

                                remove.textContent =
                                    "Remove";

                                remove.addEventListener(
                                    "click",
                                    () => {

                                        service[
                                            "services-list"
                                        ].splice(
                                            itemIndex,
                                            1
                                        );

                                        renderList();

                                        setStatus(
                                            "List item removed. Unsaved changes.",
                                            "warning"
                                        );
                                    }
                                );

                                row.appendChild(input);
                                row.appendChild(remove);

                                list.appendChild(row);
                            }
                        );
                }

                addListButton.addEventListener(
                    "click",
                    () => {

                        service["services-list"].push("");

                        renderList();

                        setStatus(
                            "List item added. Unsaved changes.",
                            "warning"
                        );
                    }
                );

                listSection.appendChild(
                    listHeader
                );

                listSection.appendChild(
                    list
                );

                fields.appendChild(
                    listSection
                );

                renderList();

                element.appendChild(fields);

                servicesList.appendChild(element);
            }
        );
    }

    function normaliseData(data) {

        return {
            services: data.services.map(
                service => {

                    const result = {
                        "services-title":
                            typeof service["services-title"] === "string"
                                ? service["services-title"]
                                : "",

                        "services-paragraphs":
                            Array.isArray(
                                service["services-paragraphs"]
                            )
                                ? service["services-paragraphs"].map(
                                    paragraph =>
                                        typeof paragraph === "string"
                                            ? paragraph
                                            : ""
                                )
                                : [],

                        "services-list":
                            Array.isArray(
                                service["services-list"]
                            )
                                ? service["services-list"].map(
                                    item =>
                                        typeof item === "string"
                                            ? item
                                            : ""
                                )
                                : []
                    };

                    return result;
                }
            )
        };
    }

    async function loadData() {

        setStatus(
            "Loading services data..."
        );

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

            if (
                !data ||
                typeof data !== "object" ||
                Array.isArray(data) ||
                !Array.isArray(data.services)
            ) {
                throw new Error(
                    "Invalid services JSON structure."
                );
            }

            currentData =
                normaliseData(data);

            originalData =
                JSON.parse(
                    JSON.stringify(currentData)
                );

            renderServices(currentData);

            setStatus(
                "Services data loaded.",
                "success"
            );

        } catch (error) {

            console.error(
                "Failed to load services data:",
                error
            );

            currentData = {
                services: []
            };

            originalData = null;

            servicesList.innerHTML = "";

            setStatus(
                "Unable to load services data.",
                "error"
            );
        }
    }

    function validateData(data) {

        if (
            !data ||
            !Array.isArray(data.services)
        ) {
            return false;
        }

        for (const service of data.services) {

            if (
                typeof service["services-title"] !== "string" ||
                !Array.isArray(service["services-paragraphs"]) ||
                !Array.isArray(service["services-list"])
            ) {
                return false;
            }

            if (
                !service["services-title"].trim()
            ) {
                return false;
            }

            if (
                service["services-paragraphs"].some(
                    paragraph =>
                        !paragraph.trim()
                )
            ) {
                return false;
            }

            if (
                service["services-list"].some(
                    item =>
                        !item.trim()
                )
            ) {
                return false;
            }
        }

        return true;
    }

    function saveData() {

        if (!originalData) {

            setStatus(
                "Services data has not been loaded.",
                "error"
            );

            return;
        }

        if (!validateData(currentData)) {

            setStatus(
                "Please complete all service fields before saving.",
                "error"
            );

            return;
        }

        localStorage.setItem(
            "np-services",
            JSON.stringify(
                currentData
            )
        );

        originalData =
            JSON.parse(
                JSON.stringify(currentData)
            );

        setStatus(
            "Changes saved.",
            "success"
        );

        console.log(
            "Services data:",
            JSON.stringify(
                currentData,
                null,
                2
            )
        );
    }

    function resetData() {

        if (!originalData) {

            setStatus(
                "Services data has not been loaded.",
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

        currentData =
            JSON.parse(
                JSON.stringify(originalData)
            );

        renderServices(currentData);

        setStatus(
            "Changes reset.",
            "warning"
        );
    }

    addServiceButton.addEventListener(
        "click",
        () => {

            if (!originalData) {

                setStatus(
                    "Services data has not been loaded.",
                    "error"
                );

                return;
            }

            currentData.services.push(
                createEmptyService()
            );

            renderServices(currentData);

            setStatus(
                "Service added. Unsaved changes.",
                "warning"
            );

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
        }
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