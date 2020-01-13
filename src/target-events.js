(function () {
  Array.from(document.querySelectorAll('script')).filter(x => x.src.toLowerCase().includes('google')).forEach(s => s.parentNode.removeChild(s));
  $('body').off('scroll');
}());