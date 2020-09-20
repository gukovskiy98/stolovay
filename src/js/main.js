const Glide = require("@glidejs/glide");
const header = require("./modules/loadheader")();
// из npm
const ClipboardJS = require("clipboard");
new ClipboardJS(".page-menu__mail-copybox");

// мои модули
const testWebP = require("./modules/webptest");
testWebP();

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