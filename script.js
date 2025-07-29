document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav ul li a');
    const backToTopButton = document.querySelector('.back-to-top');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    const consultationForm = document.getElementById('consultationForm');
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '1rem 0';
            backToTopButton.classList.add('active');
        } else {
            header.style.padding = '1.5rem 0';
            backToTopButton.classList.remove('active');
        }
    });
    
    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // Toggle animation for hamburger icon
        const spans = this.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Reset hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
        });
    });
    
    // Portfolio Filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
    
    // Testimonial Slider
    let currentTestimonial = 0;
    
    // Hide all testimonials except the first one
    testimonialItems.forEach((item, index) => {
        if (index !== 0) {
            item.style.display = 'none';
        }
    });
    
    // Function to show testimonial
    function showTestimonial(index) {
        testimonialItems.forEach(item => {
            item.style.display = 'none';
            item.style.opacity = '0';
        });
        
        testimonialItems[index].style.display = 'block';
        setTimeout(() => {
            testimonialItems[index].style.opacity = '1';
        }, 100);
    }
    
    // Previous button click event
    prevButton.addEventListener('click', function() {
        currentTestimonial--;
        if (currentTestimonial < 0) {
            currentTestimonial = testimonialItems.length - 1;
        }
        showTestimonial(currentTestimonial);
    });
    
    // Next button click event
    nextButton.addEventListener('click', function() {
        currentTestimonial++;
        if (currentTestimonial >= testimonialItems.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    });
    
    // Auto slide testimonials every 5 seconds
    setInterval(function() {
        currentTestimonial++;
        if (currentTestimonial >= testimonialItems.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Form Validation
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const projectType = document.getElementById('projectType').value;
            const message = document.getElementById('message').value.trim();
            const consent = document.getElementById('consent').checked;
            
            // Validate form
            let isValid = true;
            let errorMessage = '';
            
            if (name === '') {
                isValid = false;
                errorMessage += 'Please enter your name.\n';
                document.getElementById('name').classList.add('error');
            } else {
                document.getElementById('name').classList.remove('error');
            }
            
            if (email === '') {
                isValid = false;
                errorMessage += 'Please enter your email.\n';
                document.getElementById('email').classList.add('error');
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
                document.getElementById('email').classList.add('error');
            } else {
                document.getElementById('email').classList.remove('error');
            }
            
            if (phone === '') {
                isValid = false;
                errorMessage += 'Please enter your phone number.\n';
                document.getElementById('phone').classList.add('error');
            } else {
                document.getElementById('phone').classList.remove('error');
            }
            
            if (projectType === '' || projectType === null) {
                isValid = false;
                errorMessage += 'Please select a project type.\n';
                document.getElementById('projectType').classList.add('error');
            } else {
                document.getElementById('projectType').classList.remove('error');
            }
            
            if (message === '') {
                isValid = false;
                errorMessage += 'Please enter your message.\n';
                document.getElementById('message').classList.add('error');
            } else {
                document.getElementById('message').classList.remove('error');
            }
            
            if (!consent) {
                isValid = false;
                errorMessage += 'Please consent to being contacted.\n';
                document.getElementById('consent').classList.add('error');
            } else {
                document.getElementById('consent').classList.remove('error');
            }
            
            // If form is valid, submit it
            if (isValid) {
                // In a real-world scenario, you would send the form data to a server here
                // For this example, we'll just show a success message
                const formContainer = document.querySelector('.contact-form');
                formContainer.innerHTML = `
                    <div class="form-success">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank You!</h3>
                        <p>Your message has been sent successfully. One of our design experts will contact you shortly.</p>
                    </div>
                `;
                
                // Scroll to the success message
                formContainer.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Show error message
                alert(errorMessage);
            }
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if href is just #
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button click event
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add animation to elements when they come into view
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-item, .badge');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Function to add animation class to elements in viewport
    function animateOnScroll() {
        animateElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('animate');
            }
        });
    }
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .portfolio-item, .testimonial-item, .badge {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate, .portfolio-item.animate, .testimonial-item.animate, .badge.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .mobile-menu-toggle span {
            transition: all 0.3s ease;
        }
        
        .mobile-menu-toggle span.active:nth-child(1) {
            transform: translateY(9px) rotate(45deg);
        }
        
        .mobile-menu-toggle span.active:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle span.active:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
        }
        
        .no-scroll {
            overflow: hidden;
        }
        
        .form-success {
            text-align: center;
            padding: 3rem;
        }
        
        .form-success i {
            font-size: 5rem;
            color: #4CAF50;
            margin-bottom: 2rem;
        }
        
        .error {
            border-color: #ff3860 !important;
        }
    `;
    document.head.appendChild(style);
});