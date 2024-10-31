const slider = document.querySelector(".slider");

const activate = (evt) => {
    const items = document.querySelectorAll(".item");
    const target = evt.target;
    if (target.classList.contains("next")) {
        slider.appendChild(items[0]); // Move the first item to the end
    } else if (target.classList.contains("prev")) {
        slider.insertBefore(items[items.length - 1], items[0]); // Move the last item to the beginning
    }
};

document.querySelector(".next").addEventListener("click", activate);
document.querySelector(".prev").addEventListener("click", activate);
