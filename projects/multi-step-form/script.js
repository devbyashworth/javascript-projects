document.addEventListener('DOMContentLoaded', () => {
    const steps = Array.from(document.querySelectorAll(".step"));
    const nextBtns = document.querySelectorAll(".next-btn");
    const prevBtns = document.querySelectorAll(".prev-btn");
    const form = document.getElementById("multi-step-form");
    let currentStep = 0;

    nextBtns.forEach((button) => {
        button.addEventListener("click", () => {
            changeStep("next");
        });
    });

    prevBtns.forEach((button) => {
        button.addEventListener("click", () => {
            changeStep("prev");
        });
    });

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const inputs = [];
        form.querySelectorAll("input").forEach((input) => {
            const { name, value } = input;
            inputs.push({ name, value });
        });
        console.log(inputs);
        form.reset();
        alert("Form submitted successfully!");
    });

    function changeStep(direction) {
        steps[currentStep].classList.remove("active");
        if (direction === "next") {
            currentStep++;
        } else if (direction === "prev") {
            currentStep--;
        }
        steps[currentStep].classList.add("active");
    }
});
