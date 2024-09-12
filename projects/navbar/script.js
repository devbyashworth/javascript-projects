document.addEventListener("DOMContentLoaded", () => {
    const setProgressBarWidth = () => {
        const position = window.scrollY;
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progressBar = (position / height) * width;
        document.getElementById("progress").style.width = progressBar + "px"
    };

    window.addEventListener("scroll", setProgressBarWidth);
    setProgressBarWidth();
});

const scrollers = document.querySelectorAll(".scroller");

const addAnimation = () => {
    scrollers.forEach(scroller => {        
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerInnerContent = Array.from(scrollerInner.children);

        scrollerInnerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

addAnimation();

const words = ["Ashworth Sakara"];
const typer = document.querySelector(".dynamic-txts");

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const typingEffect = async () => {
    const sleepTime = 100;
    let currentWordIndex = 0;

    while (true) {
        currentWord = words[currentWordIndex];

        for (let i = 0; i < currentWord.length; i++) {
            typer.textContent = currentWord.substring(0, i + 1);
            await sleep(sleepTime);            
        }

        await sleep(500);

        if(currentWordIndex >= words.length - 1) {
            currentWordIndex = 0;
            await sleep(1000);
        } else currentWordIndex++;
    }
}

typingEffect();
