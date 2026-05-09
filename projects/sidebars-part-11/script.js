const sidebar = document.querySelector(".sidebar");
const handle = document.querySelector(".handle");
const buttons = document.querySelectorAll(".sidebar button");

let isResizing = false;

const MIN_WIDTH = 56;
const MAX_WIDTH = 240;

/* ✅ ACTIVE BUTTON */
function gotoPage(btn) {
  buttons.forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}

/* default active */
buttons[0].classList.add("active");

/* RESIZE START */
handle.addEventListener("mousedown", (evt) => {
  isResizing = true;
  document.body.classList.add("resizing");
  evt.preventDefault();
});

/* RESIZE MOVE */
document.addEventListener("mousemove", (evt) => {
  if (!isResizing) return;

  const sidebarRect = sidebar.getBoundingClientRect();
  let newWidth = evt.clientX - sidebarRect.left;

  if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
  if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;

  sidebar.style.width = newWidth + "px";
});

/* RESIZE END */
document.addEventListener("mouseup", () => {
  if (!isResizing) return;

  isResizing = false;
  document.body.classList.remove("resizing");
});

/* DOUBLE CLICK TO TOGGLE */
handle.addEventListener("dblclick", () => {
  const currentWidth = sidebar.getBoundingClientRect().width;

  sidebar.classList.add("is-toggling");

  sidebar.style.width =
    (currentWidth <= MIN_WIDTH ? MAX_WIDTH : MIN_WIDTH) + "px";

  sidebar.addEventListener(
    "transitionend",
    () => sidebar.classList.remove("is-toggling"),
    { once: true },
  );
});
