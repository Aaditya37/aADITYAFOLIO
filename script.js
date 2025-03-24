document.addEventListener('DOMContentLoaded', function() {
    // Page Loader
    const pageLoader = document.createElement('div');
    pageLoader.className = 'page-loader';
    pageLoader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(pageLoader);
    
    setTimeout(() => {
        pageLoader.classList.add('fade-out');
        setTimeout(() => {
            pageLoader.remove();
        }, 500);
    }, 1500);
    
    // Setup Glowing Text
    const glowingText = document.querySelectorAll('.glowing-text');
    glowingText.forEach(text => {
        text.setAttribute('data-text', text.textContent);
    });
    
    // Typewriter Effect
    const typewriterText = document.getElementById('typewriter-text');
    const phrases = ['Web Developer', 'UI/UX Designer', 'Frontend Specialist', 'Creative Coder', '12th GRADER'];
    let currentPhraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            typewriterText.textContent = currentPhrase.substring(0, letterIndex - 1);
            letterIndex--;
            typingSpeed = 50;
        } else {
            typewriterText.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && letterIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of phrase
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next phrase
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    typeWriter();
    
    // Cursor follower
    const cursor = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mouseout', function() {
        cursor.style.display = 'none';
    });
    
    // Links and buttons hover effect
    const links = document.querySelectorAll('a, button, .btn');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.opacity = '0.5';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '0.7';
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        if (mobileToggle.classList.contains('active')) {
            mobileToggle.querySelector('.bar:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 6px)';
            mobileToggle.querySelector('.bar:nth-child(2)').style.opacity = '0';
            mobileToggle.querySelector('.bar:nth-child(3)').style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            mobileToggle.querySelector('.bar:nth-child(1)').style.transform = 'none';
            mobileToggle.querySelector('.bar:nth-child(2)').style.opacity = '1';
            mobileToggle.querySelector('.bar:nth-child(3)').style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.querySelector('.bar:nth-child(1)').style.transform = 'none';
            mobileToggle.querySelector('.bar:nth-child(2)').style.opacity = '1';
            mobileToggle.querySelector('.bar:nth-child(3)').style.transform = 'none';
        });
    });
    
    // Theme toggler
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDarkMode)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });
    
    // Project filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Testimonial slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.control-btn.prev');
    const nextBtn = document.querySelector('.control-btn.next');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentSlide = 0;
    
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function goToSlide(index) {
        currentSlide = index;
        testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide === 0) ? testimonials.length - 1 : currentSlide - 1;
        goToSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide === testimonials.length - 1) ? 0 : currentSlide + 1;
        goToSlide(currentSlide);
    });
    
    // Auto slide testimonials
    let testimonialInterval = setInterval(() => {
        currentSlide = (currentSlide === testimonials.length - 1) ? 0 : currentSlide + 1;
        goToSlide(currentSlide);
    }, 5000);
    
    document.querySelector('.testimonial-slider').addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    document.querySelector('.testimonial-slider').addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentSlide = (currentSlide === testimonials.length - 1) ? 0 : currentSlide + 1;
            goToSlide(currentSlide);
        }, 5000);
    });
    
    // Skills progress animation
    const skillProgress = document.querySelectorAll('.progress-bar');
    
    function animateSkills() {
        skillProgress.forEach(progress => {
            const value = progress.style.width;
            progress.style.width = '0%';
            setTimeout(() => {
                progress.style.width = value;
            }, 100);
        });
    }
    
    // Implement simple AOS (Animate on Scroll)
    const animateElements = document.querySelectorAll('[data-aos]');
    
    function checkInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('aos-animate');
            }
        });
        
        // Animate skills when skills section is in view
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            const sectionTop = skillsSection.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 150) {
                animateSkills();
            }
        }
    }
    
    window.addEventListener('scroll', checkInView);
    checkInView(); // Initial check
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.</p>
            `;
            successMessage.style.backgroundColor = '#dff6e0';
            successMessage.style.color = '#19712c';
            successMessage.style.padding = '20px';
            successMessage.style.borderRadius = '8px';
            successMessage.style.marginTop = '20px';
            successMessage.style.display = 'flex';
            successMessage.style.alignItems = 'center';
            successMessage.style.gap = '15px';
            
            // Replace form with success message
            contactForm.replaceWith(successMessage);
            
            // In a real application, you would send the form data to a server here
            console.log('Form submitted:', { name, email, subject, message });
        });
    }
});
