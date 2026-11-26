document.addEventListener("DOMContentLoaded", () => {
  /* --------------------------------
     Elements
  -------------------------------- */

  const dropdown = document.getElementById("dropdown");
  const input = document.getElementById("input");
  const menu = document.getElementById("menu");
  const clearButton = document.getElementById("clear-btn");
  const selectionStatus = document.getElementById("selectionStatus");

  if (!dropdown || !input || !menu || !clearButton) {
    console.error("Search dropdown: required HTML elements were not found.");
    return;
  }

  /* --------------------------------
     Data
  -------------------------------- */

  const characters = [
    "Bowser",
    "Bowser Jr",
    "Mario",
    "Luigi",
    "Princess Peach",
    "Princess Daisy",
    "Yoshi",
    "Toad",
    "Donkey Kong",
    "Wario",
    "Waluigi",
    "Rosalina",
  ];

  /* --------------------------------
     State
  -------------------------------- */

  let currentFocusIndex = -1;
  let menuItems = [];
  let closeTimer = null;

  /* --------------------------------
     Helpers
  -------------------------------- */

  const hasValue = () => input.value.trim().length > 0;

  function updateClearButton() {
    const hasText = hasValue();

    input.classList.toggle("has-value", hasText);
    clearButton.hidden = !hasText;
  }

  function updateActiveOption() {
    menuItems.forEach((item, index) => {
      const isActive = index === currentFocusIndex;

      item.classList.toggle("focused", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    if (currentFocusIndex >= 0 && menuItems[currentFocusIndex]) {
      const activeItem = menuItems[currentFocusIndex];

      input.setAttribute("aria-activedescendant", activeItem.id);
      activeItem.scrollIntoView({ block: "nearest" });
    } else {
      input.removeAttribute("aria-activedescendant");
    }
  }

  /* --------------------------------
     Open and close menu
  -------------------------------- */

  function openMenu() {
    clearTimeout(closeTimer);

    menu.hidden = false;

    // Allow the browser to apply the initial hidden styles.
    requestAnimationFrame(() => {
      dropdown.classList.add("open");
      input.setAttribute("aria-expanded", "true");
    });
  }

  function closeMenu() {
    dropdown.classList.remove("open");
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");

    currentFocusIndex = -1;
    updateActiveOption();

    clearTimeout(closeTimer);

    closeTimer = setTimeout(() => {
      if (!dropdown.classList.contains("open")) {
        menu.hidden = true;
      }
    }, 350);
  }

  /* --------------------------------
     Render search results
  -------------------------------- */

  function renderMenuItems(keyword = "") {
    const searchTerm = keyword.trim().toLowerCase();

    const filteredCharacters = characters
      .filter((character) => character.toLowerCase().includes(searchTerm))
      .sort((a, b) => a.localeCompare(b));

    menu.replaceChildren();
    menuItems = [];
    currentFocusIndex = -1;

    if (filteredCharacters.length === 0) {
      const emptyMessage = document.createElement("li");

      emptyMessage.className = "menu-empty";
      emptyMessage.setAttribute("role", "presentation");
      emptyMessage.textContent = "No characters found.";

      menu.appendChild(emptyMessage);
      return;
    }

    filteredCharacters.forEach((character, index) => {
      const listItem = document.createElement("li");

      const button = document.createElement("button");

      button.type = "button";
      button.id = `character-option-${index}`;
      button.setAttribute("role", "option");
      button.setAttribute("aria-selected", "false");
      button.textContent = character;

      listItem.appendChild(button);
      menu.appendChild(listItem);

      menuItems.push(button);
    });
  }

  /* --------------------------------
     Search input
  -------------------------------- */

  input.addEventListener("focus", () => {
    renderMenuItems(input.value);
    openMenu();
  });

  input.addEventListener("input", () => {
    updateClearButton();
    renderMenuItems(input.value);
    openMenu();

    selectionStatus.textContent = hasValue()
      ? "Choose a character from the search results."
      : "Showing all characters.";
  });

  /* --------------------------------
     Select an option
  -------------------------------- */

  function selectItem(button) {
    if (!button) return;

    input.value = button.textContent.trim();

    updateClearButton();
    closeMenu();

    selectionStatus.textContent = `Selected: ${input.value}`;

    input.focus();
  }

  menu.addEventListener("click", (event) => {
    const button = event.target.closest("button[role='option']");

    if (!button || !menu.contains(button)) return;

    selectItem(button);
  });

  /* --------------------------------
     Clear search
  -------------------------------- */

  clearButton.addEventListener("click", () => {
    input.value = "";

    updateClearButton();
    renderMenuItems("");

    selectionStatus.textContent = "Search cleared. Showing all characters.";

    openMenu();
    input.focus();
  });

  /* --------------------------------
     Keyboard navigation
  -------------------------------- */

  input.addEventListener("keydown", (event) => {
    const isOpen = dropdown.classList.contains("open");

    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();

        if (!isOpen) {
          renderMenuItems(input.value);
          openMenu();
        }

        if (menuItems.length > 0) {
          currentFocusIndex = (currentFocusIndex + 1) % menuItems.length;

          updateActiveOption();
        }

        break;
      }

      case "ArrowUp": {
        event.preventDefault();

        if (!isOpen) {
          renderMenuItems(input.value);
          openMenu();
        }

        if (menuItems.length > 0) {
          currentFocusIndex =
            currentFocusIndex <= 0
              ? menuItems.length - 1
              : currentFocusIndex - 1;

          updateActiveOption();
        }

        break;
      }

      case "Enter": {
        if (isOpen && currentFocusIndex >= 0) {
          event.preventDefault();
          selectItem(menuItems[currentFocusIndex]);
        }

        break;
      }

      case "Escape": {
        if (isOpen) {
          event.preventDefault();
          closeMenu();
        }

        break;
      }

      case "Tab": {
        closeMenu();
        break;
      }
    }
  });

  /* --------------------------------
     Mouse hover
  -------------------------------- */

  menu.addEventListener("mousemove", (event) => {
    const button = event.target.closest("button[role='option']");

    if (!button) return;

    currentFocusIndex = menuItems.indexOf(button);
    updateActiveOption();
  });

  /* --------------------------------
     Close when clicking outside
  -------------------------------- */

  document.addEventListener("pointerdown", (event) => {
    if (!dropdown.contains(event.target)) {
      closeMenu();
    }
  });

  /* --------------------------------
     Initial state
  -------------------------------- */

  updateClearButton();
  renderMenuItems("");

  selectionStatus.textContent = "Start typing to search for a character.";
});
