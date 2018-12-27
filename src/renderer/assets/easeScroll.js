/* eslint-disable */

export default function SmoothScroll(target, speed, smooth) {
  if (target == document)
    target =
      document.documentElement || document.body.parentNode || document.body; // cross browser support for document scrolling
  let moving = false;
  let pos = target.scrollTop;
  target.addEventListener("mousewheel", scrolled, false);
  target.addEventListener("DOMMouseScroll", scrolled, false);

  function scrolled(e) {
    e.preventDefault(); // disable default scrolling

    const delta = normalizeWheelDelta(e);

    pos += -delta * speed;
    pos = Math.max(0, Math.min(pos, target.scrollHeight - target.clientHeight)); // limit scrolling

    if (!moving) update();
  }

  function normalizeWheelDelta(e) {
    if (e.detail) {
      if (e.wheelDelta)
        return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
      // Opera
      else return -e.detail / 3; // Firefox
    } else return e.wheelDelta / 120; // IE,Safari,Chrome
  }

  function update() {
    moving = true;
    var delta = (pos - target.scrollTop) / smooth;
    target.scrollTop += delta;
    if (Math.abs(delta) > 0.5) requestFrame(update);
    else moving = false;
  }

  var requestFrame = (function() {
    // requestAnimationFrame cross browser
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(func) {
        window.setTimeout(func, 1000 / 50);
      }
    );
  })();
};