const previousDisplay = document.querySelector(".previous-display");
const currentDisplay = document.querySelector(".current-display");
const operands = document.querySelectorAll(".operation");
const numbers = document.querySelectorAll(".number");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equal");

let operation;

const appendNumber = (number) => {
    if (number === "." && currentDisplay.innerText.includes(".")) return;
    currentDisplay.innerText += number;
}

const chooseOperation = (operand) => {
    if (currentDisplay.innerText === "") return;
    compute();
    operation = operand;
    previousDisplay.innerText = currentDisplay.innerText + operand;
    currentDisplay.innerText = "";
}

const clearDisplay = () => {
    currentDisplay.innerText = "";
    previousDisplay.innerText = "";
}

const compute = () => {
    let result;
    const currentValue = parseFloat(currentDisplay.innerText);
    const previousValue = parseFloat(previousDisplay.innerText);

    if (isNaN(previousValue) || isNaN(currentValue) || !operation) return;

    switch (operation) {
        case "+":
            result = previousValue + currentValue;
            break;
        case "-":
            result = previousValue - currentValue;
            break;
        case "*":
            result = previousValue * currentValue;
            break;
        case "/":
            result = previousValue / currentValue;
            break;
        default:
            console.error("Invalid operation");
            return;
    }
    currentDisplay.innerText = result;
    operation = undefined;
}

numbers.forEach(number => {
    number.addEventListener("click", () => {
        appendNumber(number.innerText);
    });
});

operands.forEach(operand => {
    operand.addEventListener("click", () => {
        chooseOperation(operand.innerText);
    });
});

clearBtn.addEventListener("click", () => {
    clearDisplay();
});

deleteBtn.addEventListener("click", () => {
    currentDisplay.innerText = currentDisplay.innerText.slice(0, -1);
});

equalBtn.addEventListener("click", () => {
    compute();
    previousDisplay.innerText = "";
});
