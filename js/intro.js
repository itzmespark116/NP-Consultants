// ------------------------------------------------------------
// -------------------- NP Consultants ------------------------
// ----------------------- intro.js ---------------------------
// ------------------------------------------------------------

window.addEventListener("load",()=>{
    document.body.classList.add("intro-active");
    setTimeout(()=>{
        document.body.classList.remove("intro-active");
        document.querySelector(".intro").remove();
    },1500);
});