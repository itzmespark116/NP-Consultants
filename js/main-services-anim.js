// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ----------------- main-services-anim.js --------------------
// ------------------------------------------------------------

const servicesSection = document.querySelector(".main-services");

if (servicesSection) {
    const servicesObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    servicesSection.classList.add("main-services-animate");
                    servicesObserver.unobserve(servicesSection);
                }
            });
        },
        { threshold: 0.25 }
    );
    servicesObserver.observe(servicesSection);
}