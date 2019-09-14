'use strict';

chrome.browserAction.onClicked.addListener(removePopUp);

function removePopUp(tab) {
	chrome.tabs.executeScript(tab.id, { file: './remover.js' });
}