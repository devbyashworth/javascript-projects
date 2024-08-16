const contents = document.querySelectorAll(".content");

contents.forEach((content, index) => {
    const header = content.querySelector("header");
    const description = content.querySelector(".description");
    const icon = header.querySelector("i");

    header.addEventListener("click", () => {
        const isOpen = content.classList.toggle("open");
        if (isOpen) {
            description.style.height = `${description.scrollHeight}px`;
            icon.classList.replace("fa-plus", "fa-minus");
            closeOther(index);
        } else {
            description.style.height = "0";
            icon.classList.replace("fa-minus", "fa-plus");
        }
    });
});

function closeOther(index) {
    contents.forEach((content, i) => {
        if (i !== index && content.classList.contains("open")) {
            const description = content.querySelector(".description");
            const icon = content.querySelector("i");
            content.classList.remove("open");
            description.style.height = "0";
            icon.classList.replace("fa-minus", "fa-plus");
        }
    });
}