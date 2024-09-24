const button = document.querySelector("button");
const inputs = document.querySelectorAll("input");

window.addEventListener("load", () => inputs[0].focus());
inputs.forEach(input => {
    input.addEventListener("input", () => {
        const currentInput = input;
        const nextInput = input.nextElementSibling;

        if (currentInput.value.length > 1 && currentInput.value.length == 2) {
            currentInput.value = "";
        }

        if (nextInput !== null && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
            nextInput.removeAttribute("disabled");
            nextInput.focus();
        }

        if (!inputs[3].disabled && inputs[3].value !== "") {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    input.addEventListener("keyup", evt => {
        if (evt.key === "Backspace") {
            if (input.previousElementSibling !== null) {
                evt.target.value = "";
                evt.target.setAttribute("disabled", true);
                input.previousElementSibling.focus();
            }
        }
    });
});
