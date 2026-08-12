// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ------------------ main-banner-print.js --------------------
// ------------------------------------------------------------

fetch("data/main-banner.json")
    .then(response => response.json())
    .then(data => {
        document.querySelector(".banner").innerHTML = `
            <video class="banner-video" autoplay muted loop playsinline preload="metadata" poster="${data["main-banner-poster"]}" oncontextmenu="return false;">
                <source src="${data["main-banner-video"]}" type="video/mp4">
            </video>
            <div class="banner-overlay"></div>
            <div class="banner-overlay-fade"></div>
            <div class="banner-content">
                <h2>${data["main-banner-subtitle"]}</h2>
                <h1>${data["main-banner-title"]}</h1>
                <p>${data["main-banner-description"]}</p>
                <button onclick="location.href='${data["main-banner-buttonLink"]}'">${data["main-banner-button"]}</button>
            </div>
        `;
    });