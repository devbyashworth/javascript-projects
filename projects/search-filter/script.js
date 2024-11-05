document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.cards');
    const searchInput = document.getElementById('search-input');
    const nothingFound = document.getElementById('nothing-alert');

    const filterIcons = searchQuery => {
        let number = 0;

        cards.forEach(card => {
            const name = card.querySelector('.name').textContent.toLowerCase();

            if (name.includes(searchQuery.toLowerCase())) {
                nothingFound.style.display = 'none';
                card.style.display = 'flex';
                number++;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (number === 0) {
            nothingFound.style.display = 'block';
        }
    };

    searchInput.addEventListener('input', () => {
        const searchQuery = searchInput.value.trim();
        filterIcons(searchQuery);
    });
});
