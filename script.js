// ========================================
// PRELOADER
// ========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 2200);
});

// ========================================
// CUSTOM CURSOR
// ========================================
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX - 3 + 'px';
    cursorDot.style.top = mouseY - 3 + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX - 20 + 'px';
    cursorRing.style.top = ringY - 20 + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .skill-tag, .glass-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorRing.style.width = '60px';
        cursorRing.style.height = '60px';
        cursorRing.style.left = ringX - 30 + 'px';
        cursorRing.style.top = ringY - 30 + 'px';
        cursorRing.style.borderColor = 'rgba(255,255,255,0.6)';
    });
    el.addEventListener('mouseleave', () => {
        cursorRing.style.width = '40px';
        cursorRing.style.height = '40px';
        cursorRing.style.borderColor = 'rgba(255,255,255,0.3)';
    });
});

// ========================================
// NAVBAR
// ========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ========================================
// MOBILE MENU
// ========================================
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ========================================
// INTERSECTION OBSERVER - REVEAL ANIMATIONS
// ========================================
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animation based on element index within its parent
            const parent = entry.target.parentElement;
            const siblings = parent ? Array.from(parent.children).filter(child =>
                child.classList.contains('reveal-up') ||
                child.classList.contains('reveal-left') ||
                child.classList.contains('reveal-right')
            ) : [];

            const siblingIndex = siblings.indexOf(entry.target);
            const delay = siblingIndex >= 0 ? siblingIndex * 80 : 0;

            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, delay);

            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ========================================
// COUNTER ANIMATION
// ========================================
const counters = document.querySelectorAll('.hero-stat-num');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            let current = 0;
            const increment = target / 40;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                entry.target.textContent = Math.floor(current);
            }, 40);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ========================================
// MAGNETIC BUTTONS
// ========================================
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ========================================
// TILT EFFECT ON PROJECT CARDS
// ========================================
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (y - 0.5) * 6;
        const tiltY = (x - 0.5) * -6;
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});

// ========================================
// PARALLAX FLOATING CIRCLES
// ========================================
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const fc1 = document.querySelector('.fc-1');
    const fc2 = document.querySelector('.fc-2');
    const fc3 = document.querySelector('.fc-3');

    if (fc1) fc1.style.transform = `translate(${-scrollY * 0.02}px, ${scrollY * 0.03}px)`;
    if (fc2) fc2.style.transform = `translate(${scrollY * 0.02}px, ${-scrollY * 0.02}px)`;
});

// ========================================
// SKILL TAG STAGGER ANIMATION
// ========================================
const skillGroups = document.querySelectorAll('.skill-group');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll('.skill-tag');
            tags.forEach((tag, i) => {
                tag.style.opacity = '0';
                tag.style.transform = 'translateY(10px)';
                tag.style.transition = `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms`;
                setTimeout(() => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0)';
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillGroups.forEach(group => skillObserver.observe(group));

// ========================================
// TIMELINE TECH TAG STAGGER
// ========================================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const techs = entry.target.querySelectorAll('.timeline-tech span');
            techs.forEach((tech, i) => {
                tech.style.opacity = '0';
                tech.style.transform = 'translateY(5px)';
                tech.style.transition = `all 0.3s ${i * 30}ms`;
                setTimeout(() => {
                    tech.style.opacity = '';
                    tech.style.transform = 'translateY(0)';
                }, 50);
            });
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => timelineObserver.observe(item));

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.opacity = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.opacity = '1';
        }
    });
});

// ========================================
// GLASS CARD SHINE EFFECT
// ========================================
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--shine-x', `${x}px`);
        card.style.setProperty('--shine-y', `${y}px`);
    });
});

// ========================================
// TYPING EFFECT FOR TERMINAL
// ========================================
const terminalBody = document.querySelector('.about-card-body');
if (terminalBody) {
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lines = terminalBody.querySelectorAll('.terminal-line');
                lines.forEach((line, i) => {
                    line.style.opacity = '0';
                    line.style.transform = 'translateY(5px)';
                    line.style.transition = `all 0.4s ${i * 150}ms`;
                    setTimeout(() => {
                        line.style.opacity = '1';
                        line.style.transform = 'translateY(0)';
                    }, 100);
                });
                terminalObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    terminalObserver.observe(terminalBody);
}

// ========================================
// SMOOTH PAGE LOAD
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

const scrollIndicator = document.querySelector('.scroll-indicator');
if (window.innerWidth <= 1024) {
    scrollIndicator?.remove();
}
