const input = document.getElementById("password");

const setCaret = (el) => {
    const range = document.createRange(),
    sel = window.getSelection();
    range.setStart(
        el.childNodes[0], el.innerText.length
    );

    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);
};

const togglePassword = button => {
    button.classList.toggle("showing");
    input.type = input.type === "password" ? "text" : "password";
    input.focus();
    setCaret(input);
}
