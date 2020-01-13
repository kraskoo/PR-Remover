'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostContains: '.', schemes: ['http', 'https'] },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // if (changeInfo.status && changeInfo.status === 'complete') {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     for (let tab of tabs) {
  //       chrome.tabs.executeScript(tab.id, { file: './target-events.js' });
  //     }
  //   });
  // }
});

chrome.runtime.onMessage.addListener(
  function (request, sender, _sendResponse) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentTab = tabs[0];
      if (currentTab) {
        chrome.tabs.executeScript(currentTab.id, { code: request.code });
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

  chrome.tabs.executeScript(tab.id, { file: './remover.js' });
}