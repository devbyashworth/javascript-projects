const menu = document.querySelector("#menu");
const menuButtons = document.querySelectorAll(".menu-btn");

menuButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        menu.classList.toggle("visible");
    });
});

document.addEventListener("click", evt => {
    if (!menu.contains(evt.target) && !menuButtons[0].contains(evt.target)) {
        menu.classList.remove("visible");
    }
});
