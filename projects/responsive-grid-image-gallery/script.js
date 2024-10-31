const init = (evt) => {
    if (!evt.target.closest(".item")) return;
    let hero = document.querySelector("div[data-position='0']");
    let target = evt.target.parentElement;
    [target.dataset.position, hero.dataset.position] = [hero.dataset.position, target.dataset.position];
}

window.addEventListener("click", init, false)