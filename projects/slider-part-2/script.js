document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    let counter = 0;

    // Set initial positions of slides
    slides.forEach((slide, index) => {
        slide.style.left = `${index * 100}%`;
    });

    // Function to go to the previous slide
    const goPrev = () => {
        counter = (counter - 1 + slides.length) % slides.length;
        slideImage();
    };

    // Function to go to the next slide
    const goNext = () => {
        counter = (counter + 1) % slides.length;
        slideImage();
    };

    // Function to slide images
    const slideImage = () => {
        slides.forEach(slide => {
            slide.style.transform = `translateX(-${counter * 100}%)`;
        });
    };

    // Event listeners for previous and next buttons
    prevBtn.addEventListener("click", goPrev);
    nextBtn.addEventListener("click", goNext);
});
