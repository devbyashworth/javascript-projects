const navBar = document.querySelector(".navbar");
let previousScrollPosition = window.scrollY;

window.addEventListener("scroll", () => {
    let currentScrollPosition = window.scrollY;

    if(currentScrollPosition > previousScrollPosition) {
        navBar.style.transform = `translateY(-105%)`;
    } else {
        navBar.style.transform = `translateY(0%)`
    }

    previousScrollPosition = currentScrollPosition;
});
