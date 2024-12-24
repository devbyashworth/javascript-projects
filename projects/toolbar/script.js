document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector(".dropdown-container");
    const button = document.querySelector(".apps-button-container .btn");

    button.addEventListener("click", () => {
        dropdown.classList.toggle("hide");
    });

    document.addEventListener("click", (evt) => {
        if (!dropdown.contains(evt.target) && !button.contains(evt.target)) {
            dropdown.classList.add("hide");
        }
    });
});
