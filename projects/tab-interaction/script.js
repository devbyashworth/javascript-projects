const tabs = document.querySelectorAll("[data-id]");
const contents = document.querySelectorAll("[data-content]");
let index = 0;

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs[index].classList.remove("active");
        tab.classList.add("active");
        index = tab.getAttribute("data-id");
        contents.forEach(content => {
            content.classList.add("hide");
            if (content.getAttribute("data-content") == index) {
                content.classList.remove("hide");
                content.classList.add("show");
            }
        })
    })
})