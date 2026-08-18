document.addEventListener("DOMContentLoaded", async () => {

    const JSON_PATH = "../../../data/contact.json";

    const infoGrid = document.getElementById("info-grid");
    const addInfoButton = document.getElementById("add-info-button");

    const mapLink = document.getElementById("map-link");
    const mapLatitude = document.getElementById("map-latitude");
    const mapLongitude = document.getElementById("map-longitude");
    const mapZoom = document.getElementById("map-zoom");
    const mapPlace = document.getElementById("map-place");
    const mapPreview = document.getElementById("map-preview");
    const mapStatus = document.getElementById("map-status");

    const saveButton = document.getElementById("save-button");
    const resetButton = document.getElementById("reset-button");
    const convertMapButton = document.getElementById("convert-map");
    const status = document.getElementById("webeditor-status");

    let data = null;
    let originalData = null;

    try {
        const response = await fetch(`${JSON_PATH}?t=${Date.now()}`);

        if (!response.ok) {
            throw new Error("Failed to load contact.json");
        }

        data = await response.json();
        originalData = structuredClone(data);

        loadData();
    } catch (error) {
        console.error(error);
        setStatus("Unable to load contact information.", "error");
    }

    function loadData() {
        renderInfo();

        const map = data.map || {};

        mapLatitude.value = map.latitude ?? "";
        mapLongitude.value = map.longitude ?? "";
        mapZoom.value = map.zoom ?? 17;
        mapPlace.value = map.place || "";

        updateMapPreview();
    }

    function renderInfo() {
        infoGrid.innerHTML = "";

        (data.info || []).forEach((item, index) => {
            const card = document.createElement("div");

            card.className = "info-card";

            card.innerHTML = `
                <button type="button" class="info-remove" title="Remove">×</button>
                <div class="info-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="${escapeAttribute(item.icon || "")}"></path>
                    </svg>
                </div>
                <div class="info-content">
                    <div class="info-card-title">Contact Item ${index + 1}</div>
                    <input type="text" class="info-icon-path" value="${escapeAttribute(item.icon || "")}" placeholder="SVG icon path" autocomplete="off">
                    <input type="text" class="info-title" value="${escapeAttribute(item.title || "")}" placeholder="Title" autocomplete="off">
                    <input type="text" class="info-text" value="${escapeAttribute(item.text || "")}" placeholder="Text" autocomplete="off">
                    <input type="text" class="info-action" value="${escapeAttribute(item.action || "")}" placeholder="Action / Link" autocomplete="off">
                </div>
            `;

            card.querySelector(".info-remove").addEventListener("click", () => {
                data.info.splice(index, 1);
                renderInfo();
            });

            const iconInput = card.querySelector(".info-icon-path");
            const iconPath = card.querySelector(".info-icon path");

            iconInput.addEventListener("input", () => {
                iconPath.setAttribute("d", iconInput.value);
            });

            infoGrid.appendChild(card);
        });
    }

    addInfoButton.addEventListener("click", () => {
        data.info.push({
            icon:"",
            title:"",
            text:"",
            action:""
        });

        renderInfo();

        const cards = infoGrid.querySelectorAll(".info-card");
        cards[cards.length - 1]?.scrollIntoView({
            behavior:"smooth",
            block:"center"
        });
    });

    convertMapButton.addEventListener("click", () => {
        const coordinates = extractCoordinates(mapLink.value.trim());

        if (!coordinates) {
            setMapStatus("Could not find coordinates in this link.", "error");
            return;
        }

        mapLatitude.value = coordinates.latitude;
        mapLongitude.value = coordinates.longitude;

        updateMapPreview();
        setMapStatus("Coordinates converted successfully.", "success");
    });

    mapLink.addEventListener("paste", () => {
        setTimeout(() => {
            const coordinates = extractCoordinates(mapLink.value.trim());

            if (!coordinates) return;

            mapLatitude.value = coordinates.latitude;
            mapLongitude.value = coordinates.longitude;

            updateMapPreview();
            setMapStatus("Coordinates converted.", "success");
        }, 50);
    });

    mapLatitude.addEventListener("input", updateMapPreview);
    mapLongitude.addEventListener("input", updateMapPreview);
    mapZoom.addEventListener("input", updateMapPreview);

    function extractCoordinates(url) {
        if (!url) return null;

        let text;

        try {
            text = decodeURIComponent(url);
        } catch {
            text = url;
        }

        let match = text.match(/@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/);

        if (match) {
            return {
                latitude:Number(match[1]),
                longitude:Number(match[2])
            };
        }

        match = text.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);

        if (match) {
            return {
                latitude:Number(match[1]),
                longitude:Number(match[2])
            };
        }

        match = text.match(/(?:q|query|ll)=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/);

        if (match) {
            return {
                latitude:Number(match[1]),
                longitude:Number(match[2])
            };
        }

        return null;
    }

    function updateMapPreview() {
        const latitude = Number(mapLatitude.value);
        const longitude = Number(mapLongitude.value);
        const zoom = Number(mapZoom.value) || 17;

        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            mapPreview.removeAttribute("src");
            return;
        }

        mapPreview.src = `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;
    }

    saveButton.addEventListener("click", () => {
        collectData();
        setStatus("Changes prepared.", "success");
    });

    resetButton.addEventListener("click", () => {
        if (!originalData) return;

        data = structuredClone(originalData);
        loadData();
        setStatus("Changes reset.", "success");
    });

    function collectData() {
        const cards = infoGrid.querySelectorAll(".info-card");

        data.info = [...cards].map(card => ({
            icon:card.querySelector(".info-icon-path").value.trim(),
            title:card.querySelector(".info-title").value.trim(),
            text:card.querySelector(".info-text").value.trim(),
            action:card.querySelector(".info-action").value.trim()
        }));

        data.map = {
            latitude:Number(mapLatitude.value),
            longitude:Number(mapLongitude.value),
            zoom:Number(mapZoom.value),
            place:mapPlace.value.trim()
        };
    }

    function setMapStatus(message, type = "") {
        mapStatus.textContent = message;
        mapStatus.className = "map-status";

        if (type) {
            mapStatus.classList.add(type);
        }
    }

    function setStatus(message, type = "") {
        status.textContent = message;
        status.className = "webeditor-status";

        if (type) {
            status.classList.add(type);
        }
    }

    function escapeAttribute(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll('"', "&quot;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll("'", "&#039;");
    }

});