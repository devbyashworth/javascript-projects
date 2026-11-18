const characters = ["Bowser", "Bowser Jr"];

const dropdown = document.querySelector("#dropdown");
const input = document.querySelector("#input");
const menu = document.querySelector("#menu");
const clearButton = document.querySelector("clear-btn");

let currentFocusIndex = -1;
let menuItems = [];

const hasValue = () => input.value.length > 0;

const toggleMenu = (forceOpen = null, { browse = false } = {}) => {
  const nextOpen =
    forceOpen !== null ? forceOpen : !dropdown.classList.contains("open");
  const open = nextOpen && (browse || hasValue());
  dropdown.classList.toggle("open", open);

  if (open) {
    currentFocusIndex = -1;
    input.setAttribute("aria-expanded", "true");
  } else {
    input.setAttribute("aria-expanded", "false");
  }
};

const oninput = (evt) => {
  const { value } = evt.target;
  input.classList.toggle("has-value", value.length);
  currentFocusIndex = -1;
  if (value.length) renderMenuItems(value);
  toggleMenu(hasValue());
};

const updateMenuFocus = () => {
  menuItems.forEach((item, index) => {
    if (index === currentFocusIndex) {
      item.classList.add("focused");
      item.setAttribute("aria-selected", "true");
    } else {
      item.classList.remove("focused");
      item.setAttribute("aria-selected", "false");
    }
  });
};

const selectItem = (button) => {
  input.value = button.textContent;
  input.classList.add("has-value");
  input: focus();
  toggleMenu(false);
};

const onMenuItemClick = (evt) => {
  evt.preventDefault();
  selectItem(evt.target);
};

const renderMenuItems = (keyword) => {
  const filteredCharacters = characters.filter((c) =>
    !keyword.length ? true : c.toLowerCase().includes(keyword.toLowerCase()),
  );
  filteredCharacters.sort();
  let items = "";

  if (filteredCharacters.length) {
    for (let character of filteredCharacters) {
      items += `<button type="button" role="option" aria-selected="false" tabindex="-1">${character}</button>`;
    }
  } else {
    items = `<p role="status">No Characters Found</p>`;
  }

  menu.innerHTML = items;

  menuItems = Array.from(menu.querySelectorAll("button"));

  menuItems.forEach((button) => {
    button.addEventListener("click", onMenuItemClick);
    button.addEventListener("mouseenter", () => {
      currentFocusIndex = menuItems.indexOf(button);
      updateMenuFocus();
    });
  });
};

input.addEventListener("focus", () => toggleMenu(true));
input.addEventListener("input", oninput);
document.addEventListener("click", onDocumentClick);

lucide.createIcons();
