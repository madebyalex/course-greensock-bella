gsap.registerPlugin(ScrollTrigger);

function initHoverReveal() {
  const sections = document.querySelectorAll('.rg__column');

  sections.forEach((section) => {
    // Get elements for animation
    section.imageBlock = section.querySelector('.rg__image');
    section.imageMask = section.querySelector('.rg__image--mask');
    section.text = section.querySelector('.rg__text');

    section.textHeight = section.querySelector('.rg__text--copy').clientHeight;
    section.textCopy = section.querySelector('.rg__text--copy');
    section.textMask = section.querySelector('.rg__text--mask');

    // Reset the initial position
    gsap.set(section.imageBlock, { yPercent: -101 });
    gsap.set(section.imageMask, { yPercent: 100, scale: 1.15 });
    gsap.set(section.textCopy, { yPercent: -101 });
    gsap.set(section.textMask, { yPercent: 100, autoAlpha: 0 });

    // Add event listeners to each section
    section.addEventListener('mouseenter', createHoverReveal);
    section.addEventListener('mouseleave', createHoverReveal);
  });
}

function getTextHeight(textCopy) {
  return textCopy.clientHeight;
}

function createHoverReveal(e) {
  const { imageBlock, imageMask, text, textCopy, textMask } = e.target;

  let tl = gsap.timeline({
    defaults: {
      duration: 0.7,
      ease: 'Power4.out',
    },
  });

  if (e.type === 'mouseenter') {
    tl.to([imageBlock, imageMask, textMask], { yPercent: 0 })

      .to(text, { y: () => -getTextHeight(textCopy) / 2 }, 0)
      .to(textCopy, { yPercent: 0 }, 0)
      .to(textMask, { autoAlpha: 1 }, 0)
      .to(imageMask, { duration: 1.1, scale: 1 }, 0);
  } else if (e.type === 'mouseleave') {
    tl.to([imageBlock, textCopy], { yPercent: -101 })
      .to([imageMask, textMask], { yPercent: 100 }, 0)
      .to(text, { y: 0 }, 0)
      .to(textMask, { autoAlpha: 0 }, 0)
      .to(imageMask, { scale: 1.15 }, 0);
  }

  return tl;
}

function init() {
  initHoverReveal();
}

window.addEventListener('load', function () {
  init();
});
