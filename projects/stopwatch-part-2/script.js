window.onload = () => {
    const stop = document.getElementById("stop");
    const start = document.getElementById("start");
    const reset = document.getElementById("reset");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");
    const milliseconds = document.getElementById("milliseconds");

    let timer;
    let minute = 0;
    let second = 0;
    let millisecond = 0;

    const updateTimer = () => {
        millisecond++;

        if (millisecond === 100) {
            millisecond = 0;
            second++;

            if (second === 60) {
                second = 0;
                minute++;
            }
        }

        minutes.textContent = padTime(minute);
        seconds.textContent = padTime(second);
        milliseconds.textContent = padTime(millisecond);
    };

    start.onclick = () => {
        clearInterval(timer);
        timer = setInterval(updateTimer, 10);
    };

    stop.onclick = () => {
        clearInterval(timer);
    };

    reset.onclick = () => {
        clearInterval(timer);
        minute = 0;
        second = 0;
        millisecond = 0;
        minutes.textContent = padTime(minute);
        seconds.textContent = padTime(second);
        milliseconds.textContent = padTime(millisecond);
    };

    const padTime = (time) => {
        return time.toString().padStart(2, "0");
    };
};
