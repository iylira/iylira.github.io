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

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeMessage, 500);
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
