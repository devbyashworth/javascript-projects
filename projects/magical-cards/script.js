const container = document.querySelector("#cards");
const cards = Array.from(document.querySelectorAll(".card"));

container.addEventListener("mouseover", evt => {
    for (const card of cards) {
        const rect = card.getBoundingClientRect();
        y = evt.clientY - rect.top;
        x = evt.clientX - rect.left;
        card.style.setProperty("--mouse-y", `${y}px`);
        card.style.setProperty("--mouse-x", `${x}px`);
    }
});
