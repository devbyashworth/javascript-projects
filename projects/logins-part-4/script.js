const loginForm = document.querySelector(".login");
const registerForm = document.querySelector(".register");
const toggle = document.querySelector(".toggle");

function toggleView(next) {
  toggle.classList.toggle("login-active", next === "login");

  [loginForm, registerForm].forEach((el) => {
    el.classList.remove("active");
  });

  if (next === "login") {
    loginForm.classList.add("active");
  } else {
    registerForm.classList.add("active");
  }
}
