const bgColorButton = document.querySelector(".new-color");

const generateRandomValue = () => Math.floor(Math.random() * 256);

const generateHexValue = (value) => value.toString(16).padStart(2, '0');

const generateBackgroundColor = () => {
    const red = generateRandomValue();
    const green = generateRandomValue();
    const blue = generateRandomValue();
    return `#${generateHexValue(red)}${generateHexValue(green)}${generateHexValue(blue)}`;
};

const changeBackgroundColor = () => {
    document.body.style.backgroundColor = generateBackgroundColor();
};

bgColorButton.addEventListener("click", changeBackgroundColor);
// bgColorButton.addEventListener("click", () => console.log("background color changed"));

// Initial background color change on page load
changeBackgroundColor();
