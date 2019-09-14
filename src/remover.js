var divs = Array.from(document.querySelectorAll('div'));
var divToRemove = null;
var highestZIndex = -1;
for (var div of divs) {
	var zIndex = Number(window.getComputedStyle(div, null).getPropertyValue('z-index'));
	if (highestZIndex < zIndex) {
		highestZIndex = zIndex; divToRemove = div;
	}
}

if (divToRemove && divToRemove.parentElement) {
	divToRemove.parentElement.removeChild(divToRemove);
}

document.body.style.overflowY = 'auto';