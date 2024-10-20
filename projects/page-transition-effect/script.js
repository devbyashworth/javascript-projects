document.addEventListener('DOMContentLoaded', () => {
    let targetPage;

    const navItems = document.querySelectorAll('.nav > li');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('active')) return;

            document.querySelector('.nav > li.active')?.classList.remove('active');
            this.classList.add('active');
            targetPage = this.getAttribute('data-targetPage');
            HidePage(document.querySelector('.page.active'));
        });
    });

    function ShowPage(page) {
        page.classList.add('active', 'page-showAnimation');

        page.addEventListener('animationend', function handleAnimationEnd() {
            page.classList.remove('page-showAnimation');
            page.removeEventListener('animationend', handleAnimationEnd);
        });
    }

    function HidePage(page) {
        page.classList.add('page-hideAnimation');

        page.addEventListener('animationend', function handleAnimationEnd() {
            page.classList.remove('active', 'page-hideAnimation');
            page.removeEventListener('animationend', handleAnimationEnd);
            ShowPage(document.querySelector(targetPage));
        });
    }
});
