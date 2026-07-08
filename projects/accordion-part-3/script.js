const accordion = document.querySelector(".accordion");
const accordionItems = document.querySelectorAll(".accordion-item");

accordion.addEventListener("click", (event) => {
  const clickedItem = event.target.closest(".accordion-item");

  if (!clickedItem) return;

  accordionItems.forEach((item) => {
    item.classList.toggle("active", item === clickedItem);
  });
});
