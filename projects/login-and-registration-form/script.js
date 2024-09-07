document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const signUpLink = document.querySelector(".signUp-link");
    const signInLink = document.querySelector(".signIn-link");

    signUpLink.addEventListener("click", () => {
        container.classList.add("animate-signIn");
        container.classList.remove("animate-signUp");
    });

    signInLink.addEventListener("click", () => {
        container.classList.add("animate-signUp");
        container.classList.remove("animate-signIn");
    });
});
