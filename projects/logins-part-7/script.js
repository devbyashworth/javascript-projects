const card = document.querySelector("#authCard");

const navButtons = document.querySelectorAll(".nav-button");

const switchButtons = document.querySelectorAll("[data-switch]");

const forms = document.querySelectorAll(".auth-form");

const passwordButtons = document.querySelectorAll(".toggle-password");

let resizeTimer;

/* ========================================
   SELECT VIEW
======================================== */

const selectView = (view) => {
  const isSignIn = view === "signin";

  /*
   * Desktop:
   * - Forms move vertically
   * - Hero moves vertically
   * - Active indicator moves vertically
   *
   * Mobile:
   * - CSS switches the active form directly
   * - Hero moves horizontally
   */

  if (window.innerWidth <= 760) {
    forms.forEach((form) => {
      form.classList.toggle("active", form.id === view);
    });

    card.style.setProperty("--hero", isSignIn ? "0%" : "-50%");

    card.style.setProperty("--active", isSignIn ? "0%" : "33.33%");
  } else {
    card.style.setProperty("--forms", isSignIn ? "0%" : "-50%");

    card.style.setProperty("--hero", isSignIn ? "0%" : "-50%");

    card.style.setProperty("--active", isSignIn ? "0%" : "50%");

    forms.forEach((form) => {
      form.classList.toggle("active", form.id === view);
    });
  }

  navButtons.forEach((button) => {
    const isActive = button.dataset.view === view;

    button.classList.toggle("active", isActive);

    button.setAttribute("aria-selected", String(isActive));
  });
};

/* ========================================
   NAVIGATION BUTTONS
======================================== */

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectView(button.dataset.view);
  });
});

/* ========================================
   INLINE SWITCH BUTTONS
======================================== */

switchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectView(button.dataset.switch);
  });
});

/* ========================================
   PASSWORD VISIBILITY
======================================== */

passwordButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.parentElement.querySelector("input");

    const icon = button.querySelector("[data-lucide]");

    const isPassword = input.type === "password";

    input.type = isPassword ? "text" : "password";

    button.setAttribute(
      "aria-label",
      isPassword ? "Hide password" : "Show password",
    );

    button.setAttribute("aria-pressed", String(isPassword));

    if (icon) {
      icon.setAttribute("data-lucide", isPassword ? "eye-off" : "eye");

      lucide.createIcons();
    }
  });
});

/* ========================================
   FORM VALIDATION
======================================== */

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (form.id === "signup") {
      const password = form.querySelector("#signUpPassword").value;

      const confirmPassword = form.querySelector("#confirmPassword").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match.");

        return;
      }
    }

    /*
     * This is where you would connect
     * your real authentication API.
     */

    console.log(`${form.id} submitted successfully`);
  });
});

/* ========================================
   HANDLE RESIZE
======================================== */

window.addEventListener("resize", () => {
  card.classList.add("resizing");

  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    card.classList.remove("resizing");

    const activeButton = document.querySelector(".nav-button.active");

    if (activeButton) {
      selectView(activeButton.dataset.view);
    }
  }, 150);
});

/* ========================================
   INITIALIZE
======================================== */

selectView("signin");

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}
