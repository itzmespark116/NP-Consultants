// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ------------------- main-team-anim.js ----------------------
// ------------------------------------------------------------

const teamSection = document.querySelector(".main-team");

if (teamSection) {
    const teamObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    teamSection.classList.add("main-team-animate");
                    teamObserver.unobserve(teamSection);
                }
            });
        },
        { threshold:0.25 }
    );
    teamObserver.observe(teamSection);
}