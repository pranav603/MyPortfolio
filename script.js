    // --- Debounce Function ---
    function debounce(func, wait = 10, immediate = false) {
      let timeout;
      return function() {
        const context = this, args = arguments;
        const later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }

    // --- Navbar Scroll Logic ---
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
        navbar.classList.add('nav-hidden');
      } else {
        navbar.classList.remove('nav-hidden');
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // --- Mobile Menu Logic ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuBtn.querySelector('i');
    const mobileMenuLinks = mobileMenu.querySelectorAll('.mobile-menu-link');

    function toggleMenu() {
      mobileMenu.classList.toggle('hidden');
      
      if (mobileMenu.classList.contains('hidden')) {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        document.body.style.overflow = ''; 
      } else {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; 
      }
    }
    menuBtn.addEventListener('click', toggleMenu);
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', toggleMenu);
    });

    // --- Reduced Motion Check ---
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // --- Cursor Spotlight Effect ---
    const spotlight = document.getElementById('spotlight');
    if (spotlight) {
      window.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
          spotlight.style.left = `${e.clientX}px`;
          spotlight.style.top = `${e.clientY}px`;
        });
      });
    }

    // --- Intersection Observer for Fade-in Animations ---
    if (!motionQuery.matches) {
      const scrollElements = document.querySelectorAll("section"); 

      const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
          elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
      };

      const displayScrollElement = (element) => {
        element.classList.add("is-visible");
      };

      const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
          if (elementInView(el, 1.25)) { 
            displayScrollElement(el);
          } 
        })
      }

      
      scrollElements.forEach((el) => {
        el.classList.add("reveal-on-scroll");
      });

      window.addEventListener("scroll", handleScrollAnimation);
      handleScrollAnimation();
    }

    window.onload = () => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.classList.add('opacity-0');
        
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 600); 
      }
    };
