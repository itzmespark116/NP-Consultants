// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ------------------- main-projects-anim.js ---------------------
// ------------------------------------------------------------


const projectsSection = document.querySelector(".main-projects");

if (projectsSection) {
    const projectsObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    projectsSection.classList.add("main-projects-animate");
                    projectsObserver.unobserve(projectsSection);
                }
            });
        },
        { threshold: 0.25 }
    );
    projectsObserver.observe(projectsSection);
}