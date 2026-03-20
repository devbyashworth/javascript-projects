const card = document.querySelector(".card");
const signinForm = document.querySelector(".form.signin");
const signupForm = document.querySelector(".form.signup");
const cardBg1 = document.querySelector(".card-bg-1");
const cardBg2 = document.querySelector(".card-bg-2");

const toggleView = () => {
  const isSignin = card.classList.contains("signin-mode");

  // Toggle card mode (controls logo)
  card.classList.toggle("signin-mode", !isSignin);
  card.classList.toggle("signup-mode", isSignin);

  // Toggle forms
  signinForm.classList.toggle("active", !isSignin);
  signupForm.classList.toggle("active", isSignin);

  // Toggle background animation classes
  [cardBg1, cardBg2].forEach((bg) => {
    bg.classList.toggle("signin", isSignin);
    bg.classList.toggle("signup", !isSignin);
  });
};

document.querySelectorAll(".toggle-form").forEach((button) => {
  button.addEventListener("click", toggleView);
});
