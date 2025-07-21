const input = document.querySelector(".input-group .input");
const icon = document.querySelector(".input-group button i");
const button = document.querySelector(".input-group button");

button.addEventListener("click", () => {
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  icon.className = isPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
});
