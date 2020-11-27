const testWebP = require("./modules/webptest");
const loadheader = require("./modules/loadheader");
const makeHeaderHide = require('./modules/hidingheader');
const ClipboardJS = require("clipboard");
const Glide = require("@glidejs/glide");

testWebP();
loadheader();
new ClipboardJS(".page-menu__mail-copybox");
if (window.innerWidth > 900) {
  makeHeaderHide();
  new Glide(".categories", {
    type: "slider",
    bound: true,
    perView: 11,
    rewind: false,
    animationDuration: 200,
    breakpoints: {
      1500: {
        perView: 9,
      },
      1200: {
        perView: 7,
      },
    },
  }).mount();
}
new Glide(".portfolio__wrapper", {
  type: "slider",
  perView: 1,
  gap: 0,
  autoplay: 2000,
  animationDuration: 500,
  touchRatio: 1,
}).mount();

document.querySelector('.about__show-more').onclick = (function(){
  const desktopHidden = document.querySelectorAll('.about__hidden-desktop-block');
  const mobileHidden = document.querySelectorAll(
    '.about__hidden-mobile-block'
  );
  return function() {
    this.textContent = this.textContent === '+' ? '-' : '+';
    if (window.innerWidth > 900) {
      desktopHidden.forEach(elem =>
        elem.classList.toggle('about__hidden-desktop-block')
      );
    } else {
      mobileHidden.forEach(elem =>
        elem.classList.toggle('about__hidden-mobile-block')
      );
    }
  }

})();

if (window.innerWidth <= 900) {
  document.addEventListener('click', evt => {
    let title = evt.target.closest('.page-footer__outer-title');
    if (!title) return;
    console.log(title.nextElementSibling.hidden);
    title.nextElementSibling.style.display =
      title.nextElementSibling.style.display === 'block' ? 'none' : 'block';
  });
}