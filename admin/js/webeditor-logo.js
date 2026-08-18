document.addEventListener("DOMContentLoaded", () => {

    const darkUpload = document.getElementById("dark-logo-upload");
    const lightUpload = document.getElementById("light-logo-upload");

    const darkPreview = document.getElementById("dark-logo-preview");
    const lightPreview = document.getElementById("light-logo-preview");

    const darkPath = document.getElementById("dark-logo-path");
    const lightPath = document.getElementById("light-logo-path");

    const saveButton = document.getElementById("save-button");
    const resetButton = document.getElementById("reset-button");
    const status = document.getElementById("webeditor-status");

    const original = {
        dark: darkPreview.src,
        light: lightPreview.src
    };

    function previewImage(input, image, path) {

        const file = input.files[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            input.value = "";
            status.textContent = "Please select an image file.";
            status.className = "webeditor-status error";
            return;
        }

        const url = URL.createObjectURL(file);

        image.src = url;
        path.textContent = file.name;

        status.textContent = "";
        status.className = "webeditor-status";

    }

    darkUpload.addEventListener("change", () => {
        previewImage(darkUpload, darkPreview, darkPath);
    });

    lightUpload.addEventListener("change", () => {
        previewImage(lightUpload, lightPreview, lightPath);
    });

    darkPreview.onerror = () => {
        darkPreview.onerror = null;
        darkPreview.src = "../../../img/placeholder-profile.jpg";
    };

    lightPreview.onerror = () => {
        lightPreview.onerror = null;
        lightPreview.src = "../../../img/placeholder-profile.jpg";
    };

    resetButton.addEventListener("click", () => {

        darkUpload.value = "";
        lightUpload.value = "";

        darkPreview.src = original.dark;
        lightPreview.src = original.light;

        darkPath.textContent = "../../../icons/icon_dark.png";
        lightPath.textContent = "../../../icons/icon_light.png";

        status.textContent = "Changes reset.";
        status.className = "webeditor-status success";

    });

    saveButton.addEventListener("click", () => {

        status.textContent =
            "Logo previews updated. Upload handling must be connected to your backend to permanently replace the files.";

        status.className = "webeditor-status success";

    });

});