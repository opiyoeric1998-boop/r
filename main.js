// main.js - UPDATED FOR RESPONSIVE DESIGN

// ==================== NAVBAR SCROLL EFFECT ====================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    const scrollPosition = window.scrollY;
    
    // Add 'scrolled' class when user scrolls down more than 50px
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active link highlighting
    highlightActiveLink();
});

// ==================== MOBILE MENU TOGGLE ====================
const openMenuBtn = document.getElementById('open-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const navMenu = document.querySelector('.nav_menu');

// Open mobile menu
if (openMenuBtn) {
    openMenuBtn.addEventListener('click', () => {
        navMenu.classList.add('active');
        openMenuBtn.style.display = 'none';
        closeMenuBtn.style.display = 'inline-block';
    });
}

// Close mobile menu
if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => {
        navMenu.classList.remove('active');
        openMenuBtn.style.display = 'inline-block';
        closeMenuBtn.style.display = 'none';
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav_menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            if (openMenuBtn) openMenuBtn.style.display = 'inline-block';
            if (closeMenuBtn) closeMenuBtn.style.display = 'none';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        navMenu && 
        navMenu.classList.contains('active') &&
        !e.target.closest('.nav_menu') && 
        !e.target.closest('#open-menu-btn') && 
        !e.target.closest('#close-menu-btn')) {
        navMenu.classList.remove('active');
        if (openMenuBtn) openMenuBtn.style.display = 'inline-block';
        if (closeMenuBtn) closeMenuBtn.style.display = 'none';
    }
});

// ==================== ACTIVE LINK HIGHLIGHTING ====================
function highlightActiveLink() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav_menu a');
    
    let current = '';
    // Adjust scroll position based on screen size
    const headerHeight = window.innerWidth <= 768 ? 80 : 100;
    const scrollPosition = window.scrollY + headerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id') || 'home';
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}` || (current === 'home' && href === '#home')) {
            link.classList.add('active');
        }
    });
}

// ==================== FAQ TOGGLE FUNCTIONALITY ====================
function setupFAQs() {
    const faqs = document.querySelectorAll('.faq');
    
    faqs.forEach(faq => {
        // Add click event listener to each FAQ
        faq.addEventListener('click', () => {
            // On mobile, close other FAQs when opening a new one (accordion behavior)
            if (window.innerWidth <= 768) {
                const isActive = faq.classList.contains('active');
                if (!isActive) {
                    faqs.forEach(otherFaq => {
                        otherFaq.classList.remove('active');
                        const otherIcon = otherFaq.querySelector('.faq_icon i');
                        if (otherIcon) {
                            otherIcon.classList.remove('fa-minus');
                            otherIcon.classList.add('fa-plus');
                        }
                    });
                }
            }
            
            // Toggle active class on clicked FAQ
            faq.classList.toggle('active');
            
            // Change icon from plus to minus
            const icon = faq.querySelector('.faq_icon i');
            if (icon) {
                if (faq.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            }
        });
    });
    
    // Close FAQ when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !e.target.closest('.faq')) {
            faqs.forEach(faq => {
                faq.classList.remove('active');
                const icon = faq.querySelector('.faq_icon i');
                if (icon) {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
        }
    });
}

// ==================== TESTIMONIAL SLIDER FUNCTIONALITY ====================
function setupTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial_dot');
    
    // If no testimonials or dots, exit
    if (testimonials.length === 0 || dots.length === 0) return;
    
    let currentTestimonial = 0;
    const totalTestimonials = testimonials.length;
    
    // Function to show specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
            testimonial.classList.remove('active');
        });
        
        // Show current testimonial
        testimonials[index].style.display = 'block';
        testimonials[index].classList.add('active');
        
        // Update dots
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === index);
        });
        
        currentTestimonial = index;
    }
    
    // Function for next testimonial
    function nextTestimonial() {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= totalTestimonials) nextIndex = 0;
        showTestimonial(nextIndex);
    }
    
    // Function for previous testimonial
    function prevTestimonial() {
        let prevIndex = currentTestimonial - 1;
        if (prevIndex < 0) prevIndex = totalTestimonials - 1;
        showTestimonial(prevIndex);
    }
    
    // Initialize based on screen size
    function initializeTestimonials() {
        if (window.innerWidth <= 768) {
            // Mobile: Show slider functionality
            showTestimonial(0);
        } else {
            // Desktop: Show all testimonials
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'block';
            });
            dots.forEach(dot => {
                dot.style.display = 'none';
            });
        }
    }
    
    initializeTestimonials();
    
    // Add click events to dots (mobile only)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                showTestimonial(index);
            }
        });
    });
    
    // Auto-rotate testimonials only on desktop
    let autoSlideInterval;
    if (window.innerWidth > 768) {
        autoSlideInterval = setInterval(nextTestimonial, 7000);
    }
    
    // Pause auto-slide on hover (desktop only)
    const testimonialsContainer = document.querySelector('.testimonials_container');
    if (testimonialsContainer && window.innerWidth > 768) {
        testimonialsContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        testimonialsContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextTestimonial, 7000);
        });
    }
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialsContainer?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    testimonialsContainer?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        if (window.innerWidth <= 768) {
            const swipeThreshold = 30;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next testimonial
                    nextTestimonial();
                } else {
                    // Swipe right - previous testimonial
                    prevTestimonial();
                }
            }
        }
    }
}

// ==================== ENHANCED TESTIMONIAL VISIBILITY ====================
function enhanceTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each testimonial
    testimonials.forEach(testimonial => {
        observer.observe(testimonial);
    });
}

// ==================== TOUCH-FRIENDLY INTERACTIONS ====================
function setupTouchInteractions() {
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll('.btn, .category, .course_item, .faq, .testimonial_dot');
    
    touchElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
        el.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
        
        el.addEventListener('touchcancel', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });
}

// ==================== MOBILE VIEWPORT FIX ====================
function setupViewportFix() {
    // Fix for mobile viewport height issues
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
}

// ==================== RESPONSIVE ANIMATION HANDLER ====================
function setupResponsiveAnimations() {
    // Prevent animations during resize for better performance
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 100);
    });
}

// ==================== INITIALIZE ====================
window.addEventListener('load', function() {
    // Initialize navbar state
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
    
    // Set initial state for mobile menu buttons based on screen size
    if (window.innerWidth <= 768) {
        if (openMenuBtn) {
            openMenuBtn.style.display = 'inline-block';
        }
        if (closeMenuBtn) {
            closeMenuBtn.style.display = 'none';
        }
    } else {
        if (openMenuBtn) {
            openMenuBtn.style.display = 'none';
        }
        if (closeMenuBtn) {
            closeMenuBtn.style.display = 'none';
        }
    }
    
    // Highlight active link on page load
    highlightActiveLink();
    
    // Set up FAQ functionality
    setupFAQs();
    
    // Set up testimonials based on screen size
    setupTestimonials();
    
    // Enhance testimonial visibility
    enhanceTestimonials();
    
    // Setup touch interactions
    setupTouchInteractions();
    
    // Setup mobile viewport fix
    setupViewportFix();
    
    // Setup responsive animations
    setupResponsiveAnimations();
    
    console.log('Website initialized for ' + (window.innerWidth <= 768 ? 'mobile' : 'desktop') + ' view');
});

// ==================== RESPONSIVE RESIZE HANDLER ====================
window.addEventListener('resize', function() {
    const isMobile = window.innerWidth <= 768;
    
    // Handle mobile menu reset
    if (!isMobile) {
        // Desktop: Reset mobile menu
        if (navMenu) navMenu.classList.remove('active');
        if (openMenuBtn) openMenuBtn.style.display = 'none';
        if (closeMenuBtn) closeMenuBtn.style.display = 'none';
        
        // Desktop: Show all testimonials
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.testimonial_dot');
        
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'block';
        });
        
        dots.forEach(dot => {
            dot.style.display = 'none';
        });
    } else {
        // Mobile: Setup mobile view
        const navMenuActive = navMenu && navMenu.classList.contains('active');
        
        if (!navMenuActive) {
            if (openMenuBtn) openMenuBtn.style.display = 'inline-block';
            if (closeMenuBtn) closeMenuBtn.style.display = 'none';
        }
        
        // Mobile: Reset testimonial slider
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.testimonial_dot');
        
        if (testimonials.length > 0 && dots.length > 0) {
            testimonials.forEach((testimonial, index) => {
                testimonial.style.display = index === 0 ? 'block' : 'none';
            });
            
            dots.forEach(dot => {
                dot.style.display = 'inline-block';
            });
            
            dots[0].classList.add('active');
        }
    }
    
    // Re-run setup functions for new screen size
    setupTestimonials();
    highlightActiveLink();
});

// ==================== SMOOTH SCROLLING FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for same-page anchors
        if (href.startsWith('#') && href !== '#') {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Adjust scroll offset based on screen size
                const headerOffset = window.innerWidth <= 768 ? 70 : 80;
                const targetPosition = targetElement.offsetTop - headerOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (openMenuBtn) openMenuBtn.style.display = 'inline-block';
                    if (closeMenuBtn) closeMenuBtn.style.display = 'none';
                }
            }
        }
    });
});

// ==================== PAGE LOAD ANIMATIONS ====================
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Animate elements on load with responsive delays
    const animateElements = document.querySelectorAll('.header_left, .header_right, .category, .course_item');
    
    animateElements.forEach((element, index) => {
        // Reduce animation delay on mobile for better performance
        const delay = window.innerWidth <= 768 ? 
            Math.min(index * 0.05, 0.3) : // Faster on mobile
            index * 0.1; // Normal on desktop
        
        element.style.animationDelay = `${delay}s`;
    });
    
    // Add responsive image handling
    const images = document.querySelectorAll('.header_right-image img, .course_image img');
    images.forEach(img => {
        img.classList.add('responsive-img');
    });
});

// ==================== KEYBOARD NAVIGATION SUPPORT ====================
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && window.innerWidth <= 768) {
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (openMenuBtn) openMenuBtn.style.display = 'inline-block';
            if (closeMenuBtn) closeMenuBtn.style.display = 'none';
        }
    }
    
    // Tab key navigation enhancement for mobile
    if (e.key === 'Tab' && window.innerWidth <= 768) {
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        // Ensure keyboard focus doesn't go behind mobile menu
        if (navMenu && navMenu.classList.contains('active')) {
            e.preventDefault();
            const firstElement = focusableElements[0];
            if (firstElement) firstElement.focus();
        }
    }
});

// ==================== PERFORMANCE OPTIMIZATIONS ====================
// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    highlightActiveLink();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);




// Science & Technology Page JavaScript
// Add this to your existing main.js file or create a separate science-script.js file

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    const elementsToAnimate = document.querySelectorAll(
        '.domain-card, .step, .tool, .key-point, .feature'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Highlight current section in navigation
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav_menu a');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Initialize functions
    highlightCurrentSection();
    
    // Add interactive hover effects for domain cards
    const domainCards = document.querySelectorAll('.domain-card');
    domainCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click functionality for key points
    const keyPoints = document.querySelectorAll('.key-point');
    keyPoints.forEach(point => {
        point.addEventListener('click', function() {
            this.style.backgroundColor = 'var(--science-light)';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
    });
});