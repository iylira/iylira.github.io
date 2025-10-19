// Typing Animation
const messages = [
    "A custom built language",
    "Designed for beauty and speed",
    'whisper("Hello World!")'
];

let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeMessage() {
    const typingText = document.querySelector('.typing-text');
    const currentMessage = messages[messageIndex];

    if (!isDeleting) {
        typingText.textContent = currentMessage.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentMessage.length) {
            isDeleting = true;
            setTimeout(typeMessage, pauseTime);
            return;
        }
    } else {
        typingText.textContent = currentMessage.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
        }
    }

    setTimeout(typeMessage, isDeleting ? deletingSpeed : typingSpeed);
}

// Particle Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 1-3px
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random horizontal position
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random animation duration between 10-25 seconds
        const duration = Math.random() * 15 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay to stagger the animations
        const delay = Math.random() * 10;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Footer stars animation
function createFooterStars() {
    const footerStars = document.querySelector('.footer-stars');
    const starCount = 30;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'particle';
        
        const size = Math.random() * 2 + 0.5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        const duration = Math.random() * 3 + 2;
        star.style.animation = `twinkle ${duration}s ease-in-out infinite`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        
        footerStars.appendChild(star);
    }
}

// Twinkle animation for footer stars
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Start animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeMessage, 500);
    createParticles();
    createFooterStars();
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Code Tab Switching
const tabButtons = document.querySelectorAll('.tab-button');
const codeBlocks = document.querySelectorAll('.code-block');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');

        // Remove active class from all tabs and code blocks
        tabButtons.forEach(btn => btn.classList.remove('active'));
        codeBlocks.forEach(block => block.classList.remove('active'));

        // Add active class to clicked tab and corresponding code block
        button.classList.add('active');
        document.querySelector(`.${lang}-code`).classList.add('active');
    });
});

// Scroll Animation for Sections
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections that need animation
document.querySelectorAll('.features, .code-section, .about').forEach(section => {
    observer.observe(section);
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for floating elements on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});