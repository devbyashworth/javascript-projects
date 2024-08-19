const animatedText = document.querySelectorAll(".animated-text");

let interval;
const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const changeTextLetters = (evt) => {
    let iteration = 0;

    const initialText = evt.target.innerText;
    clearInterval(interval);

    interval = setInterval(() => {
        evt.target.innerText = initialText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return evt.target.dataset.text[index];
                }
                return alphabets[Math.floor(Math.random() * 26)];
            })
            .join("");
        if (iteration >= evt.target.dataset.text.length) {
            clearInterval(interval);
        }

        iteration += 1 / 10;
    }, 50);
};

animatedText.forEach((text) => {
    text.addEventListener("mouseover", (evt) => {
        changeTextLetters(evt);
    });
});
