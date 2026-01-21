const WORDS = [
  "an ai-powered task automation for real-world use-cases",
  "a real-world use-case of ai-powered automation",
  "an ai-powered solution for real-world problems",
  "an automation tool with ai-powered intelligence",
  "a real-world productivity boost using ai-powered automation",
  "an ai-powered workflow automation for everyday use-cases",
  "a real-world use-case analysis for ai-powered tech",
  "an automation challenge solved by ai-powered applications",
  "a real-world ai-powered automation demo",
  "an ai-powered real-world decision-making automation",
  "an ai-powered tool to optimize business processes",
  "a real-world automation scenario using ai-powered tools",
  "an ai-powered solution for practical use-cases",
  "an ai-powered automation for repetitive real-world tasks",
  "an ai-powered fix for real-world problems",
  "an ai-powered automation for real-world learning projects",
  "a real-world ai-powered use-case for developers",
  "an ai-powered prototype for automation",
  "a use-case analysis for ai-powered automation systems",
  "an ai-powered automation for real-world efficiency",
  "a real-world data handling tool using ai-powered automation",
];

const textarea = document.querySelector("#textarea");
const placeholder = document.querySelector("#placeholder");
const placeholderText = document.querySelector("#placeholder-text");

let wordIndex = 0;
let charIndex = 0;
let typing = true; // true = typing, false = deleting

function type() {
  const currentWord = WORDS[wordIndex];

  if (typing) {
    // Type a letter
    // Append one letter without removing existing HTML
    placeholderText.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      typing = false; // start deleting after full word
      setTimeout(type, 1500); // wait before deleting
      return;
    }
  } else {
    // Delete a letter
    placeholderText.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      typing = true;
      wordIndex = (wordIndex + 1) % WORDS.length;
    }
  }

  setTimeout(type, typing ? 150 : 100); // speed of typing and deleting
}

// Start the effect
type();

// Hide placeholder when user types
textarea.addEventListener("input", (evt) => {
  placeholder.style.display = evt.target.value ? "none" : "flex";
});
