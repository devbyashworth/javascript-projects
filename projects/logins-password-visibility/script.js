const input = document.getElementById("password");

const togglePassword = button => {
    button.classList.toggle("showing");
    input.type = input.type === "password" ? "text" : "password";
}