const dropdown = document.getElementById("dropdown");
const trigger = document.getElementById("trigger");
const menu = document.getElementById("menu");
const pages = dropdown.querySelectorAll(".page");

/* =========================
PAGE NAVIGATION
========================= */

const goTo = (name) => {
  pages.forEach((page) => {
    const isCurrent = page.dataset.page === name;

    page.classList.toggle("is-active", isCurrent);
    page.setAttribute("aria-hidden", String(!isCurrent));

    if (isCurrent) {
      menu.style.setProperty("--h", `${page.scrollHeight}px`);
    }
  });
};

/* =========================
OPEN / CLOSE
========================= */

const setOpen = (open) => {
  dropdown.classList.toggle("open", open);

  trigger.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-hidden", String(!open));

  if (open) {
    goTo("root");
  } else {
    goTo("root");
    trigger.focus();
  }
};

/* =========================
CLICK HANDLING
========================= */

dropdown.addEventListener("click", (event) => {
  const target = event.target;

  /* Trigger */
  if (target.closest("#trigger")) {
    setOpen(!dropdown.classList.contains("open"));
    return;
  }

  /* Open submenu */
  const drill = target.closest("[data-open]");

  if (drill) {
    goTo(drill.dataset.open);
    return;
  }

  /* Back */
  const back = target.closest("[data-back]");

  if (back) {
    goTo(back.dataset.back);
  }
});

/* =========================
CLICK OUTSIDE
========================= */

document.addEventListener("click", (event) => {
  if (!event.target.closest("#dropdown")) {
    setOpen(false);
  }
});

/* =========================
ESCAPE KEY
========================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && dropdown.classList.contains("open")) {
    setOpen(false);
  }
});

/* =========================
KEYBOARD NAVIGATION
========================= */

dropdown.addEventListener("keydown", (event) => {
  const currentPage = dropdown.querySelector(".page.is-active");

  if (!currentPage) {
    return;
  }

  const items = [
    ...currentPage.querySelectorAll(
      'button[role="menuitem"]:not([aria-disabled="true"])',
    ),
  ];

  const currentIndex = items.indexOf(document.activeElement);

  if (event.key === "ArrowDown") {
    event.preventDefault();

    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;

    items[nextIndex]?.focus();
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();

    const previousIndex =
      currentIndex > 0 ? currentIndex - 1 : items.length - 1;

    items[previousIndex]?.focus();
  }

  if (event.key === "Home") {
    event.preventDefault();
    items[0]?.focus();
  }

  if (event.key === "End") {
    event.preventDefault();
    items[items.length - 1]?.focus();
  }

  if (event.key === "ArrowRight") {
    const drill = document.activeElement?.closest("[data-open]");

    if (drill) {
      event.preventDefault();
      goTo(drill.dataset.open);

      requestAnimationFrame(() => {
        const activePage = dropdown.querySelector(".page.is-active");
        activePage?.querySelector("button")?.focus();
      });
    }
  }

  if (event.key === "ArrowLeft") {
    const back = currentPage.querySelector("[data-back]");

    if (back) {
      event.preventDefault();
      goTo(back.dataset.back);

      requestAnimationFrame(() => {
        dropdown
          .querySelector(".page.is-active")
          ?.querySelector("button")
          ?.focus();
      });
    }
  }
});

/* =========================
INITIAL STATE
========================= */

goTo("root");
