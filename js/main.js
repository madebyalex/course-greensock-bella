gsap.registerPlugin(ScrollTrigger);

function initNavigation() {
  const mainNavLinks = gsap.utils.toArray('.main-nav a');
  const mainNavLinksReversed = gsap.utils.toArray('.main-nav a').reverse();

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

  function navAnimation(direction) {
    const scrollingDown = direction === 1;
    const links = scrollingDown ? mainNavLinks : mainNavLinksReversed;
    const navContainer = document.querySelector('.main-nav ul');

    gsap.set(navContainer, { perspective: 500 });

    return gsap.to(links, {
      duration: 0.4,
      stagger: 0.08,
      ease: 'Power4.out',
      autoAlpha: () => (scrollingDown ? 0 : 1),
      y: () => (scrollingDown ? 20 : 0),
      rotationX: () => (scrollingDown ? 45 : 0),
    });
  }

  ScrollTrigger.create({
    start: 100,
    end: 'bottom bottom-=20',
    toggleClass: {
      targets: 'body',
      className: 'has-scrolled',
    },
    onEnter: ({ direction }) => navAnimation(direction),
    onLeaveBack: ({ direction }) => navAnimation(direction),
    markers: true,
  });
}

function init() {
  initNavigation();
}

window.addEventListener('load', function () {
  init();
});
