const sidebar = document.querySelector(".sidebar");
const nav = document.querySelector(".sidebar nav");
const buttons = document.querySelectorAll(".sidebar nav button");

function toggleSidebar() {
  sidebar.classList.toggle("open");
}

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    nav.style.setProperty("--top", `${index * 56}px`);
  });
});
