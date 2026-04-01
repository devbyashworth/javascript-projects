const nav = document.querySelector(".menu");
const sidebar = document.querySelector(".sidebar");
const buttons = document.querySelectorAll(".menu button");

const toggleOpen = () => sidebar.classList.toggle("open");

buttons[0].classList.add("active");

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    nav.style.setProperty("--top", `${index * 56}px`);
  });
});
