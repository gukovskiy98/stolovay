// из npm
const Slideout = require("slideout");

// мои модули
const testWebP = require("./modules/webptest");
const makeHeaderHide = require("./modules/hidingheader");
const carousels = require("./modules/carousels")

testWebP();
makeHeaderHide()

// const selectWrapper = document.querySelector(".select-wrapper");
// const select = selectWrapper.querySelector("#search-category");
// selectWrapper.addEventListener("click", function() {
//   select.dispatchEvent(new MouseEvent("click", {
//     bubbles: true,
//     cancelable: true,
//   }));
// });