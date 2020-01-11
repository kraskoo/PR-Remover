(function () {
  var parser = new DOMParser();
  var req = new XMLHttpRequest();
  req.addEventListener("load", function () {
    var doc = parser.parseFromString(this.responseText, 'text/html');
    document.body = doc.body;
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  });
  req.open("GET", location.href);
  req.send();
}())