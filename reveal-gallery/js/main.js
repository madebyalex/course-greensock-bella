gsap.registerPlugin(ScrollTrigger);

function initHoverReveal() {
  const sections = document.querySelectorAll('.rg__column');

  sections.forEach((section) => {
    // Get elements for animation
    section.imageBlock = section.querySelector('.rg__image');
    section.imageMask = section.querySelector('.rg__image--mask');

    // Reset the initial position
    gsap.set(section.imageBlock, { yPercent: -101 });
    gsap.set(section.imageMask, { yPercent: 100, scale: 1.15 });

    // Add event listeners to each section
    section.addEventListener('mouseenter', createHoverReveal);
    section.addEventListener('mouseleave', createHoverReveal);
  });
}

function createHoverReveal(e) {
  const { imageBlock, imageMask } = e.target;

  let tl = gsap.timeline({
    defaults: {
      duration: 0.7,
      ease: 'Power4.out',
    },
  });

  if (e.type === 'mouseenter') {
    tl.to([imageBlock, imageMask], { yPercent: 0, scale: 1 });
  } else if (e.type === 'mouseleave') {
    tl.to([imageBlock], { yPercent: -101 }).to(
      [imageMask],
      { yPercent: 100, scale: 1.15 },
      0
    );
  }

  return tl;
}

function init() {
  initHoverReveal();
}

window.addEventListener('load', function () {
  init();
});
