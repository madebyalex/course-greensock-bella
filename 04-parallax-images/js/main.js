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

function init() {
  initParallaxImages();
}

window.addEventListener('load', function () {
  init();
});
