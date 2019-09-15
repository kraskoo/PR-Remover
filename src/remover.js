(function () {
	var divs = Array.from(document.querySelectorAll('div'));
	var divToRemove = null;
	var highestZIndex = -1;
	for (var div of divs) {
		var opacity = Number(window.getComputedStyle(div, null).getPropertyValue('opacity'));		
		var zIndex = Number(window.getComputedStyle(div, null).getPropertyValue('z-index'));
		if (!isNaN(zIndex) && highestZIndex < zIndex) {
			highestZIndex = zIndex;
			divToRemove = div;
			continue;
		}
		
		if (!isNaN(opacity) && opacity < 1) {
			div.style.opacity = '1';
		}
	}

	if (divToRemove && divToRemove.parentElement) {
		divToRemove.parentElement.removeChild(divToRemove);
	}

	document.body.style.overflowY = 'auto';
}());