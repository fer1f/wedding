// Wedding Invitation JavaScript
// Author: Wedding Script Generator
// Date: 2024

// Global variables
let musicPlaying = false;
let currentModalImage = null;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize website functions
function initializeWebsite() {
    initCountdown();
    initMusicControl();
    initScrollEffects();
    initNavigation();
    
    // Auto-play music after user interaction
    document.addEventListener('click', function() {
        if (!musicPlaying) {
            playMusic();
        }
    }, { once: true });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Initialize navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    
    // Create mobile menu toggle button
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileToggle.onclick = toggleMobileMenu;
    navbar.appendChild(mobileToggle);
    
    // Add active class to current section
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Show/hide navbar on scroll
        if (window.pageYOffset > 100) {
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
        } else {
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.opacity = '0';
        }
    });
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navbar.classList.remove('mobile-open');
                const icon = mobileToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    });
}

// Initialize scroll effects
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe profile cards
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        observer.observe(item);
    });
}

// Countdown Timer
function initCountdown() {
    const weddingDate = new Date('2024-12-25T08:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Wedding day has passed
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Show special message
            const countdownContainer = document.querySelector('.countdown-container h3');
            if (countdownContainer) {
                countdownContainer.textContent = 'Hari Bahagia Telah Tiba!';
            }
        }
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Gallery Modal Functions
function openModal(galleryItem) {
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const imgSrc = galleryItem.querySelector('img').src;
    const imgAlt = galleryItem.querySelector('img').alt;
    
    modalImage.src = imgSrc;
    modalImage.alt = imgAlt;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation class
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('galleryModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Music Control Functions
function initMusicControl() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    if (bgMusic) {
        bgMusic.volume = 0.3; // Set volume to 30%
        
        // Handle music loading
        bgMusic.addEventListener('loadstart', function() {
            console.log('Music loading started');
        });
        
        bgMusic.addEventListener('error', function() {
            console.log('Music failed to load');
            musicToggle.style.display = 'none';
        });
    }
}

function toggleMusic() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const icon = musicToggle.querySelector('i');
    
    if (musicPlaying) {
        bgMusic.pause();
        icon.className = 'fas fa-volume-mute';
        musicToggle.classList.add('muted');
        musicPlaying = false;
    } else {
        playMusic();
    }
}

function playMusic() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const icon = musicToggle.querySelector('i');
    
    bgMusic.play().then(() => {
        icon.className = 'fas fa-volume-up';
        musicToggle.classList.remove('muted');
        musicPlaying = true;
    }).catch(error => {
        console.log('Music play failed:', error);
    });
}

// Google Maps Integration
function initMap() {
    const location = { lat: -6.9175, lng: 107.6191 }; // Bandung coordinates
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [{"weight": "2.00"}]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#9c9c9c"}]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [{"visibility": "on"}]
            }
        ]
    });
    
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Lokasi Pernikahan Sarah & Ahmad',
        animation: google.maps.Animation.BOUNCE
    });
    
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px;">
                <h4 style="margin: 0 0 10px 0;">Gedung Serbaguna Bandung</h4>
                <p style="margin: 0;">Jl. Asia Afrika No. 123<br>Bandung, Jawa Barat</p>
            </div>
        `
    });
    
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
    
    // Stop marker animation after 3 seconds
    setTimeout(() => {
        marker.setAnimation(null);
    }, 3000);
}

// Open Google Maps
function openMaps() {
    const address = "Gedung Serbaguna Bandung, Jl. Asia Afrika No. 123, Bandung, Jawa Barat";
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
}

// Utility Functions
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

// Add loading animation
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Memuat undangan...</p>
        </div>
    `;
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// Page load performance
window.addEventListener('load', function() {
    hideLoading();
    
    // Add fade-in effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('loaded');
    }
});

// Handle page unload
window.addEventListener('beforeunload', function() {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic && musicPlaying) {
        bgMusic.pause();
    }
});

// Handle mobile menu (responsive navigation)
function toggleMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const icon = mobileToggle.querySelector('i');
    
    navbar.classList.toggle('mobile-open');
    
    if (navbar.classList.contains('mobile-open')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth > 768) {
        navbar.classList.remove('mobile-open');
        if (mobileToggle) {
            const icon = mobileToggle.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    }
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {
        document.body.classList.add('touch-device');
    });
}

// Fallback for older browsers
if (!window.IntersectionObserver) {
    // Fallback for scroll effects
    window.addEventListener('scroll', debounce(function() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                section.classList.add('animate-in');
            }
        });
    }, 100));
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Console message for developers
console.log('%c💒 Wedding Invitation Website', 'color: #ff69b4; font-size: 20px; font-weight: bold;');
console.log('%cMade with ❤️ for Sarah & Ahmad', 'color: #4169e1; font-size: 14px;');
console.log('%cDeveloped with modern JavaScript', 'color: #32cd32; font-size: 12px;');