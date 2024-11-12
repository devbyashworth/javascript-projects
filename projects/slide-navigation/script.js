document.addEventListener('DOMContentLoaded', () => {
    let delta = 0;
    let currentSlideIndex = 0;
    const scrollThreshold = 40;
    const slides = document.querySelectorAll('.slide');
    const numSlides = slides.length;
    const navPrev = document.querySelector('.js-prev');
    const navNext = document.querySelector('.js-next');

    function handleScroll(evt) {
        if (evt.deltaY < 0) {
            delta--;
            if (Math.abs(delta) >= scrollThreshold) {
                prevSlide();
            }
        } else {
            delta++;
            if (delta >= scrollThreshold) {
                nextSlide();
            }
        }
        evt.preventDefault();
    }

    function showSlide() {
        delta = 0;
        document.body.classList.add('is-sliding');
        slides.forEach((slide, i) => {
            slide.classList.toggle('is-active', i === currentSlideIndex);
            slide.classList.toggle('is-prev', i === currentSlideIndex - 1);
            slide.classList.toggle('is-next', i === currentSlideIndex + 1);
        });
        setTimeout(() => {
            document.body.classList.remove('is-sliding');
        }, 1000);
    }

    function prevSlide() {
        if (currentSlideIndex <= 0) {
            currentSlideIndex = numSlides;
        }
        currentSlideIndex--;
        showSlide();
    }

    function nextSlide() {
        currentSlideIndex++;
        if (currentSlideIndex >= numSlides) {
            currentSlideIndex = 0;
        }
        showSlide();
    }

    slides.forEach(slide => {
        slide.addEventListener('wheel', handleScroll);
    });

    navPrev.addEventListener('click', prevSlide);
    navNext.addEventListener('click', nextSlide);

    document.addEventListener('keyup', (evt) => {
        if (evt.key === 'ArrowLeft' || evt.key === 'ArrowUp') { 
            prevSlide();
        } else if (evt.key === 'ArrowRight' || evt.key === 'ArrowDown') {
            nextSlide();
        }
    });
});
