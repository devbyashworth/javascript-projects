const sidebar = document.getElementById("sidebar");
const burger = document.getElementById("burger");
const icon = document.getElementById("burgerIcon");
const buttons = document.querySelectorAll("nav button");

let isOpen = false;

// Set first button active
buttons[0].classList.add("active");

// Toggle sidebar
burger.addEventListener("click", () => {
  isOpen = !isOpen;
  sidebar.classList.toggle("open");
  icon.textContent = isOpen ? "close" : "menu";
});

// CLICK EVENT
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});
