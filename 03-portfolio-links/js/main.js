gsap.registerPlugin(ScrollTrigger);

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

function init() {
  initPortfolioHover();
}

window.addEventListener('load', function () {
  init();
});
