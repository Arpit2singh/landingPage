document.addEventListener('DOMContentLoaded', () => {
    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ---- Hamburger Menu Toggle ----
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const menuWrapper = document.getElementById('nav-menu-wrapper');
    if (menuToggle && menuWrapper) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            menuWrapper.classList.toggle('active');
        });

        // Close menu when clicking a link
        menuWrapper.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                menuWrapper.classList.remove('active');
            });
        });
    }

    // ---- Smooth Scroll for Nav Links ----
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Dynamic Workflow Scroll Animation ----
    const steps = document.querySelectorAll('.workflow-step');
    const pathFill = document.getElementById('workflow-path-fill');
    const workflowContainer = document.querySelector('.workflow-container');
    
    // Set up step observer to activate nodes when in view
    const stepObserverOptions = {
        threshold: 0.5,
        rootMargin: '-20% 0px -40% 0px'
    };

    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'active-node');
            } else {
                // Keep visible but remove active node highlight if scrolling past
                entry.target.classList.remove('active-node');
            }
        });
    }, stepObserverOptions);

    steps.forEach(step => stepObserver.observe(step));

    // Dynamic Path Filling Logic
    window.addEventListener('scroll', () => {
        if (!workflowContainer || !pathFill) return;
        
        const rect = workflowContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Start filling when container enters middle of screen
        const startPoint = windowHeight * 0.6; 
        const endPoint = windowHeight * 0.3;
        
        // Calculate progress
        let distanceScrolledIntoContainer = startPoint - rect.top;
        let totalScrollableDistance = rect.height;
        
        if (distanceScrolledIntoContainer < 0) {
            pathFill.style.height = '0%';
        } else if (distanceScrolledIntoContainer > totalScrollableDistance) {
            pathFill.style.height = '100%';
        } else {
            let percentage = (distanceScrolledIntoContainer / totalScrollableDistance) * 100;
            // Add a small buffer so it leads the active step slightly
            pathFill.style.height = `${Math.min(100, percentage + 5)}%`;
        }
    });

    // ---- Pricing Toggle ----
    const toggle = document.querySelector('.pricing-toggle');
    const toggleSwitch = document.querySelector('.toggle-switch');
    const monthlySpan = document.querySelector('.monthly');
    const yearlySpan = document.querySelector('.yearly');
    const prices = document.querySelectorAll('.price');
    
    // Default monthly prices
    const moPrices = [0, 29, 99];
    // Discounted yearly prices (approx 20% off)
    const yrPrices = [0, 24, 79];

    let isYearly = false;
    
    if (toggleSwitch) {
        toggleSwitch.addEventListener('click', () => {
            isYearly = !isYearly;
            
            // Animate toggle
            if (isYearly) {
                toggle.classList.add('yearly-active');
                monthlySpan.classList.remove('active');
                yearlySpan.classList.add('active');
            } else {
                toggle.classList.remove('yearly-active');
                monthlySpan.classList.add('active');
                yearlySpan.classList.remove('active');
            }
            
            // Update prices with a subtle fade effect
            prices.forEach((p, i) => {
                p.style.opacity = 0;
                setTimeout(() => {
                    if (isYearly) {
                        p.innerHTML = `$${yrPrices[i]}<span>/mo</span>`;
                    } else {
                        p.innerHTML = `$${moPrices[i]}<span>/mo</span>`;
                    }
                    p.style.opacity = 1;
                    p.style.transition = 'opacity 0.3s ease';
                }, 150);
            });
        });
    }

    // ---- FAQ Accordion ----
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ---- Initial Load Animation Trigger ----
    setTimeout(() => {
        const heroLeft = document.querySelector('.hero-left');
        if (heroLeft) heroLeft.style.opacity = 1;
    }, 100);
});
