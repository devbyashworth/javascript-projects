window.addEventListener("scroll", () => {
    let height = document.documentElement.scrollHeight - window.innerHeight;
    let width = document.documentElement.clientWidth;
    let position = window.scrollY;  
    let bar = (position / height) * width;
    document.getElementById("progress").style.width = bar + "px";
});
