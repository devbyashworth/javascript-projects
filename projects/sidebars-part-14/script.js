const sidebar = document.querySelector(".sidebar");
const collapseBtn = document.getElementById("collapseBtn");
const themeToggle = document.getElementById("themeToggle");
const themeSwitch = themeToggle.querySelector(".switch");

collapseBtn.addEventListener("click", () => {
  const collapsed = sidebar.classList.toggle("collapsed");
  collapseBtn.setAttribute("aria-expanded", !collapsed);
  collapseBtn.setAttribute(
    "aria-label",
    collapsed ? "Expand sidebar" : "Collapse sidebar"
  );
});

document.querySelectorAll(".nav-link").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((btn) => {
      btn.classList.remove("active");
      btn.removeAttribute("aria-current");
    });
    button.classList.add("active");
    button.setAttribute("aria-current", "page");
  });
});

themeToggle.addEventListener("click", () => {
  const on = themeSwitch.classList.toggle("on");
  themeToggle.setAttribute("aria-pressed", on);
  document.body.classList.toggle("dark", on);
});

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}