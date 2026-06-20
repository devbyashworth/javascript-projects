const menu = document.querySelector(".menu");
const submenu = document.querySelector(".submenu");
const submenus = document.querySelectorAll(".submenu > div");

const onMenuHover = (ele) => {
  submenus.forEach((item) => item.classList.remove("visible"));

  const selectedSubmenu = document.querySelector(
    `.submenu-${ele.innerText.toLowerCase()}`,
  );

  if (!selectedSubmenu) {
    submenu.classList.remove("open");
    return;
  }

  selectedSubmenu.classList.add("visible");

  const liRect = ele.getBoundingClientRect();

  submenu.style.left = `${liRect.left}px`;
  submenu.classList.add("open");
};

menu.addEventListener("mouseover", (evt) => {
  const item = evt.target.closest("li");

  if (item) {
    onMenuHover(item);
  }
});

menu.addEventListener("mouseleave", () => {
  submenu.classList.remove("open");
});
