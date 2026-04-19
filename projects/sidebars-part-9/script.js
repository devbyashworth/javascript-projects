const sidebar = document.querySelector(".sidebar");
const handle = document.querySelector(".handle");

const MIN_WIDTH = 56;
const MAX_WIDTH = 240;
let isResizing = false;

handle.addEventListener("mousedown", (evt) => {
  isResizing = true;
  document.body.classList.add("resizing");
  evt.preventDefault();
});

document.addEventListener("mousemove", (evt) => {
  if (!isResizing) return;

  const sidebarRect = sidebar.getBoundingClientRect();
  let newWidth = evt.clientX - sidebarRect.left;

  if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
  if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;

  sidebar.style.width = newWidth + "px";
});

document.addEventListener("mouseup", () => {
  if (!isResizing) return;
  isResizing = false;
  document.body.classList.remove("resizing");
});

function goToPage(button) {
  document
    .querySelectorAll(".sidebar button")
    .forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
}
