const card = document.querySelector(".card");
const heroTitle = document.getElementById("hero-title");
const heroText = document.getElementById("hero-text");
const heroButton = document.querySelector(".hero-content button");

function toggleView() {
  card.classList.toggle("signup-active");

  const isSignup = card.classList.contains("signup-active");

  if (isSignup) {
    heroTitle.textContent = "Hey There!";
    heroText.textContent =
      "Begin your journey using this software and start earning now.";
    heroButton.textContent = "SIGN UP";
  } else {
    heroTitle.textContent = "Welcome Back!";
    heroText.textContent =
      "Sign in to review your latest profit for investment";
    heroButton.textContent = "SIGN IN";
  }
}
