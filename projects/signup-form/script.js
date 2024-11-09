document.addEventListener("DOMContentLoaded", () => {
    const login = document.querySelector(".login");
    const create = document.querySelector(".create");
    const container = document.querySelector(".container");

    login.addEventListener("click", () => {
        container.classList.add("signinForm");
    });

    create.addEventListener("click", () => {
        container.classList.remove("signinForm");
    });
});
