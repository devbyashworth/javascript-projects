const timeDisplay = document.querySelector(".timer-display");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarms");
const hourInput = document.getElementById("hourInput");
const setAlarm = document.getElementById("set");

let alarmsArray = [];
let alarmSound = new Audio("./patriot-of-the-fatherland-epic.mp3");
let initialHour = 0, initialMinute = 0, alarmIndex = 0;

const appendZero = (number) =>  {
    return number < 10 ? `0${number}` : number;
}

const displayTime = () => {
    let today = new Date();

    let hours = appendZero(today.getHours());
    let minutes = appendZero(today.getMinutes());
    let seconds = appendZero(today.getSeconds());
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

    alarmsArray.forEach((alarm, index) => {
        if (alarm.isActive) {
            if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
                alarmSound.play();
                alarmSound.loop = true;
            }
        }
    });
}

const searchObject = (parameter, value) => {
    let alarmObject, objectIndex, exists = false;
    alarmsArray.forEach((alarm, index) => {
        if (alarm[parameter] == value) {
            exists = true;
            alarmObject = alarm;
            objectIndex = index;
            return false;
        }
    });
    return [exists, alarmObject, objectIndex];
}

const inputCheck = (inputValue) => {
    inputValue = parseInt(inputValue);
    if (inputValue < 10) {
        inputValue = appendZero(inputValue);
    }
    return inputValue;
}

hourInput.addEventListener("input", () => {
    hourInput.value = inputCheck(hourInput.value);
});

minuteInput.addEventListener("input", () => {
    minuteInput.value = inputCheck(minuteInput.value);
});

const createAlarm = (alarmObject) => {
    const { id, alarmHour, alarmMinute } = alarmObject;
    let alarmDiv = document.createElement("div");
    alarmDiv.classList.add("alarm");
    alarmDiv.setAttribute("data-id", id);
    alarmDiv.innerHTML = `<span>${alarmHour}:${alarmMinute}</span>`;

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("click", (evt) => {
        if (evt.target.checked) {
            startAlarm(evt);
        } else {
            stopAlarm(evt);
        }
    });
    alarmDiv.appendChild(checkbox);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", (evt) => deleteAlarm(evt));
    alarmDiv.appendChild(deleteButton);
    activeAlarms.appendChild(alarmDiv);

    // Remove input placeholders when checked
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            document.getElementById("hourInput").placeholder = "";
            document.getElementById("minuteInput").placeholder = "";
        }
    });
}


setAlarm.addEventListener("click", () => {
    alarmIndex += 1;
    let alarmObject = {};
    
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    // Check if the alarm time is already past for today
    if (
        parseInt(hourInput.value) < currentHour ||
        (parseInt(hourInput.value) === currentHour && parseInt(minuteInput.value) <= currentMinute)
    ) {
        // Set the alarm for the same time on the next day
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        alarmObject.alarmHour = appendZero(parseInt(hourInput.value));
        alarmObject.alarmMinute = appendZero(parseInt(minuteInput.value));
    } else {
        alarmObject.alarmHour = appendZero(hourInput.value);
        alarmObject.alarmMinute = appendZero(minuteInput.value);
    }

    alarmObject.id = `${alarmIndex}_${alarmObject.alarmHour}_${alarmObject.alarmMinute}`;
    alarmObject.isActive = false;

    alarmsArray.push(alarmObject);
    createAlarm(alarmObject);

    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
});



const startAlarm = (evt) => {
    let searchId = evt.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
        alarmsArray[index].isActive = true;
    }
}

const stopAlarm = (evt) => {
    let searchId =evt.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
        alarmsArray[index].isActive = false;
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }
}

const deleteAlarm = (evt) => {
    let searchId = evt.target.parentElement.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
        evt.target.parentElement.parentElement.remove();
        alarmsArray.splice(index, 1);
    }
}

window.onload = () => {
    setInterval(displayTime, 1000);
    initialHour = 0;
    initialMinute = 0;
    alarmIndex = 0;
    alarmsArray = [];
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
}
