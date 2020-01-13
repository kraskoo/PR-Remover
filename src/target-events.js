(function () {
  Array.from(document.querySelectorAll('script')).filter(x => x.src.toLowerCase().includes('google')).forEach(s => s.parentNode.removeChild(s));
  Array.from(document.querySelectorAll('*[class*="overlay"]')).forEach(e => e.parentNode.removeChild(e));
  setTimeout(function() {
    Object.keys(this).filter(x => x.toLowerCase().includes('goog') || x.toLowerCase().includes('ga')).forEach(x => delete this[x]);
  }, 1000);
  $('body').off('scroll');
}());