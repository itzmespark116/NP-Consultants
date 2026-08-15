/* ------------------------------------------------------------ */
/* -------------------- NP Consultants ------------------------ */
/* ------------ admin-webeditor-panel-editor.js --------------- */
/* ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector(".beam-container");

    if (!container) return;

    let angle = 0;
    let speed = 42;
    let targetSpeed = 42;

    const idleSpeed = 42;
    const hoverSpeed = 240;

    let last = performance.now();

    function animate(now) {

        const dt = Math.min(
            (now - last) / 1000,
            0.05
        );

        last = now;

        const acceleration =
            30 * (targetSpeed - speed);

        speed += acceleration * dt;

        angle += speed * dt;

        container.style.setProperty(
            "--beam-angle",
            `${angle % 360}deg`
        );

        requestAnimationFrame(animate);
    }

    container.addEventListener("pointerenter", () => {
        targetSpeed = hoverSpeed;
    });

    container.addEventListener("pointerleave", () => {
        targetSpeed = idleSpeed;
    });

    container.addEventListener("focusin", () => {
        targetSpeed = hoverSpeed;
    });

    container.addEventListener("focusout", () => {
        targetSpeed = idleSpeed;
    });

    requestAnimationFrame(animate);
});