fetch("data/contact.json")
    .then(response => response.json())
    .then(data => {
        const map = document.querySelector(".contact-map-container");
        const location = data.map;
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=${location.zoom}&output=embed`;
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.style.border = "0";
        iframe.allowFullscreen = true;
        iframe.loading = "lazy";
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        map.appendChild(iframe);
    })
    .catch(error => console.error("Failed to load map:", error));