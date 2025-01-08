const words = ["Designer", "Developer", "Freelancer", "Software Engineering"];
const typer = document.querySelector(".dynamic-txts");

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const typingEffect = async () => {
    const sleepTime = 100;

    while (true) {
        for (const word of words) {
            for (let i = 0; i < word.length; i++) {
                typer.textContent = word.substring(0, i + 1);
                await sleep(sleepTime);
            }
            await sleep(500);
        }
    }
}

typingEffect();
