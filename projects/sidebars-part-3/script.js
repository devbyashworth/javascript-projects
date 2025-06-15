const sidebar = document.querySelector(".sidebar");
const toggleButton = document.querySelector(".toggle");
const nav = document.querySelector("nav.menu");
const buttons = document.querySelectorAll("nav button");

// Toggle sidebar open/close
const toggleClick = () => {
  sidebar.classList.toggle("open");
};

// Attach the toggle function to the button
// toggleButton.addEventListener("click", toggleClick);

// Set the first button as active by default
buttons[0].classList.add("active");

// Move the indicator and update active button on click
buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    nav.style.setProperty("--top", `${index * 56}px`);
  });
});
