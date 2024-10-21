const eyeIcon = document.querySelector(".password-field i");
const passwordInput = document.querySelector(".password-input");
const requirementList = document.querySelectorAll(".requirement-list li");

const requirements = [
    {regex : /.{8,}/, index: 0},
    {regex : /[0-9]/, index: 1},
    {regex : /[^A-Za-z0-9]/, index: 2},
    {regex : /[a-z]/, index: 3},
    {regex : /[A-Z]/, index: 4},
];

passwordInput.addEventListener("keyup", (evt) => {
    requirements.forEach(item => {
        const isValid = item.regex.test(evt.target.value);
        const requirementItem = requirementList[item.index];

        if (isValid) {
            requirementItem.classList.add("valid");
            requirementItem.firstElementChild.className = "fa-solid fa-check";
        } else {
            requirementItem.classList.remove("valid");
            requirementItem.firstElementChild.className = "fa-solid fa-circle";
        }
    });
});

eyeIcon.addEventListener("click", () => {
    passwordInput.type = passwordInput.type === "password";
    eyeIcon.className = `fa-solid fa-eye${passwordInput.type === "password" ? "" : "-slash"}`
});