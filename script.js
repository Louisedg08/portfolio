/* =====================================================
   CARL DE GUZMAN - PORTFOLIO SCRIPTS
   Vanilla JavaScript - No libraries
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Loader.init();
    Navigation.init();
    Typewriter.init();
    ScrollAnimations.init();
    ContactForm.init();
    
    // Fun easter egg
    EasterEgg.init();
});

/* === LOADER === */
const Loader = {
    init() {
        const loader = document.getElementById('loader');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 800);
        });
        
        // Fallback - hide loader after 3 seconds no matter what
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 3000);
    }
};

/* === NAVIGATION === */
const Navigation = {
    init() {
        this.nav = document.getElementById('nav');
        this.toggle = document.getElementById('navToggle');
        this.menu = document.getElementById('navMenu');
        this.links = document.querySelectorAll('.nav-link');
        
        this.lastScrollY = window.scrollY;
        this.isMenuOpen = false;
        
        this.bindEvents();
    },
    
    bindEvents() {
        // Mobile menu toggle
        this.toggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking a link
        this.links.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.toggleMenu();
                }
            });
        });
        
        // Hide/show nav on scroll
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        
        // Close menu on resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.toggleMenu();
            }
        });
    },
    
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.toggle.classList.toggle('active');
        this.menu.classList.toggle('active');
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Only hide/show after scrolling past hero
        if (currentScrollY > 100) {
            if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
                this.nav.classList.add('hidden');
            } else {
                this.nav.classList.remove('hidden');
            }
        } else {
            this.nav.classList.remove('hidden');
        }
        
        this.lastScrollY = currentScrollY;
    }
};

/* === TYPEWRITER EFFECT === */
const Typewriter = {
    phrases: [
        'echo "Hello, World!"',
        'npm run build-something-cool',
        'git commit -m "made it work"',
        'sudo make me a sandwich',
        'ping reality.life',
        './start_adventure.sh',
    ],
    
    init() {
        this.element = document.getElementById('typewriter');
        if (!this.element) return;
        
        this.phraseIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        
        this.type();
    },
    
    type() {
        const currentPhrase = this.phrases[this.phraseIndex];
        
        if (this.isPaused) {
            setTimeout(() => {
                this.isPaused = false;
                this.type();
            }, 1500);
            return;
        }
        
        if (this.isDeleting) {
            // Deleting
            this.element.textContent = currentPhrase.substring(0, this.charIndex - 1);
            this.charIndex--;
            
            if (this.charIndex === 0) {
                this.isDeleting = false;
                this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
            }
        } else {
            // Typing
            this.element.textContent = currentPhrase.substring(0, this.charIndex + 1);
            this.charIndex++;
            
            if (this.charIndex === currentPhrase.length) {
                this.isDeleting = true;
                this.isPaused = true;
            }
        }
        
        // Typing speed: faster when deleting
        const speed = this.isDeleting ? 40 : 80;
        // Add some randomness for human feel
        const randomDelay = Math.random() * 50;
        
        setTimeout(() => this.type(), speed + randomDelay);
    }
};

/* === SCROLL ANIMATIONS === */
const ScrollAnimations = {
    init() {
        this.elements = document.querySelectorAll('[data-aos]');
        
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                }
            );
            
            this.elements.forEach(el => this.observer.observe(el));
        } else {
            // Fallback: show all elements
            this.elements.forEach(el => el.classList.add('aos-animate'));
        }
        
        // Also animate elements that come into view on scroll
        this.animateOnScroll();
    },
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if specified
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                
                // Unobserve after animation
                this.observer.unobserve(entry.target);
            }
        });
    },
    
    animateOnScroll() {
        // Add parallax to gradient orbs
        const orbs = document.querySelectorAll('.gradient-orb');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            orbs.forEach((orb, index) => {
                const speed = index === 0 ? 0.3 : 0.2;
                orb.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }, { passive: true });
    }
};

/* === CONTACT FORM === */
const ContactForm = {
    init() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },
    
    handleSubmit(e) {
        e.preventDefault();
        
        const button = this.form.querySelector('.btn-submit');
        const originalText = button.innerHTML;
        
        // Simulate sending
        button.innerHTML = '<span>Sending...</span>';
        button.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            button.innerHTML = '<span>Message Sent! ✓</span>';
            button.style.background = 'var(--success)';
            
            // Reset form
            this.form.reset();
            
            // Reset button after delay
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 3000);
        }, 1500);
    }
};

/* === EASTER EGG === */
const EasterEgg = {
    konamiCode: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
    currentIndex: 0,
    
    init() {
        document.addEventListener('keydown', (e) => this.checkCode(e));
    },
    
    checkCode(e) {
        if (e.key === this.konamiCode[this.currentIndex]) {
            this.currentIndex++;
            
            if (this.currentIndex === this.konamiCode.length) {
                this.activate();
                this.currentIndex = 0;
            }
        } else {
            this.currentIndex = 0;
        }
    },
    
    activate() {
        // Fun easter egg effect
        document.body.style.transition = 'filter 0.5s ease';
        document.body.style.filter = 'hue-rotate(180deg)';
        
        // Create floating emojis
        const emojis = ['🚀', '💻', '⚡', '🔥', '✨', '🎮'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.cssText = `
                    position: fixed;
                    font-size: 2rem;
                    left: ${Math.random() * 100}vw;
                    top: 100vh;
                    z-index: 9999;
                    pointer-events: none;
                    animation: floatUp 3s ease-out forwards;
                `;
                document.body.appendChild(emoji);
                
                setTimeout(() => emoji.remove(), 3000);
            }, i * 100);
        }
        
        // Add floating animation
        if (!document.getElementById('easter-egg-style')) {
            const style = document.createElement('style');
            style.id = 'easter-egg-style';
            style.textContent = `
                @keyframes floatUp {
                    to {
                        transform: translateY(-120vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Reset after 5 seconds
        setTimeout(() => {
            document.body.style.filter = '';
        }, 5000);
        
        console.log('🎮 Achievement Unlocked: You found the easter egg!');
    }
};

/* === SMOOTH SCROLL POLYFILL === */
// For browsers that don't support smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            
            const navHeight = document.getElementById('nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* === CURSOR GLOW EFFECT === */
// Subtle glow that follows cursor on desktop
if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(glow);
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateGlow() {
        // Smooth follow
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        
        requestAnimationFrame(animateGlow);
    }
    
    animateGlow();
}

/* === CONSOLE MESSAGE === */
console.log('%c👋 Hey there, curious one!', 'font-size: 20px; font-weight: bold; color: #22d3ee;');
console.log('%cLooking for something interesting?', 'font-size: 14px; color: #94a3b8;');
console.log('%cTry the Konami Code 🎮', 'font-size: 12px; color: #64748b;');
