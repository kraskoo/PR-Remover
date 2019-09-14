'use strict';

let buttons = document.getElementById('buttons');
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	for (let currentTab of tabs) {
		Array.from(buttons.children).forEach(b => {
			b.addEventListener('click', ev => {
				let currentButton = ev.target;
				let id = currentButton.getAttribute('id');
				if (id === 'remove-pop-up') {
					removePopUp(currentTab);
				}
			});
		});
	}
});

function removePopUp(currentTab) {
	chrome.tabs.executeScript(currentTab.id, { code: `var divs = Array.from(document.querySelectorAll('div')); var divToRemove = null; var highestZIndex = -1; for (var div of divs) { var zIndex = Number(window.getComputedStyle(div, null).getPropertyValue('z-index')); if (highestZIndex < zIndex) { highestZIndex = zIndex; divToRemove = div; } } if (divToRemove && divToRemove.parentElement) { divToRemove.parentElement.removeChild(divToRemove); } document.body.style.overflowY = 'auto';` });
}