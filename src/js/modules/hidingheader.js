function makeHeaderHide() {
  const headerBottom = document.querySelector(".page-header__bottom");
  const fromTop = +getComputedStyle(headerBottom).top.slice(0, -2);
  const height = +getComputedStyle(headerBottom).height.slice(0, -2);
  const spaceToLeave = 31;

  function scrollHandler() {
    let delta =
      window.pageYOffset > height - spaceToLeave
        ? height - spaceToLeave
        : window.pageYOffset;
    headerBottom.style.top = fromTop - delta + "px";
  }
  document.addEventListener("scroll", scrollHandler);
}

module.exports = makeHeaderHide;
