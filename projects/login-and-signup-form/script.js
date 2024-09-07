const backLayer = document.querySelector(".back-layer");
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");

document.querySelector(".login button").addEventListener("click", () => {
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
    backLayer.style.clipPath = "";
});

document.querySelector(".signup button").addEventListener("click", () => {
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
    backLayer.style.clipPath = "inset(0 0 0 50%)";
});
