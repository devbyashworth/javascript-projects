const toggle = document.querySelector(".hamb-menu");
const ul = document.querySelector("ul");

toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    ul.classList.toggle("active");
});

const toggleModal = () => {
    const popup = document.getElementById("popup");
    popup.classList.toggle("active");
};
