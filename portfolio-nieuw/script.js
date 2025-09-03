// Create animated particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Header scroll effect
function initHeaderScrollEffect() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(15, 15, 35, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.1)';
        } else {
            header.style.background = 'rgba(15, 15, 35, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
}

// Form submission handler
function initFormHandler() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Vul alsjeblieft alle velden in.');
                return;
            }
            
            // Simulate form submission
            alert(`Bedankt ${name}! Je bericht is verzonden. Ik neem zo snel mogelijk contact met je op.`);
            
            // Reset form
            form.reset();
        });
    }
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add a slight delay for staggered animation
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                entry.target.style.transitionDelay = `${delay}ms`;
            }
        });
    }, observerOptions);

    // Observe project cards and tool categories
    document.querySelectorAll('.project-card, .tool-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// View More button handlers
function initViewMoreButtons() {
    document.querySelectorAll('.view-more-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the project title
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            
            // For demo purposes, show an alert
            // In a real portfolio, this would link to a project detail page or GitHub
            alert(`Project details voor "${projectTitle}" - hier zou een link naar GitHub of project details komen.`);
        });
    });
}

// Mobile menu toggle (for future enhancement)
function initMobileMenu() {
    // Create mobile menu button if not exists
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Add mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.display = 'none';
    mobileMenuBtn.style.background = 'none';
    mobileMenuBtn.style.border = 'none';
    mobileMenuBtn.style.color = '#e4e4e7';
    mobileMenuBtn.style.fontSize = '1.5rem';
    mobileMenuBtn.style.cursor = 'pointer';
    
    nav.appendChild(mobileMenuBtn);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
    });
    
    // Show mobile menu button on small screens
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
        } else {
            mobileMenuBtn.style.display = 'none';
            navLinks.classList.remove('mobile-open');
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}


document.addEventListener("DOMContentLoaded", () => {
    const texts = [
        "Sander Tigelaar",
        "Game Developer 🎮",
        "Design Enthusiast 🎨",
        "Music Lover 🎧",
        "Code Explorer 💻"
    ];

    const dynamicText = document.getElementById('dynamic-text');
    const introText = document.getElementById('intro-text');

    let count = 0;
    let index = 0;

    (function type(){
        const currentText = texts[count];
        const letter = currentText.slice(0, ++index);
        dynamicText.textContent = letter;

        // Voeg "a" alleen toe als het niet Sander is
        if(currentText !== "Sander Tigelaar"){
            introText.textContent = "Hello, I'm a";
        } else {
            introText.textContent = "Hello, I'm";
        }

        if(letter.length === currentText.length){
            count++;
            index = 0;
            if(count >= texts.length) count = 0;
            setTimeout(type, 2000); // pauze tussen teksten
        } else {
            setTimeout(type, 200); // snelheid typen
        }
    })();
});

// Voeg sterren toe
const particlesContainer = document.getElementById("particles");
for(let i=0; i<100; i++){
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = Math.random() * window.innerHeight + "px";
    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.animationDuration = (Math.random() * 3 + 2) + "s";
    particlesContainer.appendChild(star);
}

function smoothScroll(target, duration = 1000) {
    const start = window.scrollY;
    const end = document.querySelector(target).offsetTop;
    const distance = end - start;
    let startTime = null;

    function easeInOutQuad(t) {
        return t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
    }

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);
        window.scrollTo(0, start + distance * ease);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        smoothScroll(this.getAttribute("href"), 1200);
    });
});

// Alle secties selecteren
const sections = document.querySelectorAll("section");

// Intersection Observer instellen
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Optioneel: observer stop na 1 keer
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2 // pas zichtbaar als 20% van sectie in beeld
});

// Observer toepassen op elke sectie
sections.forEach(section => {
    observer.observe(section);
});

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

const viewBtns = document.querySelectorAll('.view-project-btn');
const overlays = document.querySelectorAll('.project-overlay');
const closeBtns = document.querySelectorAll('.close-overlay');

viewBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    overlays[index].classList.add('active');
  });
});

closeBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    overlays[index].classList.remove('active');
  });
});
