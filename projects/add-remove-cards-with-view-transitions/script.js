const cards = document.querySelector(".cards");
const addButton = document.querySelector(".add-btn");

cards.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("delete-btn")) {
        if (!document.startViewTransition) {
            evt.target.parentElement.remove();
            return;
        }

        evt.target.style.viewTransitionName = "target-card";
        document.startViewTransition(() => {
            evt.target.parentElement.remove();
        });
    }
});

addButton.addEventListener("click", async (evt) => {
    const template = document.querySelector("#card-template");
    const newCard = template.content.cloneNode(true);

    if (!document.startViewTransition) {
        document.querySelector(".cards").appendChild(newCard);
        return;
    }

    const cardElement = newCard.querySelector('.card');
    cardElement.style.viewTransitionName = "targeted-card";
    cardElement.style.backgroundColor = `#${Math.floor(
        Math.random() * 16777215
    ).toString(16)}`;

    const transition = document.startViewTransition(() => {
        document.querySelector(".cards").appendChild(newCard);
    });

    await transition.finished;

    const rand = window.performance.now().toString().replace(".", "_") + Math.floor(Math.random() * 1000);
    cardElement.style.viewTransitionName = `card-${rand}`;
});
