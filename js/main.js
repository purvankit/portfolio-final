document.addEventListener('DOMContentLoaded', () => {
    // --- Boot Sequence ---
    const bootTextContainer = document.getElementById('boot-text');
    const heroContent = document.querySelector('.hero-content');
    const bootMessages = [
        "> INITIALIZING PORTFOLIO.EXE...",
        "> LOADING MODULES... [████████] 100%"
    ];

    let delay = 0;
    bootMessages.forEach((msg, index) => {
        setTimeout(() => {
            const p = document.createElement('p');
            p.textContent = msg;
            bootTextContainer.appendChild(p);
            window.scrollTo(0, 0); // Keep top
        }, delay);
        delay += 800; // 800ms per line
    });

    // Reveal Hero Content after boot
    setTimeout(() => {
        bootTextContainer.style.display = 'none';
        heroContent.classList.remove('hidden');
        heroContent.classList.add('visible'); // Add animation class if needed
    }, delay + 500);


    // --- Theme Toggle ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check local storage
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeBtn.querySelector('.icon').textContent = '☾';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        themeBtn.querySelector('.icon').textContent = isLight ? '☾' : '☀';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });


    // --- Mobile Menu ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        menuBtn.textContent = mobileMenu.classList.contains('open') ? 'X' : '☰';
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            menuBtn.textContent = '☰';
        });
    });


    // --- Scroll Observer (Fade In) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-fade').forEach(section => {
        observer.observe(section);
    });


    // --- Live Clock ---
    const clockElement = document.getElementById('clock');
    setInterval(() => {
        const now = new Date();
        clockElement.textContent = now.toLocaleTimeString();
    }, 1000);


    // --- Form Validation ---
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const successMsg = document.getElementById('success-msg');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset errors
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        successMsg.classList.add('hidden');

        // Name Validation
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'ERROR: NAME_REQUIRED';
            isValid = false;
        }

        // Email Validation
        if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'ERROR: INVALID_EMAIL_FORMAT';
            isValid = false;
        }

        // Message Validation
        if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'ERROR: MESSAGE_TOO_SHORT (MIN 10 CHARS)';
            isValid = false;
        }

        if (isValid) {
            // Simulate transmission
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'TRANSMITTING...';
            btn.disabled = true;

            setTimeout(() => {
                successMsg.classList.remove('hidden');
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        }
    });

    // --- Ripple Effect ---
    document.querySelectorAll('.btn-terminal, .btn-resume').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const circle = document.createElement('span');
            const diameter = Math.max(btn.clientWidth, btn.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - (btn.getBoundingClientRect().left + window.scrollX)}px`;
            circle.style.top = `${e.clientY - (btn.getBoundingClientRect().top + window.scrollY)}px`;
            circle.classList.add('ripple');

            const ripple = btn.getElementsByClassName('ripple')[0];

            if (ripple) {
                ripple.remove();
            }

            btn.appendChild(circle);
        });
    });

    // --- Skill Bar Animation ---
    const skillSection = document.querySelector('#about');
    const progressBars = document.querySelectorAll('.progress-bar .fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const targetWidth = bar.dataset.width;
                    bar.style.width = targetWidth;
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (skillSection) {
        skillObserver.observe(skillSection);
    }
});
