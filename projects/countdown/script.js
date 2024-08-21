const countdowns = document.querySelectorAll(".countdown");
countdowns.forEach(countdown => createCountdown(countdown));

function createCountdown (countdown) {
    const target = new Date(new Date(countdown.dataset.targetDate).toLocaleString('en'));
    const parts = {
        days: { text: ["days", "day"], dots: 30 },
        hours: { text: ["hours", "hour"], dots: 24 },
        minutes: { text: ["minutes", "minute"], dots: 60 },
        seconds: { text: ["seconds", "second"], dots: 60 },
    };

    Object.entries(parts).forEach(([key, value]) => {
        const part = document.createElement("div");
        part.classList.add("part", key);
        part.style.setProperty("--dots", value.dots);
        value.element = part;

        const remaining = document.createElement("div");
        remaining.classList.add("remaining");
        remaining.innerHTML = `
        <span class="number"></span>
        <span class="text"></span>
        `;
        part.appendChild(remaining);
        for(let i = 0; i < value.dots; i++){
            const dotContainer = document.createElement("div");
            dotContainer.style.setProperty("--dot-idx", i);
            dotContainer.classList.add("dot-container");
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dotContainer.appendChild(dot);
            part.appendChild(dotContainer);
        }
        countdown.appendChild(part);
    });
    getRemainingTime(target, parts);
};

function getRemainingTime (target, parts, first = true) {
    const now = new Date();
    if (first) console.log({ target, now });
    let seconds = Math.floor((target - now) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
    Object.entries({ days, hours, minutes, seconds }).forEach(([key, value]) => {
        const remainingEl = parts[key].element.querySelector(".number");
        const textEl = parts[key].element.querySelector(".text");
        remainingEl.innerText = value;
        textEl.innerText = parts[key].text[Number(value === 1)];
        const dots = parts[key].element.querySelectorAll(".dot");
        dots.forEach((dot, idx) => {
            dot.dataset.active = idx <= value;
            dot.dataset.lastactive = idx === value;
        });
    });
    if (now <= target) {
        window.requestAnimationFrame(() => {
            getRemainingTime(target, parts, false);
        });
    }
};
