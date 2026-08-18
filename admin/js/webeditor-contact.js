document.addEventListener("DOMContentLoaded", async () => {

    const JSON_PATH = "../../../data/contact.json";

    const form = document.getElementById("contact-form");
    const formFields = document.getElementById("form-fields");
    const footerNavigation = document.getElementById("footer-navigation");

    const footerTitle = document.getElementById("footer-title");
    const footerSubtitle = document.getElementById("footer-subtitle");
    const footerCopyright = document.getElementById("footer-copyright");

    const addFieldButton = document.getElementById("add-field-button");
    const saveButton = document.getElementById("save-button");
    const resetButton = document.getElementById("reset-button");
    const status = document.getElementById("webeditor-status");

    let data = null;
    let originalData = null;

    const inputTypes = [
        "button",
        "checkbox",
        "color",
        "date",
        "datetime-local",
        "email",
        "file",
        "hidden",
        "image",
        "month",
        "number",
        "password",
        "radio",
        "range",
        "reset",
        "search",
        "submit",
        "tel",
        "text",
        "time",
        "url",
        "week"
    ];

    try {

        const response =
            await fetch(`${JSON_PATH}?t=${Date.now()}`);

        if (!response.ok) {
            throw new Error("Failed to load contact.json");
        }

        data = await response.json();

        if (!Array.isArray(data.fields)) {
            data.fields = [];
        }

        originalData = structuredClone(data);

        loadForm();
        loadFooter();

    } catch (error) {

        console.error(error);

        status.textContent =
            "Unable to load contact data.";

        status.className =
            "webeditor-status error";

    }

    function loadForm() {

        formFields.innerHTML = "";

        data.fields.forEach((field, index) => {

            createFormField(
                field,
                index
            );

        });

    }

    function createFormField(
        field = {},
        index = null
    ) {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "form-field";

        if (index !== null) {
            wrapper.dataset.index =
                index;
        }

        const type =
            field.type || "input";

        const inputType =
            field.inputType || "text";

        const required =
            Boolean(field.required);

        wrapper.innerHTML = `

            <div class="form-field-header">

                <div class="form-field-title">
                    ${escapeHTML(
                        field.label ||
                        field.name ||
                        "New Field"
                    )}
                </div>

                <div class="form-field-header-actions">

                    <div class="form-field-type">
                        ${escapeHTML(type)}
                    </div>

                    <button
                        type="button"
                        class="form-field-remove"
                    >
                        Remove
                    </button>

                </div>

            </div>

            <div class="field">

                <label>
                    Field Name
                </label>

                <input
                    type="text"
                    class="field-name"
                    value="${escapeAttribute(field.name || "")}"
                    autocomplete="off"
                    placeholder="e.g. email"
                >

            </div>

            <div class="field">

                <label>
                    Label
                </label>

                <input
                    type="text"
                    class="field-label"
                    value="${escapeAttribute(field.label || "")}"
                    autocomplete="off"
                    placeholder="e.g. Email Address"
                >

            </div>

            <div class="field">

                <label>
                    Type
                </label>

                <div class="field-options">

                    <button
                        type="button"
                        class="field-option ${type === "input" ? "active" : ""}"
                        data-value="input"
                    >
                        Input
                    </button>

                    <button
                        type="button"
                        class="field-option ${type === "textarea" ? "active" : ""}"
                        data-value="textarea"
                    >
                        Textarea
                    </button>

                </div>

            </div>

            <div class="field input-type-field">

                <label>
                    Input Type
                </label>

                <div class="input-type-options">

                    ${inputTypes.map(input => `

                        <button
                            type="button"
                            class="input-type-option ${inputType === input ? "active" : ""}"
                            data-value="${escapeAttribute(input)}"
                        >
                            ${escapeHTML(input)}
                        </button>

                    `).join("")}

                </div>

            </div>

            <div class="field">

                <label>
                    Maximum Length
                </label>

                <input
                    type="number"
                    class="field-maxlength"
                    value="${field.maxlength ?? ""}"
                    min="1"
                    placeholder="Optional"
                >

            </div>

            <div class="field">

                <label>
                    Required
                </label>

                <div class="field-options">

                    <button
                        type="button"
                        class="field-option ${required ? "active" : ""}"
                        data-value="true"
                    >
                        Yes
                    </button>

                    <button
                        type="button"
                        class="field-option ${!required ? "active" : ""}"
                        data-value="false"
                    >
                        No
                    </button>

                </div>

            </div>

        `;

        formFields.appendChild(wrapper);

        setupFieldButtons(wrapper);

        updateInputTypeVisibility(wrapper);

        const nameInput =
            wrapper.querySelector(".field-name");

        const labelInput =
            wrapper.querySelector(".field-label");

        const title =
            wrapper.querySelector(".form-field-title");

        const updateTitle = () => {

            title.textContent =
                labelInput.value.trim() ||
                nameInput.value.trim() ||
                "New Field";

        };

        nameInput.addEventListener(
            "input",
            updateTitle
        );

        labelInput.addEventListener(
            "input",
            updateTitle
        );

    }

    function setupFieldButtons(wrapper) {

        const typeOptions =
            wrapper.querySelectorAll(
                ".field-options"
            );

        typeOptions.forEach(
            (options, groupIndex) => {

                options
                    .querySelectorAll(".field-option")
                    .forEach(button => {

                        button.addEventListener(
                            "click",
                            () => {

                                options
                                    .querySelectorAll(
                                        ".field-option"
                                    )
                                    .forEach(item => {
                                        item.classList.remove(
                                            "active"
                                        );
                                    });

                                button.classList.add(
                                    "active"
                                );

                                if (groupIndex === 0) {

                                    wrapper
                                        .querySelector(
                                            ".form-field-type"
                                        )
                                        .textContent =
                                        button.dataset.value;

                                    updateInputTypeVisibility(
                                        wrapper
                                    );

                                }

                            }
                        );

                    });

            }
        );

        wrapper
            .querySelectorAll(
                ".input-type-option"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        wrapper
                            .querySelectorAll(
                                ".input-type-option"
                            )
                            .forEach(item => {
                                item.classList.remove(
                                    "active"
                                );
                            });

                        button.classList.add(
                            "active"
                        );

                    }
                );

            });

        wrapper
            .querySelector(
                ".form-field-remove"
            )
            .addEventListener(
                "click",
                () => {

                    const confirmed =
                        confirm(
                            "Remove this form field?"
                        );

                    if (!confirmed) {
                        return;
                    }

                    wrapper.remove();

                }
            );

    }

    function updateInputTypeVisibility(
        wrapper
    ) {

        const typeButton =
            wrapper
                .querySelector(
                    ".field-options"
                )
                .querySelector(
                    ".field-option.active"
                );

        const inputTypeField =
            wrapper.querySelector(
                ".input-type-field"
            );

        if (
            !typeButton ||
            !inputTypeField
        ) {
            return;
        }

        if (
            typeButton.dataset.value ===
            "input"
        ) {

            inputTypeField.classList.remove(
                "hidden"
            );

        } else {

            inputTypeField.classList.add(
                "hidden"
            );

        }

    }

    addFieldButton.addEventListener(
        "click",
        () => {

            createFormField({
                name:"",
                type:"input",
                inputType:"text",
                label:"",
                required:false
            });

            const fields =
                formFields.querySelectorAll(
                    ".form-field"
                );

            const newField =
                fields[fields.length - 1];

            newField
                .querySelector(
                    ".field-name"
                )
                ?.focus();

            newField.scrollIntoView({
                behavior:"smooth",
                block:"center"
            });

        }
    );

    function loadFooter() {

        const footer =
            data.footer || {};

        footerTitle.value =
            footer.title || "";

        footerSubtitle.value =
            footer.subtitle || "";

        footerCopyright.value =
            footer.copyright || "";

        renderNavigation();

    }

    function renderNavigation() {

        footerNavigation.innerHTML = "";

        (
            data.footer?.navigation ||
            []
        ).forEach(item => {

            createNavigationItem(
                item.label || "",
                item.url || ""
            );

        });

        addNavigationButton();

    }

    function createNavigationItem(
        label = "",
        url = ""
    ) {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "footer-navigation-item";

        wrapper.innerHTML = `

            <input
                type="text"
                class="navigation-label"
                value="${escapeAttribute(label)}"
                placeholder="Label"
                autocomplete="off"
            >

            <input
                type="text"
                class="navigation-url"
                value="${escapeAttribute(url)}"
                placeholder="URL"
                autocomplete="off"
            >

            <button
                type="button"
                class="navigation-remove"
            >
                Remove
            </button>

        `;

        wrapper
            .querySelector(
                ".navigation-remove"
            )
            .addEventListener(
                "click",
                () => {
                    wrapper.remove();
                }
            );

        footerNavigation.appendChild(
            wrapper
        );

    }

    function addNavigationButton() {

        const addButton =
            document.createElement("button");

        addButton.type =
            "button";

        addButton.className =
            "navigation-add";

        addButton.textContent =
            "+ Add Navigation";

        addButton.addEventListener(
            "click",
            () => {

                createNavigationItem();

                footerNavigation.appendChild(
                    addButton
                );

            }
        );

        footerNavigation.appendChild(
            addButton
        );

    }

    function collectData() {

        const fields = [];

        formFields
            .querySelectorAll(
                ".form-field"
            )
            .forEach(element => {

                const optionGroups =
                    element.querySelectorAll(
                        ".field-options"
                    );

                const type =
                    optionGroups[0]
                        ?.querySelector(
                            ".field-option.active"
                        )
                        ?.dataset.value ||
                    "input";

                const required =
                    optionGroups[1]
                        ?.querySelector(
                            ".field-option.active"
                        )
                        ?.dataset.value ===
                    "true";

                const inputType =
                    element
                        .querySelector(
                            ".input-type-option.active"
                        )
                        ?.dataset.value ||
                    "text";

                const field = {

                    name:
                        element
                            .querySelector(
                                ".field-name"
                            )
                            .value
                            .trim(),

                    type,

                    inputType,

                    label:
                        element
                            .querySelector(
                                ".field-label"
                            )
                            .value
                            .trim(),

                    required

                };

                const maxlength =
                    element
                        .querySelector(
                            ".field-maxlength"
                        )
                        .value;

                if (maxlength) {

                    field.maxlength =
                        Number(maxlength);

                }

                fields.push(field);

            });

        const navigation = [];

        footerNavigation
            .querySelectorAll(
                ".footer-navigation-item"
            )
            .forEach(element => {

                navigation.push({

                    label:
                        element
                            .querySelector(
                                ".navigation-label"
                            )
                            .value
                            .trim(),

                    url:
                        element
                            .querySelector(
                                ".navigation-url"
                            )
                            .value
                            .trim()

                });

            });

        return {

            ...data,

            fields,

            footer: {

                title:
                    footerTitle.value.trim(),

                subtitle:
                    footerSubtitle.value.trim(),

                navigation,

                copyright:
                    footerCopyright.value.trim()

            }

        };

    }

    saveButton.addEventListener(
        "click",
        async () => {

            if (!data) {
                return;
            }

            data =
                collectData();

            console.log(
                "Data ready to save:",
                data
            );

            status.textContent =
                "Changes prepared. Backend save endpoint required.";

            status.className =
                "webeditor-status success";

        }
    );

    resetButton.addEventListener(
        "click",
        () => {

            if (!originalData) {
                return;
            }

            data =
                structuredClone(
                    originalData
                );

            loadForm();
            loadFooter();

            status.textContent =
                "Changes reset.";

            status.className =
                "webeditor-status success";

        }
    );

    form.addEventListener(
        "submit",
        event => {
            event.preventDefault();
        }
    );

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&","&amp;")
            .replaceAll("<","&lt;")
            .replaceAll(">","&gt;")
            .replaceAll('"',"&quot;")
            .replaceAll("'","&#039;");

    }

    function escapeAttribute(value) {

        return escapeHTML(value);

    }

});