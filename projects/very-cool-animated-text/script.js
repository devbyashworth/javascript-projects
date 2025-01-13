let isFirefox = typeof InstallTrigger !== 'undefined';
const words = "ashworth sakara";

let ANGLE = 360;
const ANIMATION_DURATION = 4000;

const animation = () => {
    ANGLE -= 1;
    document.querySelectorAll(".spiral *").forEach((element, idx) => {
        
        const translateY = Math.sin(ANGLE * (Math.PI / 120)) * 100;
        const scale = Math.cos(ANGLE * (Math.PI / 120)) * 0.5 + 0.5;
        
        const offset = parseInt(element.dataset.offset);
        const delay = idx * (ANIMATION_DURATION / 15) - offset;

        setTimeout(() => {
            element.style.transform = `translateY(${translateY}px) scale(${scale})`;
        }, delay);
    });

    requestAnimationFrame(animation);
};

const characters = words.split("").forEach((char, idx) => {
    const createElement = (offset) => {
        const div = document.createElement("div");
        div.innerText = char;
        div.classList.add("character");
        div.setAttribute("data-offset", offset);
        div.style.animationDelay = `-${idx * (ANIMATION_DURATION / 15) - offset}ms`
        return div;
    };

    document.querySelector("#spiral-one").append(createElement(0));
    document.querySelector("#spiral-two").append(createElement((isFirefox ? 1 : -1) * (ANIMATION_DURATION / 2)));
});


if(isFirefox) {
    animation();
}

