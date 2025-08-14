// FCAI Coders Learning Page JavaScript

// Dark mode functionality

// Dark mode functionality
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector('.dark-mode-toggle i').className = 'fas fa-sun';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.querySelector('.dark-mode-toggle i').className = 'fas fa-moon';
    }
}

// Initialize dark mode on page load
function initializeDarkMode() {
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector('.dark-mode-toggle i').className = 'fas fa-sun';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.querySelector('.dark-mode-toggle i').className = 'fas fa-moon';
    }
}

// Function to toggle course visibility
function toggleCourses(semesterId) {
    const coursesContainer = document.getElementById(semesterId + '-courses');
    const button = event.target;
    
    if (coursesContainer.classList.contains('show')) {
        // Hide courses
        coursesContainer.classList.remove('show');
        button.innerHTML = '<i class="fas fa-eye"></i> Show Courses';
        button.style.background = 'var(--gradient)';
    } else {
        // Show courses
        coursesContainer.classList.add('show');
        button.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Courses';
        button.style.background = 'linear-gradient(135deg, var(--secondary-color) 0%, var(--primary-color) 100%)';
    }
}

// Mobile menu functionality
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navMenu && mobileToggle) {
        const mobileToggleIcon = mobileToggle.querySelector('i');
        
        navMenu.classList.toggle('active');
        
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            mobileToggleIcon.className = 'fas fa-times';
        } else {
            mobileToggleIcon.className = 'fas fa-bars';
        }
    } else {
        console.error('Mobile menu elements not found');
    }
}

// Smooth scrolling for navigation links
function smoothScrollTo(targetId) {
	const target = document.querySelector(targetId);
	if (!target) return;

	const navbar = document.querySelector('.navbar');
	const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
	const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
	const scrollY = Math.max(targetTop - navbarHeight - 10, 0);

	window.scrollTo({
		top: scrollY,
		behavior: 'smooth'
	});
}

// Active navigation highlighting
function updateActiveNavLink() {
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('.nav-link');
	const navbar = document.querySelector('.navbar');
	const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
	
	let current = '';
	
	sections.forEach(section => {
		const sectionTop = section.offsetTop - navbarHeight - 20;
		const sectionHeight = section.clientHeight;
		
		if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
			current = section.getAttribute('id');
		}
	});
	
	navLinks.forEach(link => {
		link.classList.remove('active');
		if (link.getAttribute('href') === `#${current}`) {
			link.classList.add('active');
		}
	});
}

// Add smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode
    initializeDarkMode();

	// Handle direct links with hash on initial load (e.g., #contact)
	if (window.location.hash) {
		// Use a timeout to allow layout to settle before scrolling
		setTimeout(() => {
			smoothScrollTo(window.location.hash);
		}, 0);
	}
    
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function(e) {
            toggleMobileMenu();
        });
    } else {
        console.error('Mobile toggle button not found');
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Navigation link click handlers
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.show-courses-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a small loading effect
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 300);
        });
    });

    // Add hover effects to course items
    const courseItems = document.querySelectorAll('.course-item');
    courseItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add click effects to resource links
    const resourceLinks = document.querySelectorAll('.resource-link');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNavLink);

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close all open course containers
            const openContainers = document.querySelectorAll('.courses-container.show');
            openContainers.forEach(container => {
                container.classList.remove('show');
                const button = container.previousElementSibling;
                if (button && button.classList.contains('show-courses-btn')) {
                    button.innerHTML = '<i class="fas fa-eye"></i> Show Courses';
                    button.style.background = 'var(--gradient)';
                }
            });
            
            // Close mobile menu
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });

    // Add touch support for mobile devices
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could be used for navigation
                // Handle swipe up
            } else {
                // Swipe down - could be used for navigation
            }
        }
    }

    // Add performance optimization
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optimize scroll events
    const optimizedScrollHandler = debounce(function() {
        updateActiveNavLink();
    }, 16);

    window.addEventListener('scroll', optimizedScrollHandler);

    // Add accessibility improvements
    const focusableElements = document.querySelectorAll('button, a, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Add error handling for broken links
    const allLinks = document.querySelectorAll('a[href]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.includes('your-')) {
                e.preventDefault();
                alert('Please update the link with your actual URL');
            }
        });
    });

    // Page loaded successfully
});

// Function to add new courses dynamically (for future use)
function addCourse(semesterId, courseName, youtubeLink, driveLink) {
    const coursesContainer = document.getElementById(semesterId + '-courses');
    
    const courseItem = document.createElement('div');
    courseItem.className = 'course-item';
    courseItem.innerHTML = `
        <h5>${courseName}</h5>
        <div class="course-links">
            <a href="${youtubeLink}" class="resource-link youtube" target="_blank">
                <i class="fab fa-youtube"></i>
                YouTube
            </a>
            <a href="${driveLink}" class="resource-link drive" target="_blank">
                <i class="fab fa-google-drive"></i>
                Drive
            </a>
        </div>
    `;
    
    coursesContainer.appendChild(courseItem);
}

// Function to update contact links
function updateContactLinks(email, whatsapp, youtube, drive) {
    const emailLink = document.querySelector('.contact-link.email');
    const whatsappLink = document.querySelector('.contact-link.whatsapp');
    const youtubeLink = document.querySelector('.contact-link.youtube');
    const driveLink = document.querySelector('.contact-link.drive');
    
    if (emailLink) emailLink.href = `mailto:${email}`;
    if (whatsappLink) whatsappLink.href = `https://wa.me/${whatsapp}`;
    if (youtubeLink) youtubeLink.href = youtube;
    if (driveLink) driveLink.href = drive;
}

// Export functions for external use
window.FCAICoders = {
    toggleCourses,
    toggleDarkMode,
    addCourse,
    updateContactLinks,
    smoothScrollTo
};
