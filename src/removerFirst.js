(function () {
  var elements = Array.from(document.querySelectorAll('div'))
      .map(x => ({ el: x, cs: window.getComputedStyle(x, null), zIndex: Number(window.getComputedStyle(x, null).getPropertyValue('z-index')) }))
      .sort((a, b) => {
        var bVisibility = b.cs.getPropertyValue('visibility');
        var aVisibility = a.cs.getPropertyValue('visibility');
        if (bVisibility === 'visible') return 1;
        else if (aVisibility === 'visible') return -1;
        return b.zIndex - a.zIndex;
      });
  var hasRemoveFirst = false;
  elements.forEach(x => {
    if (!x.cs) return;
    var opacity = x.cs.getPropertyValue('opacity');
    var hasOpacity = opacity && opacity !== '';
    opacity = Number(opacity);
    var visibility = x.cs.getPropertyValue('visibility');
    var el = x.el;
    if (!hasRemoveFirst && hasOpacity && !isNaN(opacity) && opacity === 1 && visibility === 'visible') {
      if (el.parentElement) {
        el.parentElement.removeChild(el);
        hasRemoveFirst = !hasRemoveFirst;
      }
    } else if (!hasRemoveFirst && !isNaN(x.zIndex) && x.zIndex > 0) {
      if (el.parentElement) {
        el.parentElement.removeChild(el);
        hasRemoveFirst = !hasRemoveFirst;
      }
    } else {
      if (hasOpacity && !isNaN(opacity) && opacity < 1) {
        el.style.opacity = '1';
      }
    }
  });
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';
}());