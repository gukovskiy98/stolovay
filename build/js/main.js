"use strict";

(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }

        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }

      return n[i].exports;
    }

    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
      o(t[i]);
    }

    return o;
  }

  return r;
})()({
  1: [function (require, module, exports) {
    var testWebP = require("./modules/webptest.js");

    testWebP();
  }, {
    "./modules/webptest.js": 2
  }],
  2: [function (require, module, exports) {
    // добавляем .webp к html, если webp поддерживается
    // и .no-webp, если наоборот
    function testWebP() {
      var webP = new Image();
      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";

      webP.onload = webP.onerror = function () {
        document.documentElement.classList.add(webP.height === 2 ? "webp" : "no-webp");
      };
    }

    module.exports = testWebP;
  }, {}]
}, {}, [1]);