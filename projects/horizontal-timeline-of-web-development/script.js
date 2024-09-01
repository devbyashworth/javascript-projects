document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("wheel", evt => {
        evt.preventDefault();
        document.querySelector(".horizontal-window").scrollLeft += evt.deltaY;
    });
});
