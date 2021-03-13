gsap.registerPlugin(ScrollTrigger);

// 01 – Navigation and header image tilt section

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
    // markers: true,
  });
}

function initHeaderTilt() {
  document.querySelector('header').addEventListener('mousemove', moveImages);
}

function moveImages(e) {
  const { offsetX, offsetY, target } = e;
  const { clientWidth, clientHeight } = target;
  // console.log(offsetX, offsetY, clientWidth, clientHeight);

  const xPos = offsetX / clientWidth - 0.5;
  const yPos = offsetY / clientHeight - 0.5;

  const leftImages = gsap.utils.toArray('.hg__left .hg__image');
  const rightImages = gsap.utils.toArray('.hg__right .hg__image');

  const modifier = (index) => index * 1.2 + 0.5;

  // Move left images
  leftImages.forEach((image, index) => {
    gsap.to(image, {
      duration: 1.2,
      x: xPos * 20 * modifier(index),
      y: yPos * 30 * modifier(index),
      rotationY: xPos * 40,
      rotationX: yPos * 10,
    });
  });

  // Move right images
  rightImages.forEach((image, index) => {
    gsap.to(image, {
      duration: 1.2,
      x: xPos * 20 * modifier(index),
      y: -yPos * 30 * modifier(index),
      rotationY: xPos * 40,
      rotationX: yPos * 10,
    });
  });

  gsap.to('.decor__circle', {
    duration: 1.7,
    x: 80 * xPos,
    y: 80 * yPos,
    ease: 'Power4.out',
  });
}

// 02 – Reveal gallery
const sections = document.querySelectorAll('.rg__column');

function initHoverReveal() {
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

// Define a breakpoint
const mq = window.matchMedia('(min-width: 768px');

// Add change listener to this breakpoint
mq.addEventListener('change', handleWidthChange);

// First page load
handleWidthChange(mq);

// Reset all props
function resetProps(elements) {
  // Stop all tweens
  gsap.killTweensOf('*');

  //   Reset all inline styles added by GSAP
  if (elements.length) {
    elements.forEach((el) => {
      el && gsap.set(el, { clearProps: 'all' });
    });
  }
}

// Media query change
function handleWidthChange(mq) {
  if (mq.matches) {
    initHoverReveal();
  } else {
    // Remove all event listeners on mobile
    sections.forEach((section) => {
      section.removeEventListener('mouseenter', createHoverReveal);
      section.removeEventListener('mouseleave', createHoverReveal);

      const { imageBlock, imageMask, text, textCopy, textMask } = section;
      resetProps([imageBlock, imageMask, text, textCopy, textMask]);
    });
  }
}

// 03 – Portfolio Hover links
const allLinks = gsap.utils.toArray('.portfolio__categories a');
const pageBg = document.querySelector('.fill-background');
const largeImage = document.querySelector('.portfolio__image--l');
const smallImage = document.querySelector('.portfolio__image--s');
const largeImageInside = document.querySelector(
  '.portfolio__image--l .image_inside'
);
const smallImageInside = document.querySelector(
  '.portfolio__image--s .image_inside'
);

function initPortfolioHover() {
  allLinks.forEach((link) => {
    link.addEventListener('mouseenter', createPortfolioHover);
    link.addEventListener('mouseleave', createPortfolioHover);
    link.addEventListener('mousemove', createPortfolioMove);
  });
}

function createPortfolioHover(e) {
  if (e.type === 'mouseenter') {
    const { color, imagelarge, imagesmall } = e.target.dataset;
    const tl = gsap.timeline();
    const allSiblings = allLinks.filter((item) => item !== e.target);

    tl.set(largeImageInside, { backgroundImage: `url(${imagelarge})` })
      .set(smallImageInside, { backgroundImage: `url(${imagesmall})` })
      .to([largeImage, smallImage], { duration: 0.9, autoAlpha: 1 })
      .to(allSiblings, { color: '#FFFFFF', autoAlpha: 0.2 }, 0)
      .to(e.target, { color: '#FFFFFF', autoAlpha: 1 }, 0)
      .to(pageBg, { backgroundColor: color, ease: 'none' }, 0);
  } else if (e.type === 'mouseleave') {
    const tl = gsap.timeline();
    tl.to([largeImage, smallImage], { autoAlpha: 0 })
      .to([e.target, allLinks], { color: '#000', autoAlpha: 1 }, 0)
      .to(pageBg, { backgroundColor: '#ACB7AB', ease: 'none' }, 0);
  }
}

function createPortfolioMove(e) {
  const { clientY } = e;

  // Move the large image
  gsap.to(largeImage, {
    duration: 1.2,
    y: getPortfolioOffset(clientY) / 6,
    ease: 'Power3.out',
  });

  // Move the small image
  gsap.to(smallImage, {
    duration: 1.5,
    y: getPortfolioOffset(clientY) / 3,
    ease: 'Power3.out',
  });
}

function getPortfolioOffset(clientY) {
  return -(
    document.querySelector('.portfolio__categories').clientHeight - clientY
  );
}

function init() {
  initNavigation();
  initHeaderTilt();
  initPortfolioHover();
}

window.addEventListener('load', function () {
  init();
});
