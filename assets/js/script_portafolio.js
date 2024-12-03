// Smooth scrolling for navigation
document.querySelectorAll('.header__menu-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Menu toggle functionality
const menuToggle = document.querySelector('.header__menu-toggle');
const menu = document.querySelector('.header__menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active'); // Show/hide menu
});

// Close menu after clicking a link (for mobile)
document.querySelectorAll('.header__menu-link').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

// Animations for Skill Items
const skillItems = document.querySelectorAll('.skills__item');

skillItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transform = 'scale(1.1)';
        item.style.transition = 'transform 0.3s ease';
    });

    item.addEventListener('mouseout', () => {
        item.style.transform = 'scale(1)';
    });
});

// Back to top button (optional)
const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize animations or effects on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('Page fully loaded and scripts initialized!');
});


