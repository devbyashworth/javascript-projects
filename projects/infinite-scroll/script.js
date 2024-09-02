const rootStyles = document.querySelector(":root");

const handleWindowResize = () => {
    const scrollSectionWidth = document.querySelector(".scroll-section").clientWidth;
    rootStyles.style.setProperty(
        "--scroll-section-width", `${scrollSectionWidth}px`
    );
}

handleWindowResize();
window.addEventListener("resize", handleWindowResize);
