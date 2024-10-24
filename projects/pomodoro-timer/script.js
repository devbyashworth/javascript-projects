let seconds = 0;
let minutes = 25;
let timerInterval;

const timer = document.querySelector(".timer");
const start = document.querySelector("#start");
const reset = document.querySelector("#reset");

const startTimer = () => {
    start.disabled = true;
    timerInterval = setInterval(updateTimer, 1000);
}

const updateTimer = () => {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timerInterval);
            timer.textContent = "00:00";
            start.disabled = false;
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    timer.textContent = `${padTime(minutes)}:${padTime(seconds)}`;
}

const resetTimer = () => {
    clearInterval(timerInterval);
    minutes = 25;
    seconds = 0;
    timer.textContent = `${padTime(minutes)}:${padTime(seconds)}`;
    start.disabled = false;
}

const padTime = (time) => {
    return time.toString().padStart(2, "0");
}

start.addEventListener("click", startTimer);
reset.addEventListener("click", resetTimer);
