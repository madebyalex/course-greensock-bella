gsap.registerPlugin(ScrollTrigger);

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

function init() {
  initParallaxImages();
  initPinSteps();
}

window.addEventListener('load', function () {
  init();
});
