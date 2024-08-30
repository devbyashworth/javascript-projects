const bgColorButton = document.querySelector(".new-color");

const generateRandomValue = () => Math.floor(Math.random() * 256);

const generateBackgroundColor = () => {
    const red = generateRandomValue();
    const green = generateRandomValue();
    const blue = generateRandomValue();
    return `rgb(${red}, ${green}, ${blue})`;
}

const changeBackgroundColor = () => {
    document.body.style.backgroundColor = generateBackgroundColor();
}

bgColorButton.addEventListener("click", changeBackgroundColor);
// bgColorButton.addEventListener("click", () => console.log("background color changed"));

// Initial background color change on page load
changeBackgroundColor();
