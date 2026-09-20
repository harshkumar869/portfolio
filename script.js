/* =========================================
   1. MOBILE MENU TOGGLE
   ========================================= */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        // Toggle icon between bars and times
        const icon = navToggle.querySelector('i');
        if(navMenu.classList.contains('show-menu')){
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
}

// Hide menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

/* =========================================
   2. SCROLL PROGRESS BAR
   ========================================= */
window.addEventListener('scroll', () => {
    const scrollBar = document.getElementById('scrollBar');
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    scrollBar.style.width = `${scrolled}%`;
});

/* =========================================
   3. HEADER SHADOW ON SCROLL
   ========================================= */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
});

/* =========================================
   4. ACTIVE LINK ON SCROLL
   ========================================= */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100; // Offset for sticky header
        const sectionId = current.getAttribute('id');
        const link = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* =========================================
   5. BACK TO TOP BUTTON
   ========================================= */
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY >= 500) {
        backToTopBtn.classList.add('show-scroll');
    } else {
        backToTopBtn.classList.remove('show-scroll');
    }
});

/* =========================================
   6. DARK/LIGHT THEME TOGGLE
   ========================================= */
const themeButton = document.getElementById('theme-button');
const themeIcon = themeButton.querySelector('i');
const currentTheme = localStorage.getItem('selected-theme');

// Apply saved theme on load
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if(currentTheme === 'dark'){
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

themeButton.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('selected-theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('selected-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
});

/* =========================================
   7. TYPING ANIMATION
   ========================================= */
const typedTextSpan = document.querySelector(".typing-text");
const textArray = ["Developer.", "Problem Solver.", "Student.", "Tech Enthusiast."];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if(typedTextSpan) {
        setTimeout(type, newTextDelay + 250);
    }
});

/* =========================================
   8. PROJECT FILTERING
   ========================================= */
const filterBtns = document.querySelectorAll('.filter-item');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active-filter'));
        // Add active class to clicked button
        btn.classList.add('active-filter');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hide');
            } else {
                const categories = card.getAttribute('data-category').split(' ');
                if (categories.includes(filterValue)) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            }
        });
    });
});

/* =========================================
   9. SCROLL REVEAL & SKILLS ANIMATION
   ========================================= */
const revealElements = document.querySelectorAll('.reveal');
const skillBars = document.querySelectorAll('.skill-percentage');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        // Add active class to reveal elements
        entry.target.classList.add('active');
        
        // Trigger skill bars animation if Skills section
        if (entry.target.id === 'skills') {
            skillBars.forEach(bar => {
                const percent = bar.getAttribute('data-percent');
                bar.style.width = percent;
            });
        }
        
        // Optional: stop observing once revealed
        // observer.unobserve(entry.target);
    });
}, revealOptions);

revealElements.forEach(el => revealOnScroll.observe(el));

/* =========================================
   10. FORM VALIDATION
   ========================================= */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Name validation
        const nameInput = document.getElementById('name');
        const nameGroup = nameInput.closest('.form-group');
        if (nameInput.value.trim() === '') {
            nameGroup.classList.add('error');
            isValid = false;
        } else {
            nameGroup.classList.remove('error');
        }
        
        // Email validation
        const emailInput = document.getElementById('email');
        const emailGroup = emailInput.closest('.form-group');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(emailInput.value.trim())) {
            emailGroup.classList.add('error');
            isValid = false;
        } else {
            emailGroup.classList.remove('error');
        }
        
        // Message validation
        const messageInput = document.getElementById('message');
        const messageGroup = messageInput.closest('.form-group');
        if (messageInput.value.trim() === '') {
            messageGroup.classList.add('error');
            isValid = false;
        } else {
            messageGroup.classList.remove('error');
        }
        
        // If valid, show success message and clear form
        if (isValid) {
            const successMsg = document.getElementById('formSuccess');
            successMsg.style.display = 'block';
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
            
            // In a real scenario, you'd send data to backend here (e.g., via fetch)
        }
    });
    
    // Clear error on input
    const inputs = contactForm.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const group = input.closest('.form-group');
            if (group.classList.contains('error')) {
                group.classList.remove('error');
            }
        });
    });
}
