// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ------------------- main-about-anim.js ---------------------
// ------------------------------------------------------------


const aboutSection = document.querySelector(".main-about");

if (aboutSection) {
    const aboutObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add("animate");
                    aboutObserver.unobserve(aboutSection);
                }
            });
        },
        { threshold:0.25 }
    );
    aboutObserver.observe(aboutSection);
}