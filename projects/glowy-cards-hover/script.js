const overlay = document.querySelector(".overlay");
const cardsContainer = document.querySelector(".cards");
const cards = Array.from(document.querySelectorAll(".card"));
const cardsContainerInner = document.querySelector(".cards-inner");
console.clear();

const applyOverlayMask = (evt) => {
    const overlayElement = evt.currentTarget;
    const x = evt.pageX - cardsContainer.offsetLeft;
    const y = evt.pageY - cardsContainer.offsetTop;
    overlayElement.style = `--opacity: 1; --x: ${x}px; --y: ${y}px;`;
}

const createOverlayBtn = (overlayCard, btnElement) => {
    const overlayBtn = document.createElement("div");
    overlayBtn.classList.add("btn");
    overlayBtn.textContent = btnElement.textContent;
    overlayBtn.setAttribute("aria-hidden", true);
    overlayCard.append(overlayBtn);
}

const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
        const cardIndex = cards.indexOf(entry.target);
        let width = entry.borderBoxSize[0].inlineSize;
        let height = entry.borderBoxSize[0].blockSize;

        if (cardIndex >= 0) {
            overlay.children[cardIndex].style.width = `${width}px`;
            overlay.children[cardIndex].style.height = `${height}px`;
        }
    });
});

const initOverlayCard = (cardElement) => {
    const overlayCard = document.createElement("div");
    overlayCard.classList.add("card");
    createOverlayBtn(overlayCard, cardElement.lastElementChild);
    overlay.append(overlayCard);
    observer.observe(cardElement);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);
