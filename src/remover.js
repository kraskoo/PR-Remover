(function () {
  var divs = Array.from(document.querySelectorAll('div'))
    .map(x => ({ el: x, cs: window.getComputedStyle(x, null) }))
    .sort((a, b) => {
      var zIndexA = Number(a.cs.getPropertyValue('z-index'));
      var zIndexB = Number(b.cs.getPropertyValue('z-index'));
      if (!isNaN(zIndexA) && !isNaN(zIndexB)) {
        return zIndexB - zIndexA;
      } else return Number.MIN_SAFE_INTEGER;
    });
  divs.forEach(x => {
    var zIndex = Number(x.cs.getPropertyValue('z-index'));
    if (!isNaN(zIndex) && zIndex > 0) {
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