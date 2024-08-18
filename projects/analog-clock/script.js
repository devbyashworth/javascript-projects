
const handElements = {
    hour : document.querySelector("#hour"),
    minute : document.querySelector("#minute"),
    second : document.querySelector("#second"),
}

const digitalTime = document.querySelector("#digital-time");

const rotateClockHand = (hand, degree) => {
    hand.style.transform = `rotate(${degree}deg)`
}

const updateAnalogClock = () => {
    const date = new Date();

    const seconds = date.getSeconds() * 6;
    const minutes = date.getMinutes() * 6 + seconds / 60;
    const hours = (date.getHours() % 12) * 30 + minutes / 12;
    
    rotateClockHand(handElements.second, seconds);
    rotateClockHand(handElements.minute, minutes);
    rotateClockHand(handElements.hour, hours);
}

const doubleDigits = (num) => {
    return num < 10 ? `0${num}` : num;
};

const updateDigitalClock = () => {
    const date = new Date();
    const hours = doubleDigits(date.getHours());
    const minutes = doubleDigits(date.getMinutes());
    const seconds = doubleDigits(date.getSeconds());

    digitalTime.innerHTML = `${hours} : ${minutes} : ${seconds}`
}

setInterval(() => {
    updateAnalogClock();
    updateDigitalClock();
}, 1000);
