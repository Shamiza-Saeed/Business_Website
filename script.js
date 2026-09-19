// Feature 1: Responsive Navigation Menu (Hamburger)
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Feature 2: Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const icon = darkModeToggle.querySelector('i');

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Icon ko moon se sun mein badalna
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});// Feature 3: Typing Animation
const typingText = document.getElementById('typing-text');
const words = ['Web Development.', 'Modern UI/UX.', 'Creative Solutions.'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Typing speed control
    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Word complete hone par pause
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Next word
        typeSpeed = 500; // Naya word shuru hone se pehle pause
    }

    setTimeout(typeEffect, typeSpeed);
}

// Page load hone par animation start karein
document.addEventListener('DOMContentLoaded', typeEffect);
// Feature 4: Animated Counters (Scroll karne par activate hoga)
const counters = document.querySelectorAll('.counter');
const aboutSection = document.getElementById('about');

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            
            // Animation ki speed
            const increment = target / 100;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20); // 20ms baad update hoga
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// Intersection Observer (Check karne ke liye ke About section screen par hai ya nahi)
if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.disconnect(); // Ek baar animate hone ke baad dobara nahi chalega
        }
    }, { threshold: 0.5 }); // Jab 50% section screen par dikhega tab chalega

    observer.observe(aboutSection);
}// Feature 5: FAQ Accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector('.icon');
        
        // Active panel toggle
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.textContent = '+';
        } else {
            // Baaki open accordions ko close karna
            document.querySelectorAll('.accordion-content').forEach(item => item.style.maxHeight = null);
            document.querySelectorAll('.icon').forEach(i => i.textContent = '+');

            content.style.maxHeight = content.scrollHeight + 'px';
            icon.textContent = '-';
        }
    });
});// Feature 6: Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form Validation
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const status = document.getElementById('form-status');

        // Reset error messages
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

        if (name.value.trim() === '') {
            name.nextElementSibling.textContent = 'Name is required.';
            isValid = false;
        }

        if (email.value.trim() === '' || !email.value.includes('@')) {
            email.nextElementSibling.textContent = 'Enter a valid email address.';
            isValid = false;
        }

        if (message.value.trim() === '') {
            message.nextElementSibling.textContent = 'Message cannot be empty.';
            isValid = false;
        }

        if (isValid) {
            status.style.color = '#10b981';
            status.textContent = 'Thank you! Your message has been sent successfully.';
            contactForm.reset();
        }
    });
}
function openModal(title, description) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDescription').innerText = description;
    document.getElementById('caseStudyModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('caseStudyModal').style.display = 'none';
}

// Window ke bahar click karne par modal band ho jaye
window.onclick = function(event) {
    const modal = document.getElementById('caseStudyModal');
    if (event.target === modal) {
        closeModal();
    }
};