document.addEventListener("DOMContentLoaded", () => {
    const copyBtn = document.querySelector(".copy");
    const quoteBtn = document.querySelector("button");
    const quoteText = document.querySelector(".quote");
    const authorName = document.querySelector(".name");
    const speechBtn = document.querySelector(".speech");

    const synth = speechSynthesis;

    const randomQuote = () => {
        quoteBtn.classList.add("loading");
        quoteBtn.textContent = "Loading Quote...";
        fetch("http://api.quoteable.io/random")
        .then(response => response.json())
        .then(result => {
            quoteText.innerText = result.content;
            authorName.innerText = result.author;
            quoteBtn.classList.remove("loading");
            quoteBtn.innerText = "New Quote";
        });
    };

    speechBtn.addEventListener("click", () => {
        if (!quoteBtn.classList.contains("loading")) {
            let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
            synth.speak(utterance);
            synth.onend = () => {
                speechBtn.classList.remove("active");
            };
            speechBtn.classList.add("active");
        }
    });

    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(quoteText.innerText);
    });

    quoteBtn.addEventListener("click", randomQuote);
});
