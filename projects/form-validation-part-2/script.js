const form = document.getElementById("form");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("password2");

const showErrorMessage = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = "input-group error";
    const small = formControl.querySelector("small");
    small.innerText = message;
    setTimeout(() => {
        formControl.className = "input-group error";
    }, 500);
}

const showSuccessMessage = (input) => {
    const formControl = input.parentElement;
    formControl.className = "input-group success";
}

const checkEmailValidity = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value)) {
        showSuccessMessage(input);
    } else {
        showErrorMessage(input, "Email is not valid");
    }
}

const checkRequiredFields = (inputArray) => {
    inputArray.forEach( input => {
        if (input.value.trim() === "") {
            showErrorMessage(input, `${getFieldName(input)} is required`);
        } else {
            showSuccessMessage(input);
        }
    });
}

const checkInputLength = (input, min, max) => {
    if (input.value.length < min) {
        showErrorMessage(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showErrorMessage(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccessMessage(input);
    }
}

const checkUsername = (input) => {
    const username = /^[0-9a-zA-Z]+$/;
    if (!username.test(input.value)) {
        showErrorMessage(input, "Username can only contain letters or numbers");
    }
}

const checkPasswordMatch = (input1, input2) => {
    if (input1.value !== input2.value) {
        showErrorMessage(input2, "Password does not match");
    }
}

const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    checkRequiredFields([username, email, password, confirmPassword]);
    checkInputLength(username, 3, 15);
    checkInputLength(password, 6, 25);
    checkInputLength(confirmPassword, 6, 25);
    checkEmailValidity(email);
    checkPasswordMatch(password, confirmPassword);
    checkUsername(username);
});