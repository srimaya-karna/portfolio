document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggle Nav
            navLinks.classList.toggle('nav-active');

            // Burger Animation
            hamburger.classList.toggle('toggle');
        });
    }

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    // Scroll Animations
    const revealElements = document.querySelectorAll('.section-title, .about-content, .skills-grid, .project-card, .timeline-item');

    // Add 'reveal' class initially to elements we want to animate
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load to show elements already in view
    revealOnScroll();

    // Smooth Scrolling for anchor links (Polyfill-like behavior for header offset if needed, 
    // though CSS scroll-behavior usually handles it. Adding this just in case for precision)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Header offset
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Contact Form Handling (Real Backend)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-send span');
            const originalText = btn ? btn.innerText : 'Send';

            if (btn) btn.innerText = 'Sending...';

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    if (btn) btn.innerText = 'Sent!';
                    contactForm.reset();
                    console.log('Message sent successfully');
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error:', error);
                if (btn) btn.innerText = 'Error!';
            }

            setTimeout(() => {
                if (btn) btn.innerText = originalText;
            }, 3000);
        });
    }

    // Monitor User Visit
    const logVisit = async () => {
        try {
            await fetch('http://localhost:5000/api/visit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: window.location.pathname })
            });
        } catch (e) {
            console.log('Backend not reachable for monitoring');
        }
    };
    logVisit();

    // Cinematic Cursor Glow
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // Focus Timer & Rain Sound Logic
    let timerInterval = null;
    let timeLeft = 25 * 60; // 25 minutes in seconds
    let isTimerActive = false;

    const timerDisplay = document.getElementById('timer-display');
    const timerToggle = document.getElementById('timer-toggle');
    const timerReset = document.getElementById('timer-reset');

    // Rain Audio Setup
    const rainAudio = new Audio('assets/audio/rain.mp3');
    rainAudio.loop = true;
    rainAudio.volume = 0.25;

    const updateTimerDisplay = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        if (timerDisplay) {
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    };

    const startTimer = () => {
        if (isTimerActive) return;
        isTimerActive = true;
        if (timerToggle) timerToggle.textContent = 'Pause Focus';

        // Try to play rain sound (will fail if no user interaction, but this is triggered by click)
        rainAudio.play().catch(err => console.log('Audio playback delayed:', err));

        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                stopTimer();
                alert('Session complete! Time for a break.');
            }
        }, 1000);
    };

    const stopTimer = () => {
        isTimerActive = false;
        clearInterval(timerInterval);
        if (timerToggle) timerToggle.textContent = 'Start Focus';
        rainAudio.pause();
    };

    const resetTimer = () => {
        stopTimer();
        timeLeft = 25 * 60;
        updateTimerDisplay();
    };

    if (timerToggle) {
        timerToggle.addEventListener('click', () => {
            if (isTimerActive) {
                stopTimer();
            } else {
                startTimer();
            }
        });
    }

    if (timerReset) {
        timerReset.addEventListener('click', resetTimer);
    }

    // Robust Mobile Video Switcher
    const videoElement = document.querySelector('.video-media');
    if (videoElement) {
        const setVideoSource = () => {
            const isMobile = window.innerWidth <= 768;
            const targetSrc = isMobile ? 'assets/vid-mobile.mp4' : 'assets/vid-desktop.mp4';

            // Only update if source changed
            if (!videoElement.currentSrc.includes(targetSrc)) {
                videoElement.src = targetSrc;
                videoElement.load();
                videoElement.play().catch(() => { });
            }
        };

        // Initial check
        setVideoSource();
        // Resize check with debounce
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(setVideoSource, 250);
        });
    }

    // Scroll-to-Hide Navbar Logic
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                // Scrolling down
                navbar.classList.add('nav-hidden');
            } else {
                // Scrolling up
                navbar.classList.remove('nav-hidden');
            }
            lastScrollY = window.scrollY;
        });
    }
});
