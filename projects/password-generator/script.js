const generate = document.getElementById("generate");
generate.addEventListener("click", () => {
    const length = document.getElementById("length").value;
    const hasUpper = document.getElementById("uppercase").checked;
    const hasLower = document.getElementById("lowercase").checked;
    const hasSymbol = document.getElementById("symbols").checked;
    const hasNumber = document.getElementById("numbers").checked;
    document.getElementById("passwordResult").value = generatePassword(length, hasUpper, hasLower, hasSymbol, hasNumber);
});

function generatePassword(length, hasUpper, hasLower, hasSymbol, hasNumber) {
    let generatedPassword = "";
    const typesCount = hasUpper + hasLower + hasNumber + hasSymbol;
    const typesArray = [{ hasUpper }, { hasLower }, { hasNumber }, { hasSymbol }].filter(item => Object.values(item)[0]);

    for (let i = 0; i < length; i += typesCount) {
        typesArray.forEach(type => {
            const functionName = Object.keys(type)[0];
            generatedPassword += randomFunction[functionName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

let clipboard = document.getElementById("clipboard");
clipboard.addEventListener("click", () => {
    const result = document.getElementById("passwordResult");
    result.select();
    document.execCommand("copy");
});

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = "!@#$%^&*()_+{}[]|;:,.<>?/";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFunction = {
    hasLower: getRandomLower,
    hasUpper: getRandomUpper,
    hasNumber: getRandomNumber,
    hasSymbol: getRandomSymbol,
};

