const displayClock = document.getElementById("displayClock");

function showTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let session = "AM";

    if(hours == 0){
        hours = 12;
    }
    if(hours > 12) {
        hours = hours - 12;
        session = "PM";
    }
    
    hours = doubleDigits(hours);
    minutes = doubleDigits(minutes);
    seconds = doubleDigits(seconds);
     
    displayClock.innerText = `${hours} : ${minutes} : ${seconds} ${session}`;

}

const doubleDigits = (num) => {
    return num < 10 ? `0${num}` : num;
}

setInterval(() => {
    showTime();
}, 1000);

