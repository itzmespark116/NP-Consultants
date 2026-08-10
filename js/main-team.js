// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// --------------------- main-team.js -------------------------
// ------------------------------------------------------------

const PLACEHOLDER_IMAGE = "img/placeholder-profile.jpg";

function imageFallback(src, alt) {
    return `
        <img 
            class="main-team-image"
            src="${src || PLACEHOLDER_IMAGE}"
            alt="${alt}"
            onerror="this.onerror=null;this.src='${PLACEHOLDER_IMAGE}'"
        >
    `;
}

function directorImageFallback(src, alt) {
    return `
        <img 
            class="main-team-dir-image"
            src="${src || PLACEHOLDER_IMAGE}"
            alt="${alt}"
            onerror="this.onerror=null;this.src='${PLACEHOLDER_IMAGE}'"
        >
    `;
}

function buildQualifications(qualifications) {
    return (qualifications || []).map(q => `<li>${q}</li>`).join("");
}

fetch("data/team.json")
.then(res => {
    if (!res.ok) {
        throw new Error("team.json not found");
    }
    return res.json();
})
.then(team => {

    const director = document.querySelector("#teamDirector");
    const grid = document.querySelector("#teamGrid");

    if (!director || !grid) {
        throw new Error("Team containers not found");
    }

    if (team.director) {
        director.innerHTML = `
            ${directorImageFallback(
                team.director.image,
                team.director.name
            )}

            <div class="main-team-dir-info">
                <h3>${team.director.name}</h3>
                <h4>${team.director.role}</h4>

                <ul>
                    ${buildQualifications(team.director.qualifications)}
                </ul>
            </div>
        `;
    }

    grid.innerHTML = (team.employees || []).map(member => `
        <div class="main-team-card">

            ${imageFallback(
                member.image,
                member.name
            )}

            <div class="main-team-info">
                <h3>${member.name}</h3>
                <h4>${member.role}</h4>

                <ul>
                    ${buildQualifications(member.qualifications)}
                </ul>
            </div>

        </div>
    `).join("");

})
.catch(error => {
    console.error("Team loading error:", error);

    const director = document.querySelector("#teamDirector");
    const grid = document.querySelector("#teamGrid");

    if (director) director.innerHTML = "<p>Unable to load team information.</p>";
    if (grid) grid.innerHTML = "";
});