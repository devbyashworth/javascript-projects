const slides = document.querySelectorAll("[data-slide]");
const buttons = document.querySelectorAll("[data-button]");

let currentSlide = 0;
let nextSlide = slides.length - 1;

const updateCarousel = (number = 0) => {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - number) * 100}%)`;
    });
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        currentSlide = button.dataset.button === "next" ? ++currentSlide : --currentSlide;

        if (currentSlide > nextSlide) {
            currentSlide = 0;
        } else if (currentSlide < 0) {
            currentSlide = nextSlide;
       }
        updateCarousel(currentSlide);
    });
});

updateCarousel();