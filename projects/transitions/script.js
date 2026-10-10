const root = document.documentElement;
const bubbles = document.querySelector(".bubbles");
const secondBubble = document.querySelector(".bubble__second");
const navigationLinks = document.querySelectorAll(".navigation a");

let leavingTo = null;

/* ========================================
PAGE THEME
======================================== */

const setTheme = (theme) => {
  if (theme === "dark" || theme === "light") {
    root.dataset.theme = theme;
  }
};

/* ========================================
NAVIGATION
======================================== */

navigationLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const currentPage = link.getAttribute("aria-current") === "page";

    /*
     * Allow the browser to handle the current page normally.
     */
    if (currentPage) {
      return;
    }

    /*
     * Prevent multiple transition requests while
     * the current transition is running.
     */
    if (leavingTo) {
      event.preventDefault();
      return;
    }

    const destination = link.getAttribute("href");
    const theme = link.dataset.theme;

    if (!destination) {
      return;
    }

    event.preventDefault();

    leavingTo = destination;

    setTheme(theme);

    secondBubble.dataset.target = theme || "";

    bubbles.classList.remove("holding");
    bubbles.classList.add("covering");
  });
});

/* ========================================
TRANSITION END
======================================== */

secondBubble.addEventListener("animationend", (event) => {
  /*

* Only navigate after the outgoing transition
* has completely covered the page.
  */
  if (event.animationName !== "bubble-second-move") {
    return;
  }

  if (!leavingTo) {
    return;
  }

  try {
    sessionStorage.setItem("page-transition-entering", "true");
  } catch {
    // Continue normally if sessionStorage is unavailable.
  }

  window.location.href = leavingTo;
});

/* ========================================
PAGE SHOW / BACK-FORWARD CACHE
======================================== */

window.addEventListener("pageshow", (event) => {
  /*

* pageshow can fire when returning through the
* browser's back/forward cache.
  */
  if (event.persisted) {
    leavingTo = null;

    bubbles.classList.remove("covering", "holding");

    root.classList.remove("entering");
  }
});

/* ========================================
ENTERING STATE CLEANUP
======================================== */

window.addEventListener("load", () => {
  if (!root.classList.contains("entering")) {
    return;
  }

  const cleanup = () => {
    root.classList.remove("entering");
  };

  secondBubble.addEventListener(
    "animationend",
    (event) => {
      if (event.animationName === "hold") {
        cleanup();
      }
    },
    { once: true },
  );
});
