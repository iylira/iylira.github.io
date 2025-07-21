// script.js
const texts = [
    "whisper("Hello World")",
    "Designed for beauty and speed.",
    "Powerful, expressive, and intuitive.",
    "Under Development..."
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 150; // Speed of typing
let deletingSpeed = 50; // Speed of deleting
let pauseBetweenWords = 2000; // Pause after completing a word

const typingTextElement = document.getElementById("typing-text");

function typeText() {
    const currentText = texts[currentTextIndex];

    // Type the current character
    if (isDeleting) {
        typingTextElement.textContent = currentText.substring(0, currentCharIndex--);
    } else {
        typingTextElement.textContent = currentText.substring(0, currentCharIndex++);
    }

    // If the text is fully typed, delete after a short pause
    if (!isDeleting && currentCharIndex === currentText.length) {
        setTimeout(() => {
            isDeleting = true;
            typeText();
        }, pauseBetweenWords);
    } 
    // If it's deleting and reaches the beginning, move to the next text
    else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        setTimeout(typeText, 500); // Short pause before typing next text
    } else {
        setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
    }
}

// Start the typing effect when the page loads
window.onload = function() {
    typeText();
};
