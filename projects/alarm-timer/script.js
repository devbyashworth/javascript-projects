const alarmForm = document.querySelector(".alarm-form");
const alarmStatus = document.getElementById("alarmStatus");
const setAlarmButton = document.getElementById("setAlarm");
const alarmTimeInput = document.getElementById("alarmTime");
const alarmMessageInput = document.getElementById("alarmMessage");

setAlarmButton.addEventListener("click", () => {
    const alarmTime = alarmTimeInput.value;
    const alarmMessage = alarmMessageInput.value;
    setAlarm(alarmTime, alarmMessage);
});

const setAlarm = (time, message) => {
    const [hours, minutes] = time.split(":");
    const now = new Date();
    const alarm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    if (alarm > now) {
        const timeDiff = alarm - now;
        setTimeout(() => {
            playAlarm(message);
        }, timeDiff);

        alarmStatus.textContent = `Alarm set for ${time}`;
    } else {
        alarmStatus.textContent = "Invalid time. Please choose a future time.";
    }
}

const playAlarm = (message) => {
    alert(message);
    alarmStatus.textContent = "Alarm Triggered!";
    alarmTimeInput.value = "";
    alarmMessageInput.value = "";
}