const sidebar = document.querySelector(".sidebar");
const collapseBtn = document.getElementById("collapseBtn");

collapseBtn.addEventListener("click", () => {
  const collapsed = sidebar.classList.toggle("collapsed");
  collapseBtn.setAttribute("aria-expanded", !collapsed);
  collapseBtn.setAttribute(
    "aria-label",
    collapsed ? "Expand sidebar" : "Collapse sidebar",
  );
  sidebar.classList.toggle("expanding", !collapsed);
});

sidebar.addEventListener("transitionend", (evt) => {
  if (evt.target === sidebar && evt.propertyName === "width") {
    sidebar.classList.remove("expanding");
  }
});

document.querySelectorAll(".nav button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav button").forEach((btn) => {
      btn.classList.remove("active");
      btn.removeAttribute("aria-current");
    });
    button.classList.add("active");
    button.setAttribute("aria-current", "page");
  });
});

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}
