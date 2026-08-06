// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// --------------------- main-team.js -------------------------
// ------------------------------------------------------------

fetch("js/team.json")
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

    director.innerHTML = `

            <img class="main-team-image" src="${team.director.image}" alt="${team.director.name}">

            <div class="main-team-info">
                <h3>${team.director.name}</h3>
                <h4>${team.director.role}</h4>

                <ul>
                    ${team.director.qualifications
                    .map(q => `<li>${q}</li>`)
                    .join("")}
                </ul>
            </div>

    `;


    grid.innerHTML = team.employees.map(member => `

        <div class="main-team-card">

            <img class="main-team-image" src="${member.image}" alt="${member.name}">

            <div class="main-team-info">
                <h3>${member.name}</h3>
                <h4>${member.role}</h4>

                <ul>
                    ${member.qualifications
                    .map(q => `<li>${q}</li>`)
                    .join("")}
                </ul>

            </div>
        </div>

    `).join("");

})
.catch(error => {
    console.error("Team loading error:", error);
});