const menuIcon = document.querySelector(".menu-icon");
const mainItem = document.querySelector(".main-item");
const  menuItems = document.querySelectorAll(".menu-item");
const menuContainer = document.querySelector(".menu-container");

const menuToggle = () => {
    menuContainer.classList.toggle("active");
    menuIcon.classList.toggle("active");
}

mainItem.addEventListener("click", menuToggle);

menuItems.forEach(item => {
    item.addEventListener("click", menuToggle)
})