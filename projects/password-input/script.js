const passwordInput = document.querySelector(".input-group input");
const toggleIcon = document.querySelector(".input-group .toggle");
const ripple = document.querySelector(".input-group .ripple");
const percentBar = document.querySelector(".strength-percent span");
const passwordLabel = document.querySelector(".strength-label");

passwordInput.addEventListener("input", handlePasswordInput);
toggleIcon.addEventListener("click", togglePasswordInput);

function handlePasswordInput() {
    if (passwordInput.value.length === 0) {
        passwordLabel.innerHTML = "Strength";
        addClass();
    } else if (passwordInput.value.length <= 4) {
        passwordLabel.innerHTML = "Weak";
        addClass("weak");
    } else if (passwordInput.value.length <= 7) {
        passwordLabel.innerHTML = "Not Bad";
        addClass("average");
    } else {
        passwordLabel.innerHTML = "Strong";
        addClass("strong");
    }
}

function addClass(className) {
    percentBar.classList.remove("weak");
    percentBar.classList.remove("average");
    percentBar.classList.remove("strong");

    if (className) {
        percentBar.classList.add(className);
    }
}

function togglePasswordInput() {
    const type = passwordInput.getAttribute("type");
    if (type === "password") {
        passwordInput.setAttribute("type", "text");
        toggleIcon.innerHTML = "💀";
        ripple.style.cssText = `
            right: 0;
            width: 100%;
            z-index: -1;
            height: 100%;
            border-radius: 4px;
        `;
        passwordInput.style.fontSize = "27px";
        passwordInput.style.color = "#000000";
        passwordInput.style.backgroundColor = "transparent";
    } else {
        passwordInput.setAttribute("type", "password");
        toggleIcon.innerHTML = "☠️";
        toggleIcon.style.fontSize = "25px";
        ripple.style.cssText = `
            z-index: 1;
            right: 10px;
            width: 35px;
            height: 35px;
            border-radius: 50%;
        `;
        passwordInput.style.color = "#fefefe";
        passwordInput.style.backgroundColor = "#112d37";
    }
}
