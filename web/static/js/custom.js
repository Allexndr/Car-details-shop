// Modern 2025 JavaScript Features
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
  });

  // Initialize Particles.js
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#ffffff'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 6,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  }

  // Theme Management
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const notificationBtn = document.getElementById('notificationBtn');

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark'
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    }
  };

  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Theme toggle clicked');
      const current = document.documentElement.getAttribute('data-bs-theme') || 'light';
      const newTheme = current === 'light' ? 'dark' : 'light';
      console.log('Switching from', current, 'to', newTheme);
      applyTheme(newTheme);
    });
  }

  // Mobile menu improvements
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
      // Add smooth animation for mobile menu
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.style.transition = 'all 0.3s ease';
      }
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth < 992) {
          navbarCollapse.classList.remove('show');
        }
      });
    });
  }

  // Touch device optimizations
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
        console.log('Swipe up detected');
      } else {
        // Swipe down - could be used for navigation
        console.log('Swipe down detected');
      }
    }
  }

  // Responsive optimizations
  function handleResize() {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 992;
    
    // Adjust particles for mobile
    if (typeof particlesJS !== 'undefined') {
      const particlesConfig = {
        particles: {
          number: {
            value: isMobile ? 40 : isTablet ? 60 : 80
          },
          move: {
            speed: isMobile ? 3 : isTablet ? 4 : 6
          }
        }
      };
      
      // Update particles if they exist
      if (window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.pJS.fn.particlesRefresh();
      }
    }
    
    // Adjust AOS for mobile
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }
  
  // Debounced resize handler
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 250);
  });
  
  // Initial call
  handleResize();

  // Performance optimizations for mobile
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
  
  // Mobile-specific optimizations
  if (window.innerWidth < 768) {
    // Reduce animations on mobile
    document.documentElement.style.setProperty('--transition', '0.2s ease');
    
    // Optimize scroll performance
    let ticking = false;
    function updateScroll() {
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // Accessibility improvements
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      // Close mobile menu with Escape key
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
        navbarToggler.focus();
      }
    }
  });
  
  // Focus management for modals
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('shown.bs.modal', function() {
      const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    });
  });

  // Service Worker registration for PWA features
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          console.log('SW registered: ', registration);
        })
        .catch(function(registrationError) {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
  
  // Offline detection
  window.addEventListener('online', function() {
    document.body.classList.remove('offline');
    showNotification('Соединение восстановлено', 'success');
  });
  
  window.addEventListener('offline', function() {
    document.body.classList.add('offline');
    showNotification('Нет соединения с интернетом', 'warning');
  });

  // Notification system
  if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
      showNotification('У вас 3 новых уведомления!', 'info');
    });
  }

  // Floating Action Button
  const fab = document.getElementById('scrollToTop');
  if (fab) {
    // Show/hide FAB based on scroll
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        fab.classList.add('show');
      } else {
        fab.classList.remove('show');
      }
    });

    // Scroll to top
    fab.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Product Modal Population
  const productModal = document.getElementById('productModal');
  if (productModal) {
    productModal.addEventListener('show.bs.modal', function(event) {
      const button = event.relatedTarget;
      const name = button.getAttribute('data-name');
      const img = button.getAttribute('data-img');
      const desc = button.getAttribute('data-desc');
      const price = button.getAttribute('data-price');

      const modalTitle = productModal.querySelector('.modal-title');
      const modalImg = productModal.querySelector('#productImg');
      const modalDesc = productModal.querySelector('#productDesc');
      const modalPrice = productModal.querySelector('#productPrice');

      if (modalTitle) modalTitle.textContent = name;
      if (modalImg) modalImg.src = img;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalPrice) modalPrice.textContent = price;
    });
  }

  // Animated Counters
  const counters = document.querySelectorAll('.stat-number');
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  };

  // Intersection Observer for counters
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }

  // Enhanced Search with Debouncing
  const searchInput = document.querySelector('input[name="q"]');
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        // Add search animation
        e.target.classList.add('searching');
        setTimeout(() => {
          e.target.classList.remove('searching');
        }, 500);
      }, 300);
    });
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

  // Parallax Effect for Hero Section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    });
  }

  // Enhanced Card Interactions
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Loading States
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      if (!this.classList.contains('loading')) {
        this.classList.add('loading');
        this.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Загрузка...';
        
        setTimeout(() => {
          this.classList.remove('loading');
          this.innerHTML = this.getAttribute('data-original-text') || this.innerHTML;
        }, 2000);
      }
    });
  });

  // Toast Notifications
  function showNotification(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <i class="fa-solid fa-${type === 'info' ? 'info-circle' : 'check-circle'} me-2"></i>
        <span>${message}</span>
        <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
    `;

    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }

  // Enhanced Form Interactions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }
    });
  });

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modals = document.querySelectorAll('.modal.show');
      modals.forEach(modal => {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) modalInstance.hide();
      });
    }
  });

  // Performance Optimization: Lazy Loading Images
  const images = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Add CSS classes for enhanced animations
  document.body.classList.add('js-enhanced');
});

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

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Export for global use
window.showNotification = function(message, type) {
  // Implementation will be added by the main function
};


