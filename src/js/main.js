// const burger = require("./modules/loadheader")();
// из npm
const ClipboardJS = require("clipboard");
new ClipboardJS(".page-menu__mail-copybox");

// мои модули
const testWebP = require("./modules/webptest");
const makeHeaderHide = require("./modules/hidingheader");
const carousels = require("./modules/carousels");
// const copymail = require("./modules/copymail");

testWebP();
makeHeaderHide()
carousels();