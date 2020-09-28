const testWebP = require("./modules/webptest");
const loadheader = require("./modules/loadheader");
const ClipboardJS = require("clipboard");
const Glide = require("@glidejs/glide");

testWebP();
loadheader();
new ClipboardJS(".page-menu__mail-copybox");
if (window.innerWidth > 900) {
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