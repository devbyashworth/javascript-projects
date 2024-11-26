console.clear();

let root = document.querySelector(":root");

const spotlight = (evt) => {
    root.style.setProperty("--x", `${evt.pageX}px`);
    root.style.setProperty("--y", `${evt.pageY}px`);
};

window.addEventListener("pointermove", spotlight);
window.addEventListener("pointerdown", spotlight);
