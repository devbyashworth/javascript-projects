const sidebar = document.querySelector(".sidebar");
const collapseBtn = document.getElementById("collapseBtn");
const themeToggle = document.getElementById("themeToggle");
const themeSwitch = themeToggle.querySelector(".switch");
const nav = document.querySelector(".nav");
const navButtons = [...nav.querySelectorAll("button")];

// --- Tooltips for collapsed icons ---
// A single shared element appended to <body>, positioned with
// getBoundingClientRect() on hover/focus. It can't be a plain CSS
// ::after on each button because .sidebar's overflow:hidden (needed
// for the rounded corners) would clip it before it ever escaped the
// 70px collapsed rail.
const tooltip = document.createElement("div");
tooltip.className = "sidebar-tooltip";
tooltip.setAttribute("aria-hidden", "true");
document.body.appendChild(tooltip);

let tipTimer;

const showTip = (el) => {
  clearTimeout(tipTimer);
  tipTimer = setTimeout(() => {
    if (!sidebar.classList.contains("collapsed")) return;
    const rect = el.getBoundingClientRect();
    tooltip.textContent = el.dataset.tip;
    tooltip.style.top = `${rect.top + rect.height / 2}px`;
    tooltip.style.left = `${rect.right + 12}px`;
    tooltip.classList.add("visible");
  }, 300);
};

const hideTip = () => {
  clearTimeout(tipTimer);
  tooltip.classList.remove("visible");
};

document.querySelectorAll("[data-tip]").forEach((el) => {
  el.addEventListener("mouseenter", () => showTip(el));
  el.addEventListener("mouseleave", hideTip);
  el.addEventListener("focus", () => showTip(el));
  el.addEventListener("blur", hideTip);
});

// --- Collapse / expand ---
collapseBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
  hideTip();
});

// --- Active nav indicator ---
const setActive = (button) => {
  navButtons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
  nav.style.setProperty("--active-row", navButtons.indexOf(button));
};

navButtons.forEach((button) => {
  button.addEventListener("click", () => setActive(button));
});

setActive(nav.querySelector("button.active") ?? navButtons[0]);

// --- Theme toggle ---
themeToggle.addEventListener("click", () => {
  const on = themeSwitch.classList.toggle("on");
  themeToggle.setAttribute("aria-pressed", on);
  document.body.classList.toggle("dark", on);
});

lucide.createIcons();