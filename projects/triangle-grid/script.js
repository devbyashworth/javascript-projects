const container = document.querySelector(".triangle-container");

const triangleBase = 48;

const instantiateGrid = () => {
    container.innerHTML = "";
    const width = document.body.clientWidth;
    const height = document.body.clientHeight * 0.4;

    let columns = Math.ceil(width / (triangleBase * 2)) + 1;
    let rows = Math.ceil(height / triangleBase * 1.733);
    container.style.setProperty("--columns", columns);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            createTriangleSet(x + y * columns, x, y);
        }        
    }
}

const createTriangleSet = (index, column, row) => {
    let element = document.createElement("div");
    element.classList.add("triangle-set");
    if (row % 2 == 0) element.classList.add("triangle-set-offset");
    container.appendChild(element); 
}

window.onresize = () => {
    instantiateGrid();
}

instantiateGrid();
const glow = document.body.querySelector("#glow");

window.addEventListener("mousemove", (evt) => {
    glow.style.top = evt.pageY + "px";
    glow.style.left = evt.pageX + "px";
})
