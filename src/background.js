'use strict';

var catchFirst = false;
var url = null;

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ removePopUpsOneByOne: true }, () => { });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostContains: '.', schemes: ['http', 'https'] },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    url = tab.url;
  });
})

chrome.tabs.onUpdated.addListener(function (tabId, _changeInfo, _tab) {
  chrome.tabs.get(tabId, function (tab) {
    if (!catchFirst) {
      url = tab.url;
      catchFirst = !catchFirst;
    }
  });
});

chrome.browserAction.onClicked.addListener(function () {
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
    var filePath = './remover.js';
    chrome.tabs.executeScript(tab.id, { file: filePath }, function() {
      chrome.tabs.sendMessage(tab.id, url);
    });
  });
}