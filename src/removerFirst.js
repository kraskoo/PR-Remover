(function () {
  var divs = Array.from(document.querySelectorAll('*'))
      .map(x => ({ el: x, cs: window.getComputedStyle(x, null), zIndex: Number(window.getComputedStyle(x, null).getPropertyValue('z-index')) }))
      .sort((a, b) => b.zIndex - a.zIndex);
  var hasRemoveFirst = false;
  divs.forEach(x => {
    if (!hasRemoveFirst && !isNaN(x.zIndex)) {
      var el = x.el;
      if (el && el.parentElement) {
        el.parentElement.removeChild(el);
        hasRemoveFirst = !hasRemoveFirst;
      }
    } else {
      var opacity = Number(x.cs.getPropertyValue('opacity'));
      if (!isNaN(opacity) && opacity < 1) {
        x.el.style.opacity = '1';
      }
    }
  });
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';
}());