(function () {
  Array.from(document.querySelectorAll('*'))
    .map(x => ({ el: x, cs: window.getComputedStyle(x, null), zIndex: Number(window.getComputedStyle(x, null).getPropertyValue('z-index')) }))
    .sort((a, b) => b.zIndex - a.zIndex)
    .forEach(x => {
      var opacity = x.cs.getPropertyValue('opacity');
      var visibility = x.cs.getPropertyValue('visibility');
      var el = x.el;
      if (opacity && Number(opacity) === 1 && visibility === 'visible') {
        if (el.parentElement) {
          el.parentElement.removeChild(el);
        }
      } else if (!isNaN(x.zIndex) && x.zIndex > 0) {
        if (el.parentElement) {
          el.parentElement.removeChild(el);
        }
      } else {
        if (!isNaN(Number(opacity)) && Number(opacity) < 1) {
          el.style.opacity = '1';
        }
      }
    });
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';
}());