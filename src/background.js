'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ removePopUpsOneByOne: false }, () => { });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostContains: '.', schemes: ['http', 'https'] },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    for (let tab of tabs) {
      removePopUp(tab);
    }
  });
});

function removePopUp(tab) {
  if (tab.url.startsWith('chrome://')) {
    return;
  }

	chrome.storage.sync.get('removePopUpsOneByOne', function (items) {
    var filePath = items.removePopUpsOneByOne ? './removerFirst.js' : './remover.js';
    chrome.tabs.executeScript(tab.id, { file: filePath });
	});
}