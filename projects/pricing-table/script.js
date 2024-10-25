const cards = document.querySelectorAll(".pricing-card");
cards.forEach(item => {
    item.addEventListener("mouseover", () => {
        cards.forEach(card => card.classList.remove("active"));
        item.classList.add("active");
    });
    item.addEventListener("mouseout", () => {
        item.classList.remove("active");
    });
});
