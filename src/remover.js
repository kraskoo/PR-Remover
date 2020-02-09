(function () {
  function onLoadRequest() {
    var parser = new DOMParser();
    var req = new XMLHttpRequest();
    return new Promise(function (res, rej) {
      req.addEventListener('load', function () {
        if (this.status >= 300) {
          rej(this.statusText);
          return;
        }

        var doc = parser.parseFromString(this.responseText, 'text/html');
        document.body = doc.body;
		document.querySelector('html').removeAttribute('class');
        document.documentElement.style.overflow = 'auto';
        document.documentElement.style.overscrollBehaviorY = 'auto';
        document.body.style.overflow = 'auto';
        document.body.style.overscrollBehaviorY = 'auto';
        res()
      });
      req.open("GET", location.href);
      req.send();
    });
  }

  onLoadRequest().then(function () {
    // some other operations
  }).catch(console.error);
}());