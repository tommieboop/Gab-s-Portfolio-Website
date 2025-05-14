/*---------------------------------------------------
# Document Ready Function
---------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function() {
    // Initialize all components and functions
    initNavbarScroll();
    initTypedText();
    initPortfolioFilter();
    initContactForm();
    initScrollAnimation();
});

/*---------------------------------------------------
# Navbar Scroll Effect
---------------------------------------------------*/
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
}

/*---------------------------------------------------
# Typed Text Animation
---------------------------------------------------*/
function initTypedText() {
    const typedTextOutput = document.querySelector('.typed-text-output');
    const typedText = document.querySelector('.typed-text');
    
    if (typedTextOutput && typedText) {
        const textArray = typedText.textContent.split(', ');
        let charIndex = 0;
        let textIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentText = textArray[textIndex];
            
            if (isDeleting) {
                typedTextOutput.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedTextOutput.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                typingSpeed = 500; // Pause before typing next word
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start the typing animation
        setTimeout(type, 1000);
    }
}

/*---------------------------------------------------
# Portfolio Filter
---------------------------------------------------*/
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('#portfolio-filter [data-filter]');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

/*---------------------------------------------------
# Contact Form
---------------------------------------------------*/
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.querySelector('.form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation using regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For this static version, we'll just show a success message
            showFormMessage('Thank you! Your message has been sent successfully.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    function showFormMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.style.display = 'block';
            
            if (type === 'error') {
                formMessage.className = 'form-message alert alert-danger mt-3';
            } else {
                formMessage.className = 'form-message alert alert-success mt-3';
            }
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

/*---------------------------------------------------
# Scroll Animation
---------------------------------------------------*/
function initScrollAnimation() {
    const elements = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .certificate-card, .timeline-item, .approach-box');
    
    if (elements.length) {
        // Add animation classes to elements when they are in viewport
        function checkScroll() {
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (elementPosition.top < windowHeight * 0.8) {
                    element.classList.add('animated');
                }
            });
        }
        
        // Add animated class to CSS for styling
        const style = document.createElement('style');
        style.innerHTML = `
            .service-card, .portfolio-card, .testimonial-card, .certificate-card, .timeline-item, .approach-box {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .animated {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
        
        // Check on initial load
        checkScroll();
        
        // Check on scroll
        window.addEventListener('scroll', checkScroll);
    }
}

/*---------------------------------------------------
# Smooth Scroll for Anchor Links
---------------------------------------------------*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip for empty links or links with just "#"
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: targetPosition - navbarHeight,
                behavior: 'smooth'
            });
        }
    });
});
