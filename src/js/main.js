// из npm
const Slideout = require("slideout");
const Glide = require("@glidejs/glide");

// мои модули
const testWebP = require("./modules/webptest");
const makeHeaderHide = require("./modules/hidingheader");

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