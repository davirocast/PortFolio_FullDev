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

// Dynamic Skills Section
const skillsData = [
    { icon: 'bxl-html5', name: 'HTML5 & CSS', level: 80 },
    { icon: 'bxl-javascript', name: 'JavaScript', level: 65 },
    { icon: 'bxl-java', name: 'Java', level: 70 },
    { icon: 'bxl-react', name: 'React, Node.js', level: 60 },
    { icon: 'bxs-data', name: 'SQL & NoSQL', level: 50 }
];

const skillsContainer = document.querySelector('.skills__list');

skillsData.forEach(skill => {
    const skillItem = document.createElement('li');
    skillItem.classList.add('skills__item');
    skillItem.innerHTML = `
        <i class="skills__icon bx ${skill.icon}"></i>
        <span class="skills__name">${skill.name}</span>
        <div class="skills__progress-bar">
            <div class="skills__progress-fill" style="width: 0%" data-level="${skill.level}"></div>
        </div>
    `;
    skillsContainer.appendChild(skillItem);
});

// Animate progress bars on page load
window.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.skills__progress-fill');
    progressBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        setTimeout(() => {
            bar.style.width = `${level}%`;
            bar.style.transition = 'width 1.5s ease-in-out';
        }, 200); // Delay to ensure smooth animation
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

// Dynamic Projects Section
const projectsData = [
    {
        title: 'Tip Calculator',
        description: 'Calculadora interactiva de propinas con diseño neumórfico.',
        link: './projects/tip_calculator/tip_calculator.html'
    },
    {
        title: 'Contador de Palabras',
        description: 'Contador de caracteres y palabras con diseño neumórfico.',
        link: './projects/word_counter/word_counter.html'
    },
    {
        title: 'Convertidor de Moneda',
        description: 'Convertidor de divisas con diseño neumórfico.',
        link: './projects/currency_converter/currency_converter.html'
    }
];

const projectsContainer = document.querySelector('.projects__list');

projectsData.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('projects__card');
    projectCard.innerHTML = `
        <h3 class="projects__card-title">${project.title}</h3>
        <p class="projects__card-description">${project.description}</p>
        <a href="${project.link}" class="projects__card-link" target="_blank">Ver proyecto</a>
    `;
    projectsContainer.appendChild(projectCard);
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


