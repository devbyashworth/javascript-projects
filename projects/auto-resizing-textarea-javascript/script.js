document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById("textarea");

    const initialHeight = parseInt(getComputedStyle(textarea).getPropertyValue("height"));

    textarea.addEventListener("input", () => {
        textarea.style.height = `${initialHeight}px`;
        textarea.style.height = `${textarea.scrollHeight}px`;
    });
});
