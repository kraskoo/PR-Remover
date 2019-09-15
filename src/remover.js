(function () {
	var divs = Array.from(document.querySelectorAll('div'));
	var divToRemove = null;
	var highestZIndex = -1;
	while (true) {
		for (var div of divs) {
			var computedDivStyle = window.getComputedStyle(div, null);
			var zIndex = Number(computedDivStyle.getPropertyValue('z-index'));
			if (!isNaN(zIndex) && highestZIndex < zIndex) {
				highestZIndex = zIndex;
				divToRemove = div;
				continue;
			}
			
			var opacity = Number(computedDivStyle.getPropertyValue('opacity'));
			if (!isNaN(opacity) && opacity < 1) {
				div.style.opacity = '1';
			}
		}

		if (divToRemove && divToRemove.parentElement) {
			divs = divs.filter(x => x !== divToRemove);
			divToRemove.parentElement.removeChild(divToRemove);
			divToRemove = null;
			highestZIndex = -1;
		} else break;
	}

	document.body.style.overflowY = 'auto';
}());