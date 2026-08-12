/* ------------------------------------------------------------ */
/* -------------------- NP Consultants ------------------------ */
/* --------------- admin-login-panel-anim.js ------------------ */
/* ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {

    const panel = document.querySelector(".admin-login-panel");

    if (!panel) return;

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

        speed +=
            (targetSpeed - speed) *
            Math.min(1, 30 * dt);

        angle += speed * dt;

        panel.style.setProperty(
            "--beam-angle",
            `${angle}deg`
        );

        requestAnimationFrame(animate);
    }

    panel.addEventListener("pointerenter", () => {
        targetSpeed = hoverSpeed;
    });

    panel.addEventListener("pointerleave", () => {
        targetSpeed = idleSpeed;
    });

    panel.addEventListener("focusin", () => {
        targetSpeed = hoverSpeed;
    });

    panel.addEventListener("focusout", () => {
        targetSpeed = idleSpeed;
    });

    requestAnimationFrame(animate);

});
