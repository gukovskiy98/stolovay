// добавляем .webp к html, если webp поддерживается
// и .no-webp, если наоборот
function testWebP() {
  let webP = new Image();
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  webP.onload = webP.onerror = () => {
    document.documentElement.classList.add(
      webP.height === 2 ? "webp" : "no-webp"
    );
  };
}

module.exports = testWebP;