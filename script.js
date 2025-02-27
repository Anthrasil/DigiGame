let Aero = document.querySelector("#Aero");
setInterval(() => {
    let width = window.innerWidth / 2;
    Aero.style.width = width + "px";
    let height = window.innerHeight / 2;
    Aero.style.height = height + "px";
}, 1)
Aero.addEventListener("click", () => {
    alert("Moin Leute Trymax hier");
});
