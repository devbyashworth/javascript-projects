const sliderBar = document.querySelector("#slider-bar");
const sliderInput = document.querySelector("#slider-input");
const numericInput = document.querySelector("#numeric-input");
const markers = document.querySelectorAll("#markers .marker");

// Fixed bar width calculation
const getBarWidth = (value) => {
  const v = Number(value);
  if (v <= 0) return "0%";
  if (v >= 100) return "100%";
  // Correct alignment without overshoot
  const thumbHalf = 9; // half of 18px thumb
  const percentOffset = (thumbHalf / sliderInput.offsetWidth) * 100;
  return `calc(${v}% - ${percentOffset}px)`;
};

const updateSlider = (value) => {
  const numValue = Math.min(Math.max(Number(value) || 0, 0), 100);
  sliderInput.value = numValue;
  numericInput.value = numValue;
  sliderBar.style.width = getBarWidth(numValue);

  markers.forEach((marker, i) => {
    marker.classList.toggle("active", i === 0 || numValue >= i * 25);
  });
};

sliderInput.addEventListener("input", (e) => updateSlider(e.target.value));
numericInput.addEventListener("input", (e) => updateSlider(e.target.value));

// Initialize on load
updateSlider(sliderInput.value);
