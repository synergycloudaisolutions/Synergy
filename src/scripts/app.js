// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the slider functionality
    initSlider();
    
    // Initialize counters animation
    initCounters();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize form submission
    initFormSubmission();
    
    // Add smooth scrolling for anchor links
    initSmoothScroll();
    
    // Initialize the random logo animation
    initLogoAnimation();
    
    // Initialize the grid overlay animation
    initGridAnimation();
});

// Slider functionality
function initSlider() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slider || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const slidesToShow = getSlidesToShow();
    const totalSlides = slides.length;
    
    // Responsive slide count
    function getSlidesToShow() {
        if (window.innerWidth < 576) return 1;
        if (window.innerWidth < 992) return 2;
        return 4;
    }
    
    // Update slider on window resize
    window.addEventListener('resize', function() {
        const newSlidesToShow = getSlidesToShow();
        if (newSlidesToShow !== slidesToShow) {
            location.reload();
        }
    });
    
    // Clone slides for infinite effect
    for (let i = 0; i < slidesToShow; i++) {
        const clone = slides[i].cloneNode(true);
        slider.appendChild(clone);
    }
    
    // Next slide function
    function goToNextSlide() {
        currentIndex++;
        if (currentIndex >= totalSlides) {
            // Jump back to first slide without animation
            setTimeout(function() {
                slider.style.transition = 'none';
                currentIndex = 0;
                updateSliderPosition();
                
                // Re-enable transition after a brief delay
                setTimeout(function() {
                    slider.style.transition = 'transform 0.5s ease';
                }, 50);
            }, 500);
        }
        updateSliderPosition();
    }
    
    // Previous slide function
    function goToPrevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            // Jump to last slide without animation
            setTimeout(function() {
                slider.style.transition = 'none';
                currentIndex = totalSlides - 1;
                updateSliderPosition();
                
                // Re-enable transition after a brief delay
                setTimeout(function() {
                    slider.style.transition = 'transform 0.5s ease';
                }, 50);
            }, 500);
        }
        updateSliderPosition();
    }
    
    // Update slider position
    function updateSliderPosition() {
        const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginLeft) * 2;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    
    // Event listeners for buttons
    nextBtn.addEventListener('click', goToNextSlide);
    prevBtn.addEventListener('click', goToPrevSlide);
    
    // Auto slide every 5 seconds
    setInterval(goToNextSlide, 5000);
    
    // Initialize slider position
    updateSliderPosition();
}

// Counter animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the faster
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        
        const updateCount = () => {
            const increment = target / speed;
            
            if (count < target) {
                count += increment;
                counter.innerText = Math.floor(count);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    };
    
    // Intersection Observer to trigger counter animation when in view
    const options = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animation]');
    
    const options = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Form submission
function initFormSubmission() {
    const form = document.getElementById('support-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Display success message (in real implementation, this would send the data to a server)
        alert('Thank you for contacting us! We will get back to you shortly.');
        
        // Reset form fields
        form.reset();
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Logo animation
function initLogoAnimation() {
    const logo = document.querySelector('.logo');
    
    if (!logo) return;
    
    logo.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Pulse animation every 10 seconds
    setInterval(function() {
        logo.style.transform = 'scale(1.1)';
        
        setTimeout(function() {
            logo.style.transform = 'scale(1)';
        }, 300);
    }, 10000);
}

// Grid animation enhancement
function initGridAnimation() {
    const gridOverlay = document.querySelector('.grid-overlay');
    
    if (!gridOverlay) return;
    
    // Add mousemove effect
    document.querySelector('.hero-section').addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        gridOverlay.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });
}

// Create a custom SVG logo for SynergyCloudAISolutions
function createLogo() {
    // This function would be used if you want to create the logo dynamically
    // For now, we're using a placeholder image in the HTML
}

// Dynamic background particles effect (simplified version)
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero-section');
    
    if (!heroSection) return;
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '5';
    
    heroSection.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    
    // Initial sizing
    resizeCanvas();
    
    // Resize on window resize
    window.addEventListener('resize', resizeCanvas);
    
    // Particles array
    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            color: 'rgba(255, 255, 255, 0.5)',
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5
        });
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < particleCount; i++) {
            const p = particles[i];
            
            // Move particles
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Boundary check
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < particleCount; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Start animation
    animate();
});