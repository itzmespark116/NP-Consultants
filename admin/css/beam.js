const container = document.querySelector(".beam-container");

let angle = 0;

function animate() {
    angle += 0.5;

    container.style.setProperty(
        "--beam-angle",
        `${angle % 360}deg`
    );

    requestAnimationFrame(animate);
}

animate();