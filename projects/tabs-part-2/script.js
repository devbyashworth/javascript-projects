const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

const adjustHeight = () => {
    contents.forEach(content => {
        const computedStyle = window.getComputedStyle(content);
        const topValue = parseInt(computedStyle.getPropertyValue("top"));
        if (topValue === 0) {
            const height = content.offsetHeight;
            content.style.height = `${height}px`;
        }
    });
};

const handleClick = (evt) => {
    tabs.forEach((tab, idx) => {
        const isActiveTab = evt.target === tab;
        tab.id = isActiveTab ? "active" : "";
        contents[idx].classList.toggle("reveal-content", isActiveTab);
    });
    adjustHeight();
};

tabs.forEach(tab => tab.addEventListener("click", handleClick));
window.addEventListener("load", adjustHeight);
window.addEventListener("resize", adjustHeight);
