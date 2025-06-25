const banner = document.querySelector(".banner");
const h1 = banner.querySelector("h1");
const button = banner.querySelector("button");

document.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  if (scrollPosition > 150) {
    banner.style.backgroundSize = "150%";
    h1.style.opacity = "0";
    h1.style.transform = "translateY(-50px) scale(0.9)";
    button.style.opacity = "0";
    button.style.transform = "translateY(-50px) scale(0.8)";
  } else {
    banner.style.backgroundSize = "180%";
    h1.style.opacity = "1";
    h1.style.transform = "translateY(0) scale(1)";
    button.style.opacity = "1";
    button.style.transform = "translateY(0) scale(1)";
  }
});
