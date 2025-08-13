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

// Skill highlighting functionality
function initSkillShowcase() {
    const skillNodes = document.querySelectorAll('.skill-node');
    const projectCards = document.querySelectorAll('.project-card');
    
    skillNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const skill = node.dataset.skill;
            projectCards.forEach(card => {
                if (card.dataset.skill.includes(skill)) {
                    card.classList.add('highlighted');
                }
            });
        });
        
        node.addEventListener('mouseleave', () => {
            projectCards.forEach(card => card.classList.remove('highlighted'));
        });
    });
}

function addSmoothScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const dataViz = document.getElementById('dataVisualization');
        if (dataViz) {
            dataViz.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Scroll indicator click functionality
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const projectsSection = document.querySelector('.projects');
    
    scrollIndicator.addEventListener('click', () => {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Hide scroll indicator when scrolled
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '0.7';
        }
    });
}

// Experience Section Animation
function initExperienceAnimation() {
    const experienceItems = document.querySelectorAll('.experience-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    experienceItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initProjectCards();
    initSkillShowcase();
    addSmoothScrolling();
    addParallaxEffect();
    initScrollIndicator();
    initExperienceAnimation();
    console.log('Portfolio loaded successfully!');
});