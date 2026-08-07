// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ------------------- main-team-anim.js ----------------------
// ------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const teamSection = document.querySelector(".main-team");

    if (!teamSection) {
        console.warn("Team section not found");
        return;
    }

    const teamObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                teamSection.classList.add("main-team-animate");
                teamObserver.unobserve(teamSection);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: "0px 0px -100px 0px"
    });

    teamObserver.observe(teamSection);
});