// ====================================
// NAVIGATION MENU TOGGLE
// ====================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ====================================
// ACTIVE NAVIGATION HIGHLIGHT
// ====================================

window.addEventListener('scroll', () => {
    let current = '';

    // Get all sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Check if section is in viewport
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ====================================
// SMOOTH SCROLLING
// ====================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Also handle CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = ctaButton.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ====================================
// SCROLL REVEAL ANIMATIONS
// ====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll(
        '.about-text, .portfolio-item, .skill-card, .tool-item'
    );
    
    elementsToObserve.forEach(element => {
        element.classList.add('scroll-element');
        observer.observe(element);
    });
});

// ====================================
// FORM HANDLING
// ====================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    // Let Formspree handle the submission naturally
    // Just show loading state and disable button
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span>';
    
    // Form will submit to Formspree naturally
    // After submission, Formspree will redirect back
});

// ====================================
// NOTIFICATION SYSTEM
// ====================================

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles inline
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(168, 85, 247, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        animation: slideInUp 0.4s ease-out;
        border: 1px solid ${type === 'success' ? 'rgba(168, 85, 247, 0.5)' : 'rgba(239, 68, 68, 0.5)'};
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                transform: translateY(100px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutDown {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(100px);
                opacity: 0;
            }
        }
    `;
    
    if (!document.head.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.4s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 4000);
}

// ====================================
// PARALLAX EFFECT
// ====================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ====================================
// BUTTON HOVER ANIMATION
// ====================================

const buttons = document.querySelectorAll('.cta-button, .submit-btn, .tool-item');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
        `;
        
        // Add ripple animation
        if (!document.head.querySelector('style[data-ripple]')) {
            const rippleStyle = document.createElement('style');
            rippleStyle.setAttribute('data-ripple', 'true');
            rippleStyle.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(rippleStyle);
        }
        
        if (button.style.position !== 'absolute' && button.style.position !== 'relative' && button.style.position !== 'fixed') {
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
        }
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ====================================
// PAGE LOAD ANIMATIONS
// ====================================

window.addEventListener('load', () => {
    // Trigger initial animations
    const heroElements = document.querySelectorAll(
        '.hero-title, .hero-subtitle, .hero-tagline, .cta-button'
    );
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '1';
    });
});

// ====================================
// NAVBAR BLUR ON SCROLL
// ====================================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(168, 85, 247, 0.2)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(168, 85, 247, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ====================================
// CURSOR GLOW EFFECT
// ====================================

const createCursorGlow = () => {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid rgba(168, 85, 247, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
        transform: translate(-50%, -50%);
        display: none;
    `;
    
    document.body.appendChild(glow);
    
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        glow.style.display = 'block';
    });
    
    document.addEventListener('mouseleave', () => {
        glow.style.display = 'none';
    });
};

// Initialize cursor glow (optional - can be disabled on mobile)
if (!isTouchDevice()) {
    createCursorGlow();
}

function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

// ====================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ====================================

const observeAnimations = () => {
    const elements = document.querySelectorAll(
        '.section-title, .about-content, .portfolio-item, .skill-card, .contact-form, .contact-info'
    );
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        animationObserver.observe(element);
    });
};

// Call when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeAnimations);
} else {
    observeAnimations();
}

// ====================================
// RANDOM GLITCH EFFECT (Optional Enhancement)
// ====================================

const addGlitchEffect = () => {
    const glitchElements = document.querySelectorAll('.glow-text');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addGlitchEffect);
} else {
    addGlitchEffect();
}

// ====================================
// PERFORMANCE OPTIMIZATION
// ====================================

// Lazy load images (if you add images later)
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                entry.target.removeAttribute('data-src');
                observer.unobserve(entry.target);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
} else {
    lazyLoadImages();
}

// ====================================
// SCROLL TO TOP BUTTON
// ====================================

const createScrollToTop = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(192, 132, 252, 0.9));
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 999;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(168, 85, 247, 0.4);
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'translateY(100px)';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 8px 30px rgba(168, 85, 247, 0.6)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 5px 20px rgba(168, 85, 247, 0.4)';
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createScrollToTop);
} else {
    createScrollToTop();
}

// ====================================
// KEYBOARD SHORTCUTS
// ====================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ====================================
// ACCESSIBILITY IMPROVEMENTS
// ====================================

// Focus visible on interactive elements
const interactiveElements = document.querySelectorAll(
    'a, button, input, textarea'
);

interactiveElements.forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid rgba(168, 85, 247, 0.7)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

console.log('✨ Mohamed Abdalrahman Portfolio - Loaded Successfully!');
