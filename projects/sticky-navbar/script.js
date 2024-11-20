const nav = document.querySelector(".tabs-container");

const offset = nav.offsetTop;

window.addEventListener("scroll", () => {
    if(window.scrollY > offset) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
});