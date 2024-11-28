const navElement = document.querySelector("nav");
const activeElement = document.createElement("div");
activeElement.classList.add("active-element");

const getOffsetLeft = (element) => {
    const elementRect = element.getBoundingClientRect();

    return (
        elementRect.left - navElement.getBoundingClientRect().left + (elementRect.width - activeElement.offsetwidth) / 2
    );
};

navElement.appendChild(activeElement);
const activeButton = navElement.querySelector("a.active");
gsap.set(activeElement, {
    x : getOffsetLeft(activeButton),
});
gsap.to(activeElement, {
    "--active-element-show" : "1",
    duration: 0.2,
});

navElement.querySelectorAll("a").forEach((link, index) => {
    link.addEventListener("click", () => {
        const active = navElement.querySelector("a.active");
        const oldIndex = [...active.parentElement.children].indexOf(active);

        if (
            index === oldIndex ||
            navElement.classList.contains("before") ||
            navElement.classList.contains("after")
        ) {return}
    })
})