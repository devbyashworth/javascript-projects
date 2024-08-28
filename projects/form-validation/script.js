const form = document.getElementById("myForm");
const passwordInput = document.getElementById("password");

const showError = (field, errorText) => {
    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".field").appendChild(errorElement);
}

const checkPasswordStrength = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&^&*]).{8,}$/.test(password);

const validatePassword = (password) => {
    if (password === "") {
        showError(passwordInput, "Enter your password");
    } else if (!checkPasswordStrength(password)) {
        showError(passwordInput, "Password must contain at least 8 characters with an uppercase letter and a special character.");
    }
}

const handleFormData = (evt) => {
    evt.preventDefault();
    const [fullnameInput, emailInput, dateInput, genderInput] = ["fullname", "email", "birth-date", "gender"].map((id) => document.getElementById(id));

    const [fullname, email, password, date, gender] = [fullnameInput, emailInput, passwordInput, dateInput, genderInput].map((input) => input.value.trim());
    
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    
    document.querySelectorAll(".field .error").forEach((field) => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach((errorText) => errorText.remove());
    
    if (fullname === "") showError(fullnameInput, "Enter your full name");
    if (!emailPattern.test(email)) showError(emailInput, "Enter a valid email address");
    validatePassword(password);
    
    if (date === "") showError(dateInput, "Select your date of birth");
    if (gender === "") showError(genderInput, "Select your gender");
    
    if (!document.querySelectorAll(".field .error").length) {
        form.style.display = "none";
    }
}

form.addEventListener("submit", handleFormData);