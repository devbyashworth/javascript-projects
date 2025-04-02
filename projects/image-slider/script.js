const slides = document.querySelectorAll(".slide");
let slideIndex = 0;
let interval = null;

const initializeSlide = () => {
  if (slides.length > 0) {
    slides[slideIndex].classList.add("active");
    interval = setInterval(nextSlide, 5000);
  }
};

const showSlide = (index) => {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === slideIndex);
  });
};

const prevSlide = () => {
  clearInterval(interval);
  slideIndex--;
  showSlide(slideIndex);
  interval = setInterval(nextSlide, 5000);
};

const nextSlide = () => {
  clearInterval(interval);
  slideIndex++;
  showSlide(slideIndex);
  interval = setInterval(nextSlide, 5000);
};

document.addEventListener("DOMContentLoaded", initializeSlide);
