document.addEventListener('DOMContentLoaded', () => {
    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Initial check in case page starts scrolled
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        }
    }

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

    // ---- Standalone FAQ Accordion ----
    const faqItems = document.querySelectorAll('.faq-page-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-page-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items in the same category
                const parentCategory = item.closest('.faq-page-accordion');
                const siblingItems = parentCategory ? parentCategory.querySelectorAll('.faq-page-item') : faqItems;
                siblingItems.forEach(faq => faq.classList.remove('active'));
                
                // If the clicked item wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
});
