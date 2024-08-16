let angle = 0;

function gallerySpin(sign) {
    const spinner = document.querySelector("#spinner");
    if (!sign) {
        angle += 45;
    } else {
        angle -= 45;
    }
    spinner.style.transform = `rotateY(${angle}deg)`;
}
