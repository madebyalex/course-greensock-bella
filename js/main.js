gsap.registerPlugin(ScrollTrigger);

function initNavigation() {
  const mainNavLinks = gsap.utils.toArray('.main-nav a');

  mainNavLinks.forEach((link) => {
    link.addEventListener('mouseleave', (e) => {
      // Add class
      link.classList.add('animate-out');

      setTimeout(() => {
        // Remove class
        link.classList.remove('animate-out');
      }, 300);
    });
  });
}

function init() {
  initNavigation();
}

window.addEventListener('load', function () {
  init();
});
