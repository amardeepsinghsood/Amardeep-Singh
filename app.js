/**
 * AMARDEEP PORTFOLIO - Storytelling Theme
 * Smooth scroll animations and narrative flow
 */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initProgressBar();
  initScrollReveal();
  initChapterReveal();
  initHeroImageScale();
  initMarquee();
  initSmoothScroll();
});

// ============================================
// LOADING SCREEN
// ============================================

function initLoader() {
  const loader = document.getElementById('loader');
  document.body.style.overflow = 'hidden';

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';

      // Trigger hero animations
      setTimeout(() => {
        document.querySelectorAll('.chapter--hero .fade-up').forEach((el, i) => {
          setTimeout(() => {
            el.classList.add('visible');
          }, i * 100);
        });
      }, 300);
    }, 1000);
  });
}

// ============================================
// PROGRESS BAR
// ============================================

function initProgressBar() {
  const progressBar = document.getElementById('progressBar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

// ============================================
// HERO IMAGE SCALING
// ============================================

function initHeroImageScale() {
  const heroImage = document.querySelector('.hero-image');
  const hero = document.querySelector('.chapter--hero');

  if (!heroImage || !hero) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeroImage();
        ticking = false;
      });
      ticking = true;
    }
  });

  function updateHeroImage() {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;

    // Only animate within hero section
    if (scrollY > heroHeight) return;

    const progress = scrollY / heroHeight;

    // Scale from 1 to 2.5
    const scale = 1 + (progress * 1.5);

    // Opacity from 1 to 0.2
    const opacity = 1 - (progress * 0.8);

    // Move down slightly
    const translateY = scrollY * 0.4;

    heroImage.style.transform = `translate(-50%, calc(-50% + ${translateY}px)) scale(${scale})`;
    heroImage.style.opacity = opacity;

    // Add blur
    const blur = progress * 8;
    const img = heroImage.querySelector('img');
    if (img) {
      img.style.filter = `grayscale(100%) blur(${blur}px)`;
    }
  }

  // Center the image initially
  heroImage.style.position = 'absolute';
  heroImage.style.left = '50%';
  heroImage.style.top = '50%';
  heroImage.style.transform = 'translate(-50%, -50%)';
}

// ============================================
// SCROLL REVEAL - Elements
// ============================================

function initScrollReveal() {
  const elements = document.querySelectorAll('.fade-up:not(.chapter--hero .fade-up)');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ============================================
// CHAPTER REVEAL - Sections
// ============================================

function initChapterReveal() {
  const chapters = document.querySelectorAll('.chapter:not(.chapter--hero):not(.chapter--footer):not(.chapter--stats)');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  chapters.forEach(chapter => observer.observe(chapter));
}

// ============================================
// MARQUEE
// ============================================

function initMarquee() {
  const marquees = document.querySelectorAll('.marquee__track');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
    });
  }, { threshold: 0 });

  marquees.forEach(marquee => observer.observe(marquee));
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// ============================================
// PARALLAX EFFECT FOR CHAPTERS
// ============================================

(function initParallax() {
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  });

  function updateParallax() {
    const chapters = document.querySelectorAll('.chapter--project');

    chapters.forEach(chapter => {
      const rect = chapter.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = (progress - 0.5) * 30;

        const content = chapter.querySelector('.project');
        if (content) {
          content.style.transform = `translateY(${offset}px)`;
        }
      }
    });
  }
})();

// ============================================
// REDUCED MOTION
// ============================================

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.marquee__track').forEach(el => {
    el.style.animation = 'none';
  });
}

// ============================================
// CONSOLE
// ============================================

console.log('%cAmardeep', 'font-family: "Bebas Neue", sans-serif; font-size: 40px; color: #EE344A;');
console.log('%cSocial Media & SEO Expert', 'font-size: 14px; color: #888;');
