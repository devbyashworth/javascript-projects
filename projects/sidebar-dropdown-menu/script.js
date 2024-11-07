const subMenus = document.querySelectorAll(".sub-menu");
const buttons = document.querySelectorAll(".sidebar ul button");

const onClick = item => {
    subMenus.forEach(menu => {
        menu.style.height = "0px";
    });

    buttons.forEach(button => {
        button.classList.remove("active");
    });
    
    if (!item.nextElementSibling) {
        item.classList.remove("active");
        return;
    }
    
    const subMenu = item.nextElementSibling;
    const ul = subMenu.querySelector("ul");

    if (!subMenu.clientHeight) {
        subMenu.style.height = `${ul.clientHeight}px`;
        item.classList.add("active");
    } else {
        subMenu.style.height = "0px";
        item.classList.remove("active");
    }
}