const Glide = require("@glidejs/glide");

function getCarousels() {
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

module.exports = getCarousels;