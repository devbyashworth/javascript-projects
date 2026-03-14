const nav = document.querySelector(".sidebar nav");
const buttons = document.querySelectorAll(".sidebar .menu button");
buttons[0].classList.add("active");

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    nav.style.setProperty("--top", `${index === 0 ? 0 : index * 56}px`);
  });
});
