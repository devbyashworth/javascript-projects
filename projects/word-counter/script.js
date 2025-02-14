const input = document.querySelector("textarea");
const wordCount = document.querySelector("[data-word-count]");
const sentenceCount = document.querySelector("[data-sentence-count]");
const characterCount = document.querySelector("[data-character-count]");
const paragraphCount = document.querySelector("[data-paragraph-count]");
const h1 = document.querySelector("h1");

input.addEventListener("input", () => {
    if (input.value) {
        const wordsArray = input.value.split(" ").filter(word => word !== "");
        wordCount.innerText = wordsArray.length;

        characterCount.innerText = input.value.length;

        // const sentenceEndings = ['.', '?', '!', '...', ':', ';', '—', '-', ')'];
        const sentenceArray = input.value.split(/[.!]/);
        sentenceCount.innerText = sentenceArray.length - 1;

        const paragraphArray = input.value.split("\n").filter(p => p.trim() !== "");
        paragraphCount.innerText = paragraphArray.length;
    } else {
        wordCount.innerText = 
            characterCount.innerText = 
            sentenceCount.innerText =
            paragraphCount.innerText =
            0;
    }
});
