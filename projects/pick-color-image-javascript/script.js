document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("#pick-color");
    const displayColor = document.querySelector(".display-color");

    const pickColor = async () => {
        try {
            const eyeDropper = new EyeDropper();
            const { sRGBHex } = await eyeDropper.open();
            console.log(sRGBHex);
            displayColor.innerText = `Selected Color: ${sRGBHex}`;
            displayColor.style.color = sRGBHex;
        } catch (error) {
            console.error("Error picking color:", error);
        }
    };

    button.addEventListener("click", pickColor);
});
