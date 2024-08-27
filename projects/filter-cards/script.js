// Update your existing JavaScript code
const filterButtons = document.querySelectorAll("#filter-buttons .btn");
const filterableCards = document.querySelectorAll("#filterable-cards .card");
const shuffleButton = document.getElementById("shuffle-button");

const filterCards = (evt) => {
    const activeButton = document.querySelector("#filter-buttons .active");
    activeButton.classList.remove("active");
    evt.target.classList.add("active");

    filterableCards.forEach(card => {
        if (card.dataset.name === evt.target.dataset.filter || evt.target.dataset.filter === "all") {
            card.classList.remove("hide");
        } else {
            card.classList.add("hide");
        }
    });

    rearrangeVisibleCards();
}

const rearrangeVisibleCards = () => {
    const cardsContainer = document.getElementById("filterable-cards");
    const visibleCards = Array.from(filterableCards).filter(card => !card.classList.contains("hide"));

    cardsContainer.innerHTML = ""; // Clear the container

    // Append visible cards followed by blurred cards
    visibleCards.forEach(card => cardsContainer.appendChild(card));
    filterableCards.forEach(card => {
        if (card.classList.contains("hide")) {
            cardsContainer.appendChild(card);
        }
    });
}

const shuffleCards = () => {
    const cardsContainer = document.getElementById("filterable-cards");
    const cardsArray = Array.from(filterableCards);
    shuffleArray(cardsArray);

    cardsArray.forEach(card => {
        card.classList.remove("hide"); // Remove the "hide" class for all cards
    });

    cardsContainer.innerHTML = ""; // Clear the container

    // Append shuffled cards
    cardsArray.forEach(card => cardsContainer.appendChild(card));
}

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

filterButtons.forEach(button => button.addEventListener("click", filterCards));
shuffleButton.addEventListener("click", shuffleCards);
