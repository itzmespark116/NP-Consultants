document.addEventListener("DOMContentLoaded", async () => {

    const JSON_PATH = "../../../data/team.json";
    const PLACEHOLDER = "../../../img/placeholder-profile.jpg";

    const grid = document.getElementById("team-grid");
    const employeeEditor = document.getElementById("employee-editor");

    const directorName = document.getElementById("director-name");
    const directorRole = document.getElementById("director-role");
    const directorImage = document.getElementById("director-image");
    const directorQualifications = document.getElementById("director-qualifications");

    const employeeName = document.getElementById("employee-name");
    const employeeRole = document.getElementById("employee-role");
    const employeeImage = document.getElementById("employee-image");
    const employeeQualifications = document.getElementById("employee-qualifications");

    const employeeImageUpload = document.getElementById("employee-image-upload");
    const employeeImageName = document.getElementById("employee-image-name");

    const addEmployeeButton = document.getElementById("add-employee-button");
    const removeEmployeeButton = document.getElementById("remove-employee-button");

    const status = document.getElementById("webeditor-status");
    const resetButton = document.getElementById("reset-button");
    const saveButton = document.getElementById("save-button");

    let data = null;
    let originalData = null;
    let selectedEmployee = null;

    try {

        const response = await fetch(`${JSON_PATH}?t=${Date.now()}`);

        if (!response.ok) {
            throw new Error("Failed to load team.json");
        }

        data = await response.json();

        if (!Array.isArray(data.employees)) {
            data.employees = [];
        }

        originalData = structuredClone(data);

        loadDirector();
        loadEmployees();

    } catch (error) {

        console.error(error);

        status.textContent = "Unable to load team data.";
        status.classList.add("error");

    }

    function imagePath(path) {

        if (!path || !String(path).trim()) {
            return PLACEHOLDER;
        }

        return String(path).startsWith("http")
            ? path
            : `../../../${path}`;

    }

    function loadDirector() {

        const director = data.director || {};

        directorName.value = director.name || "";
        directorRole.value = director.role || "";

        directorImage.src = imagePath(director.image);

        directorImage.onerror = () => {
            directorImage.onerror = null;
            directorImage.src = PLACEHOLDER;
        };

        renderDirectorQualifications(
            directorQualifications,
            director.qualifications || []
        );

    }

    function renderDirectorQualifications(container, qualifications) {

        container.innerHTML = "";

        qualifications.forEach((qualification) => {

            const row = document.createElement("div");

            row.className = "qualification-item";

            const input = document.createElement("input");

            input.type = "text";
            input.value = qualification;
            input.readOnly = true;
            input.autocomplete = "off";

            row.appendChild(input);
            container.appendChild(row);

        });

    }

    function loadEmployees() {

        grid.innerHTML = "";

        data.employees.forEach((employee, index) => {

            const card = document.createElement("div");

            card.className = "team-card";

            if (selectedEmployee === index) {
                card.classList.add("selected");
            }

            card.innerHTML = `
                <img
                    class="team-card-image"
                    src="${escapeAttribute(imagePath(employee.image))}"
                    alt="${escapeAttribute(employee.name || "Employee")}"
                >

                <div class="team-card-info">
                    <div class="team-card-name">
                        ${escapeHTML(employee.name || "New Employee")}
                    </div>

                    <div class="team-card-role">
                        ${escapeHTML(employee.role || "No role")}
                    </div>
                </div>

                <div class="team-card-edit">
                    Edit
                </div>
            `;

            const image = card.querySelector(".team-card-image");

            image.onerror = () => {
                image.onerror = null;
                image.src = PLACEHOLDER;
            };

            card.addEventListener("click", () => {
                selectEmployee(index);
            });

            grid.appendChild(card);

        });

    }

    function selectEmployee(index) {

        if (!data.employees[index]) {
            return;
        }

        selectedEmployee = index;

        const employee = data.employees[index];

        employeeName.value = employee.name || "";
        employeeRole.value = employee.role || "";

        employeeImage.src = imagePath(employee.image);

        employeeImage.onerror = () => {
            employeeImage.onerror = null;
            employeeImage.src = PLACEHOLDER;
        };

        employeeImageName.textContent =
            employee.image || "No image";

        renderQualifications(
            employeeQualifications,
            employee.qualifications || []
        );

        loadEmployees();

        employeeEditor.hidden = false;

        employeeEditor.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

    function renderQualifications(container, qualifications) {

        container.innerHTML = "";

        qualifications.forEach((qualification) => {

            addQualification(
                container,
                qualification
            );

        });

        addQualificationButton(container);

    }

    function addQualification(container, value = "") {

        const row = document.createElement("div");

        row.className = "qualification-item";

        row.innerHTML = `
            <input
                type="text"
                value="${escapeAttribute(value)}"
                autocomplete="off"
                placeholder="Qualification"
            >

            <button
                type="button"
                class="qualification-remove"
            >
                ×
            </button>
        `;

        row
            .querySelector(".qualification-remove")
            .addEventListener("click", () => {
                row.remove();
            });

        container.appendChild(row);

    }

    function addQualificationButton(container) {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "qualification-add";
        button.textContent = "+ Add Qualification";

        button.addEventListener("click", () => {

            addQualification(container, "");

            const inputs =
                container.querySelectorAll(".qualification-item input");

            inputs[inputs.length - 1]?.focus();

        });

        container.appendChild(button);

    }

    function getQualifications(container) {

        return Array.from(
            container.querySelectorAll(".qualification-item input")
        )
        .map(input => input.value.trim())
        .filter(Boolean);

    }

    function updateSelectedEmployee() {

        if (
            selectedEmployee === null ||
            !data.employees[selectedEmployee]
        ) {
            return;
        }

        const employee = data.employees[selectedEmployee];

        employee.name = employeeName.value.trim();
        employee.role = employeeRole.value.trim();

        employee.qualifications =
            getQualifications(employeeQualifications);

    }

    employeeName.addEventListener("input", () => {

        updateSelectedEmployee();

        loadEmployees();

    });

    employeeRole.addEventListener("input", () => {

        updateSelectedEmployee();

        loadEmployees();

    });

    employeeImageUpload.addEventListener("change", () => {

        const file = employeeImageUpload.files[0];

        if (!file || selectedEmployee === null) {
            return;
        }

        data.employees[selectedEmployee].image =
            file.name;

        employeeImageName.textContent =
            file.name;

        employeeImage.src =
            URL.createObjectURL(file);

        loadEmployees();

    });

    addEmployeeButton.addEventListener("click", () => {

        if (!data) {
            return;
        }

        const newEmployee = {
            name: "New Employee",
            role: "Employee",
            image: "",
            qualifications: []
        };

        data.employees.push(newEmployee);

        selectedEmployee =
            data.employees.length - 1;

        loadEmployees();
        selectEmployee(selectedEmployee);

        status.textContent = "New employee added.";
        status.className = "webeditor-status";

    });

    removeEmployeeButton.addEventListener("click", () => {

        if (
            selectedEmployee === null ||
            !data.employees[selectedEmployee]
        ) {
            return;
        }

        const employee =
            data.employees[selectedEmployee];

        const confirmed = confirm(
            `Remove "${employee.name || "this employee"}"?`
        );

        if (!confirmed) {
            return;
        }

        data.employees.splice(
            selectedEmployee,
            1
        );

        selectedEmployee = null;

        employeeEditor.hidden = true;

        employeeImageUpload.value = "";

        employeeImage.src = PLACEHOLDER;

        employeeImageName.textContent =
            "No image";

        loadEmployees();

        status.textContent = "Employee removed.";
        status.className = "webeditor-status";

    });

    resetButton.addEventListener("click", () => {

        if (!originalData) {
            return;
        }

        data = structuredClone(originalData);

        selectedEmployee = null;

        employeeEditor.hidden = true;

        employeeImageUpload.value = "";

        employeeImage.src = PLACEHOLDER;

        employeeImageName.textContent =
            "No image";

        loadDirector();
        loadEmployees();

        status.textContent = "Changes reset.";
        status.className = "webeditor-status";

    });

    saveButton.addEventListener("click", () => {

        updateSelectedEmployee();

        console.log("Data ready to save:", data);

        status.textContent =
            "Changes prepared. Connect this button to your backend to save team.json.";

        status.className =
            "webeditor-status success";

    });

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }

    function escapeAttribute(value) {

        return escapeHTML(value);

    }

});