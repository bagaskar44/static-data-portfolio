// Project card interaction functionality
function initProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const isExpanded = card.classList.contains('expanded');
            cards.forEach(c => c.classList.remove('expanded', 'dimmed'));
            if (!isExpanded) {
                card.classList.add('expanded');
                cards.forEach(c => {
                    if (c !== card) c.classList.add('dimmed');
                });
            }
        });
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.project-card')) {
            cards.forEach(card => card.classList.remove('expanded', 'dimmed'));
        }
    });
}

function addSmoothScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

document.addEventListener('DOMContentLoaded', () => {
    initProjectCards();
    addSmoothScrolling();
    console.log('Portfolio loaded successfully!');
});
