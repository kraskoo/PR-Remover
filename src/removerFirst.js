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
  var firstDiv = divs[0];
  if (firstDiv) {
    var divElement = firstDiv.el;
    if (divElement) {
      var divComputedStyle = firstDiv.cs;
      var zIndex = divComputedStyle.getPropertyValue('z-index');
      if (!isNaN(zIndex) && zIndex > 0) {
        if (divElement.parentElement) {
          divElement.parentElement.removeChild(divElement);
        }
      }
    }
  }

  divs.filter(x => x !== firstDiv).forEach(x => {
    var zIndex = Number(x.cs.getPropertyValue('z-index'));
    if (!(!isNaN(zIndex) && zIndex > 0)) {
      var opacity = Number(x.cs.getPropertyValue('opacity'));
      if (!isNaN(opacity) && opacity < 1) {
        x.el.style.opacity = '1';
      }
    }
  });

  document.body.style.overflowY = 'auto';
}());