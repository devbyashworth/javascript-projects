const sidebar = document.querySelector(".sidebar");
const handle = document.querySelector(".handle");

let isResizing = false;

const MIN_WIDTH = 72;
const MAX_WIDTH = 280;

handle.addEventListener("dblclick", () => {
  document.body.classList.add("resizing");

  const currentWidth = sidebar.getBoundingClientRect().width;

  sidebar.classList.add("is-toggling");

  const newWidth = currentWidth <= MIN_WIDTH ? MAX_WIDTH : MIN_WIDTH;

  sidebar.classList.toggle("collapsed", newWidth <= MIN_WIDTH);

  sidebar.style.width = `${newWidth}px`;

  sidebar.addEventListener(
    "transitionend",
    () => {
      sidebar.classList.remove("is-toggling");
      document.body.classList.remove("resizing");
    },
    { once: true },
  );
});

document.addEventListener("mouseup", () => {
  if (!isResizing) return;
  isResizing = false;
  document.body.classList.remove("resizing");
});

document.addEventListener("mousemove", (evt) => {
  if (!isResizing) return;
  const sidebarRect = sidebar.getBoundingClientRect();
  let newWidth = evt.clientX - sidebarRect.left;
  if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
  if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;
  sidebar.classList.toggle("collapsed", newWidth <= MIN_WIDTH);
  sidebar.style.width = newWidth + "px";
});

handle.addEventListener("dblclick", () => {
  document.body.classList.add("resizing");
  const currentWidth = sidebar.getBoundingClientRect().width;
  sidebar.classList.add("is-toggling");
  const newWidth = currentWidth <= MIN_WIDTH ? MAX_WIDTH : MIN_WIDTH;
  if (newWidth > MIN_WIDTH) sidebar.classList.toggle("collapsed", false);
  sidebar.style.width = newWidth + "px";
  sidebar.addEventListener(
    "transitionend",
    () => {
      if (newWidth <= MIN_WIDTH) sidebar.classList.toggle("collapsed", true);
      sidebar.classList.remove("is-toggling");
      document.body.classList.remove("resizing");
    },
    { once: true },
  );
});
