document.addEventListener("DOMContentLoaded", () => {
    const message = document.getElementById("message");

    const greetings = ["Good Morning", "Good Afternoon", "Good Evening"];

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour >= 12 && currentHour < 17) {
            return greetings[1];
        } else if (currentHour >= 17) {
            return greetings[2];
        } else {
            return greetings[0];
        }
    };

    message.innerText = getGreeting();

    setInterval(() => {
        message.innerText = getGreeting();
    }, 60000); // Update every minute
});
