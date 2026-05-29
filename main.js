// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Only run custom cursor logic if it's not a touch device
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
            
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
        });

        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'translate(0px, 0px)';
            
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between menu and x
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

// Parallax Hero Background (Only on desktop to avoid jank on mobile)
if (window.matchMedia("(min-width: 768px)").matches) {
    const heroBg = document.querySelector('.hero-bg-image');
    window.addEventListener('scroll', () => {
        const scrollVal = window.scrollY;
        if(scrollVal < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollVal * 0.4}px)`;
        }
    });
}

// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible', 'active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up, .reveal').forEach(element => {
    observer.observe(element);
});

setTimeout(() => {
    document.querySelector('.hero-text').classList.add('visible');
}, 100);
