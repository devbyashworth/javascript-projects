Number.prototype.pad = function (number) {
    let num = this.toString();
    while (num.length < number) {
        num = '0' + num;
    }
    return num;
}

function updateClock() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();

    let hour = today.getHours();
    let minute = today.getMinutes();
    let second = today.getSeconds();
    let millisecond = today.getMilliseconds();

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let tags = ["months", "days", "years", "hours", "minutes", "seconds", "milliseconds"];
    let dateFormat = [months[month], day, year, hour.pad(2), minute.pad(2), second.pad(2), millisecond.pad(3)];

    for (let i = 0; i < tags.length; i++) {
        document.getElementById(tags[i]).textContent = dateFormat[i];
    }
}

function initClock() {
    updateClock();
    setInterval(updateClock, 1);
}
