const navigation = document.querySelector("nav");

const active = document.createElement("div");
active.classList.add("active-element");

const getOffsetLeft = (element) => {
    const elementRect = element.getBoundingClientRect();

    return (
        elementRect.left - navigation.getBoundingClientRect().left + (elementRect.width - active.offsetWidth) / 2
    );
}

navigation.appendChild(active);

const activeLink = document.querySelector("ul li.active button");

document.fonts.ready.then(() => {
    gsap.set(active, { // Corrected from activeElement to active
      x: getOffsetLeft(activeLink), // Corrected from activeButton to activeLink
    });
    gsap.to(active, {
      "--active-element-show": "1",
      duration: 0.2,
    });
});

navigation.querySelectorAll("ul li button").forEach((button, index) => { // Corrected from navElement to navigation
    button.addEventListener("click", () => {
        const active = navigation.querySelector("ul li.active");
        const oldIndex = [...active.parentElement.children].indexOf(active);

        if (
            index === oldIndex ||
            navigation.classList.contains("before") ||
            navigation.classList.contains("after")
        ) {
            return;
        }

        const x = getOffsetLeft(button);
        const direction = index > oldIndex ? "after" : "before";
        const spacing = Math.abs(x - getOffsetLeft(active));

        navigation.classList.add(direction);
        active.classList.remove("active");
        button.parentElement.classList.add("active");

        gsap.set(active, { // Corrected from activeElement to active
            rotateY: direction === "before" ? "180deg" : "0deg",
        });

        gsap.to(active, {
            keyframes: [
                {
                    "--active-element-width": `${
                        spacing > navigation.offsetWidth - 60
                            ? navigation.offsetWidth - 60
                            : spacing
                        }px`,
                    duration: 0.3,
                    ease: "none",
                    onStart: () => {
                        createSVG(active);

                        gsap.to(active, {
                            "--active-element-opacity": 1,
                            duration: 0.1,
                        });
                    },
                },
                {
                    "--active-element-scale-x": "0",
                    "--active-element-scale-y": ".25",
                    "--active-element-width": "0px",
                    duration: 0.3,
                    onStart: () => {
                        gsap.to(active, {
                            "--active-element-mask-position": "40%",
                            duration: 0.5,
                        });
                        gsap.to(active, {
                            "--active-element-opacity": 0,
                            delay: 0.45,
                            duration: 0.25,
                        });
                    },
                    onComplete: () => {
                        active.innerHTML = "";
                        navigation.classList.remove("before", "after");
                        active.removeAttribute("style");
                        gsap.set(active, {
                            x: getOffsetLeft(button),
                            "--active-element-show": "1",
                        });
                    },
                },
            ],
        });

        gsap.to(active, {
            x,
            "--active-element-strike-x": "-50%",
            duration: 0.6,
            ease: "none",
        });
    });
});

const createSVG = (element) => {
    element.innerHTML = `
    <svg viewBox="0 0 116 5" preserveAspectRatio="none" class="beam">
        <path d="M0.5 2.5L113 0.534929C114.099 0.515738 115 1.40113 115 2.5C115 3.59887 114.099 4.48426 113 4.46507L0.5 2.5Z" fill="url(#gradient-beam)"/>
        <defs>
        <linearGradient id="gradient-beam" x1="2" y1="2.5" x2="115" y2="2.5" gradientUnits="userSpaceOnUse">
            <stop stop-color="#6AAAFF"/>
            <stop offset="1" stop-color="white"/>
        </linearGradient>
        </defs>
    </svg>
    <div class="strike">
        <svg viewBox="0 0 114 12" preserveAspectRatio="none">
        <g fill="none" stroke="white" stroke-width="0.75" stroke-linecap="round">
            <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.972 9.00369 108.92 9.0112L103.5 10.5"/>
            <path d="M103.5 10.5L96 12"/>
            <path d="M113.5 6.5L109.068 4.0379C109.023 4.01279 108.972 3.99631 108.92 3.9888L103.5 2.5"/>
            <path d="M103.5 2.5L96 1"/>
        </g>
        </svg>
    </div>
    `;
};
