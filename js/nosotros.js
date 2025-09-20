// Nosotros page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load navbar and footer with correct paths for subdirectory
    fetch('../html/navbar.html')
        .then((res) => res.text())
        .then((html) => {
            const navbarContainer = document.getElementById('navbar');
            if (!navbarContainer) return;
            navbarContainer.innerHTML = html;
            
            // Load navbar script and initialize it
            const ensureNavbarScript = () => new Promise((resolve, reject) => {
                if (window.initNavbar) return resolve();
                const existing = Array.from(document.scripts).find(s => (s.src || '').includes('../layout/navbar/navbar.js'));
                if (existing) {
                    existing.addEventListener('load', () => resolve());
                    existing.addEventListener('error', reject);
                    if (existing.dataset.loaded === 'true' || existing.readyState === 'complete') return resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = '../layout/navbar/navbar.js';
                script.defer = true;
                script.onload = () => { script.dataset.loaded = 'true'; resolve(); };
                script.onerror = reject;
                document.head.appendChild(script);
            });

            ensureNavbarScript()
                .then(() => {
                    if (typeof window.initNavbar === 'function') {
                        window.initNavbar();
                    }
                })
                .catch((err) => console.error('Error inicializando navbar:', err));
        })
        .catch((err) => console.error('Error cargando navbar:', err));

    // Load footer
    fetch('../html/footer.html')
        .then((res) => res.text())
        .then((html) => {
            const footerContainer = document.getElementById('footer');
            if (!footerContainer) return;
            footerContainer.innerHTML = html;
        })
        .catch((err) => console.error('Error cargando footer:', err));

    // Toggle clase 'scrolled' en body para estilos del navbar al hacer scroll
    const toggleScrolled = () => {
        if (window.scrollY > 20) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    };
    toggleScrolled();
    window.addEventListener('scroll', toggleScrolled, { passive: true });
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all elements with reveal class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Counter animation for stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const suffix = counter.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 20);
        });
    };

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.story-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero-about');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Team member hover effects
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    console.log('Nosotros page initialized successfully');
});
