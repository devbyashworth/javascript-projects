document.addEventListener("DOMContentLoaded", function () {
    const tabMenu = document.querySelector(".tabs-menu");
    const tabs = Array.from(document.querySelectorAll(".tab"));
    const tabPanels = Array.from(document.querySelectorAll(".tab-panels .panel"));

    tabMenu.addEventListener("click", switchTab);

    function switchTab(evt) {
        const clickedTab = evt.target.closest("li");
        if (!clickedTab) return;

        const activeClass = "active";
        tabs.forEach(tab => tab.classList.remove(activeClass));
        clickedTab.classList.add(activeClass);

        const activePanelId = clickedTab.children[0].getAttribute("href");
        const activePanel = document.querySelector(activePanelId);

        tabPanels.forEach(panel => {
            panel.hidden = true;
        });
        activePanel.hidden = false;
    }
});
