document.addEventListener("DOMContentLoaded", () => {
    const cardArr = [
        { name: "Bleach Aizen", img: "./images/img_1.jpg" },
        { name: "Black Clover Asta", img: "./images/img_2.jpg" },
        { name: "Bleach 13 Court Guard Squad", img: "./images/img_3.jpg" },
        { name: "Attack on Titan Eren Yeager", img: "./images/img_4.jpg" },
        { name: "Tokyo Revengers", img: "./images/img_5.jpg" },
        { name: "Naruto", img: "./images/img_6.jpg" },
        { name: "Jujutsu Kaisen Sukuna", img: "./images/img_7.jpg" },
        { name: "Naruto Itachi Uchiha", img: "./images/img_8.jpg" },
        { name: "Demon Slayer", img: "./images/img_9.jpg" },
        // { name: "Solo Leveling", img: "./images/img_10.jpg" },
        { name: "Tokyo Ghoul", img: "./images/img_11.jpg" },
    ];

    // Duplicate cards to make pairs
    const gameCards = [...cardArr, ...cardArr];

    gameCards.sort(() => 0.5 - Math.random());

    const resultDisplay = document.getElementById("result");
    const grid = document.querySelector(".grid");

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    // Create a Create Board 
    function createBoard() {
        for (let i = 0; i < gameCards.length; i++) {
            const card = document.createElement("img");
            card.setAttribute("src", "./images/Blank.png");
            card.setAttribute("data-id", i);
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
        }
    }

    // Check for Matches 
    function checkMatch() {
        const cards = document.querySelectorAll("img");
        const [optionOneId, optionTwoId] = cardsChosenId;

        if (optionOneId == optionTwoId) {
            alert("You clicked the same card!");
            cards[optionOneId].setAttribute("src", "./images/Blank.png");
        } else if (cardsChosen[0] === cardsChosen[1]) {
            alert("You found a match!");
            cards[optionOneId].setAttribute("src", "./images/White.png");
            cards[optionTwoId].setAttribute("src", "./images/White.png");
            cards[optionOneId].removeEventListener("click", flipCard);
            cards[optionTwoId].removeEventListener("click", flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute("src", "./images/Blank.png");
            cards[optionTwoId].setAttribute("src", "./images/Blank.png");
            alert("Try again!");
        }

        cardsChosen = [];
        cardsChosenId = [];

        resultDisplay.textContent = cardsWon.length;

        if (cardsWon.length === gameCards.length / 2) {
            resultDisplay.textContent = "Congratulations! You found them all!";
        }
    }

    // On Click Flip the Card  
    function flipCard() {
        const cardId = this.getAttribute("data-id");
        cardsChosen.push(gameCards[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute("src", gameCards[cardId].img);

        if (cardsChosen.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    createBoard();
});
