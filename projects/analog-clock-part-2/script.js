const deg = 6;
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");

const setClock = () => {
    let today = new Date();
    const hours = today.getHours() * 30;
    const minutes = today.getMinutes() * deg;
    const seconds = today.getSeconds() * deg;

    hour.style.transform = `rotateZ(${hours + minutes / 12}deg)`;
    minute.style.transform = `rotateZ(${minutes}deg)`;
    second.style.transform = `rotateZ(${seconds}deg)`;
};

setClock();
setInterval(setClock, 1000);