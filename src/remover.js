(function () {
  Array.from(document.querySelectorAll('div'))
    .map(x => ({ el: x, cs: window.getComputedStyle(x, null), zIndex: Number(window.getComputedStyle(x, null).getPropertyValue('z-index')) }))
    .sort((a, b) => b.zIndex - a.zIndex)
    .forEach(x => {
      if (!isNaN(x.zIndex) && x.zIndex > 0) {
        var div = x.el;
        if (div.parentElement) {
          div.parentElement.removeChild(div);
        }
      } else {
        var opacity = Number(x.cs.getPropertyValue('opacity'));
        if (!isNaN(opacity) && opacity < 1) {
          x.el.style.opacity = '1';
        }
      }
    });
  document.body.style.overflowY = 'auto';
}());