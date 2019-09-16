(function () {
  var oneByOneCheckbox = document.getElementById('one-by-one');
  var status = document.getElementById('status');
  document.addEventListener('DOMContentLoaded', function () {
    var colElement = oneByOneCheckbox.parentElement.parentElement;
    var height = parseFloat(window.getComputedStyle(colElement, null).getPropertyValue('height'));
    status.parentElement.style.minHeight = height + 'px';
    chrome.storage.sync.get('removePopUpsOneByOne', function (items) {
      oneByOneCheckbox.checked = items.removePopUpsOneByOne;
    });
  });
  oneByOneCheckbox.addEventListener('click', function (ev) {
    var checked = ev.target.checked;
    chrome.storage.sync.set({ removePopUpsOneByOne: checked }, function () {
      status.textContent = 'Options saved.';
      setTimeout(function () { status.textContent = ''; }, 1000);
    });
  });
}());