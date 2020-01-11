chrome.runtime.onMessage.addListener(function (message, _sender, _sendResponse) {
  var parser = new DOMParser();
  var req = new XMLHttpRequest();
  req.addEventListener("load", function () {
    var doc = parser.parseFromString(this.responseText, 'text/html');
    document.body = doc.body;
  });
  req.open("GET", message);
  req.send();
});