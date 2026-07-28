const navButtons = document.querySelectorAll(".card-nav button");
const cardForms = document.querySelector(".forms");
const activeBar = document.querySelector(".active-bar");
const hero = document.querySelector(".card-hero-inner");

function selectView(view) {
  navButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.classList.contains(view));
  });

  if (view === "signin") {
    cardForms.style.top = "0";
    hero.style.top = "0";
    activeBar.style.top = "33.33%";
  } else {
    cardForms.style.top = "-100%";
    hero.style.top = "-100%";
    activeBar.style.top = "66.66%";
  }
}
