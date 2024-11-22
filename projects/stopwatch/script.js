window.onload = () => {
    let tens = 0;
    let seconds = 0;

    const stopBtn = document.getElementById("stop");
    const resetBtn = document.getElementById("reset");
    const startBtn = document.getElementById("start");
    const appendTens = document.getElementById("tens");
    const appendSeconds = document.getElementById("seconds");

    let interval;

    const startTimer = () => {
        tens++;
        if (tens < 10) {
            appendTens.innerHTML = "0" + tens;
        } else {
            appendTens.innerHTML = tens;
        }

        if (tens > 99) {
            seconds++;
            if (seconds < 10) {
                appendSeconds.innerHTML = "0" + seconds;
            } else {
                appendSeconds.innerHTML = seconds;
            }
            tens = 0;
            appendTens.innerHTML = "0" + tens;
        }
    };

    startBtn.onclick = () => {
        clearInterval(interval);
        interval = setInterval(startTimer, 10);
    };

    stopBtn.onclick = () => {
        clearInterval(interval);
    };

    resetBtn.onclick = () => {
        clearInterval(interval);
        tens = 0;
        seconds = 0;
        appendTens.innerHTML = "00";
        appendSeconds.innerHTML = "00";
    };
};
