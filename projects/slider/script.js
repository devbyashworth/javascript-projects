document.addEventListener("DOMContentLoaded", function () {
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const slide = document.querySelector(".slide");

    prev.addEventListener("click", () => {
        const items = slide.querySelectorAll(".item");
        slide.prepend(items[items.length - 1]);
    });

    next.addEventListener("click", () => {
        const items = slide.querySelectorAll(".item");
        slide.appendChild(items[0]);
    });
});
