
document.addEventListener("DOMContentLoaded", () => {
    const info = document.getElementById("contact-form-info");
    const form = document.getElementById("contact-form-user");
    if (!info || !form) return;
    fetch("../data/contact.json")
        .then(response => response.json())
        .then(data => {
            const groupedInfo = {};
            data.info.forEach(item => {
                if (!groupedInfo[item.title]) {
                    groupedInfo[item.title] = [];
                }
                groupedInfo[item.title].push(item);
            });
            Object.entries(groupedInfo).forEach(([title, items]) => {
                const box = document.createElement("div");
                box.className = "contact-form-info-box";
                const first = items[0];
                box.innerHTML = `
                    <svg class="footer-icon" viewBox="0 0 24 24">
                        <path d="${first.icon}"/>
                    </svg>
                    <h3>${title}</h3>
                    ${items.map(item => `
                        <p data-action="${item.action}">${item.text}</p>
                    `).join("")}
                `;
                box.querySelectorAll("[data-action]").forEach(element => {
                    element.addEventListener("click", () => {
                        const action = element.dataset.action;
                        if (action.startsWith("http")) {
                            window.open(action, "_blank");
                        } else {
                            window.location.href = action;
                        }
                    });
                });
                info.appendChild(box);
            });
            form.innerHTML = `
                <h4>${data.heading}</h4>
            `;
            data.fields.forEach(field => {
                const container = document.createElement("div");
                container.className = field.type === "textarea" ? "contact-form-user-input-large" : "contact-form-user-input";
                const input = document.createElement(field.type === "textarea" ? "textarea" : "input");
                input.name = field.name;
                input.placeholder = " ";
                if (field.type === "input") {
                    input.type = field.inputType;
                }
                if (field.required) {
                    input.required = true;
                }
                if (field.maxlength) {
                    input.maxLength = field.maxlength;
                }
                if (field.autocomplete) {
                    input.autocomplete = field.autocomplete;
                }
                if (field.inputmode) {
                    input.inputMode = field.inputmode;
                }
                if (field.pattern) {
                    input.pattern = field.pattern;
                }
                const label = document.createElement("div");
                label.className = "labelline";
                label.textContent = field.label;
                container.appendChild(input);
                container.appendChild(label);
                form.appendChild(container);
            });
            const button = document.createElement("button");
            button.type = "submit";
            button.textContent = "Submit";
            form.appendChild(button);
        })
        .catch(error => console.error("Failed to load contact form:", error));
});
