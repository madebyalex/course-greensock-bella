gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let bodyScrollBar;

function initParallaxImages() {
  const allSections = gsap.utils.toArray('.with-parallax');

  allSections.forEach((section) => {
    const image = section.querySelector('img');

    gsap.to(image, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        scrub: true,
        // markers: true,
      },
    });
  });
}

function initPinSteps() {
  ScrollTrigger.create({
    trigger: '.fixed-nav',
    start: 'top center',
    endTrigger: '#stage4',
    end: 'center center',
    pin: true,
    pinReparent: true,
    // markers: true,
  });

  const getViewportHeight = () => {
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    return vh;
  };

  const updateBodyColor = (color) => {
    // gsap.to('.fill-background', { backgroundColor: color, ease: 'none' });
    document.documentElement.style.setProperty('--bcg-fill-color', color);
  };

  gsap.utils.toArray('.stage').forEach((stage, index) => {
    const navLinks = gsap.utils.toArray('.fixed-nav li');

    ScrollTrigger.create({
      trigger: stage,
      start: 'top center',
      //   end: 'bottom center',
      end: () => `+=${stage.clientHeight + getViewportHeight() / 10}`,
      toggleClass: {
        targets: navLinks[index],
        className: 'is-active',
      },
      //   markers: true,
      onEnter: () => updateBodyColor(stage.dataset.color),
      onEnterBack: () => updateBodyColor(stage.dataset.color),
    });
  });
}

function initScrollTo() {
  gsap.utils.toArray('.fixed-nav a').forEach((link) => {
    const target = link.getAttribute('href');

    link.addEventListener('click', (e) => {
      e.preventDefault();

      // gsap.to(window, {
      //   duration: 0.9,
      //   scrollTo: {
      //     y: target,
      //     offsetY: 80,
      //     ease: 'Power2.out',
      //   },
      // });

      bodyScrollBar.scrollIntoView(document.querySelector(target), {
        damping: 0.08,
        offsetTop: 80,
      });
    });
  });
}

function initSmoothScrollbar() {
  bodyScrollBar = Scrollbar.init(document.querySelector('#viewport'), {
    damping: 0.07,
  });

  // Remove horizontal scrollbar
  bodyScrollBar.track.xAxis.element.remove();

  // Keep ScrollTrigger in sync with Smooth Scrollbar
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        bodyScrollBar.scrollTop = value; // setter
      }
      return bodyScrollBar.scrollTop; // getter
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  // When the smooth scroller updates, tell ScrollTrigger to update() too:
  bodyScrollBar.addListener(ScrollTrigger.update);
}

function init() {
  initSmoothScrollbar();
  initParallaxImages();
  initPinSteps();
  initScrollTo();
}

window.addEventListener('load', function () {
  init();
});
