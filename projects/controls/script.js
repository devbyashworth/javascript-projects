window.onload = function () {
  const usernames = ["aurora", "aurora13", "aurora21"];
  const input = document.getElementById("input");
  const spinner = document.querySelector(".spinner");
  const button = document.querySelector("button");

  const update = (value) => {
    spinner.classList.remove("visible");

    const usernameExists = usernames.some((username) => username === value);

    const invalid = !usernameExists || !value;

    button.disabled = invalid;
    input.classList.toggle("valid", !invalid);
  };

  const debounce = (callback, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback.apply(null, args);
      }, delay);
    };
  };

  const handleStartTyping = () => {
    spinner.classList.add("visible");
  };

  const handleChanges = debounce((input) => {
    const { value } = input.target;
    input.target.classList.toggle("has-value", value);
    update(value);
  }, 500);

  window.handleStartTyping = handleStartTyping;
  window.handleChanges = handleChanges;
};
