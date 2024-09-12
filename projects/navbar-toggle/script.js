const nav_links = document.getElementById("nav-links");
const toggle_btn = document.getElementById("toggle-nav");

let isNavOpen = false;

toggle_btn.addEventListener("click", () => {
    if (isNavOpen) {
        toggle_btn.innerHTML = '<i class="fas fa-bars"></i>';
        isNavOpen = false;
        nav_links.classList.remove("toggled");
    } else {
        toggle_btn.innerHTML = '<i class="fas fa-times"></i>';
        isNavOpen = true;
        nav_links.classList.add("toggled");
    }
})