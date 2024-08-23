const date = document.querySelector(".date");
const time = document.querySelector(".time");

const updateDate = () => {
    const today = new Date();
    const options = { weekday: "long", month: "long", year: "numeric", day: "numeric" };
    const dateString = today.toLocaleDateString(undefined, options);
    date.textContent = dateString;
}

const updateTime = () => {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const timeString = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    time.textContent = timeString;
}

const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
}

updateDate();
setInterval(updateTime, 1000);
