// for reversing animations when resizing to smaller breakpoints
var breakpoints = [0,768,1280],
	body = document.body,
	prevWidth = window.innerWidth,
	curBreakPoint = null,
	resizedRight = "resized-right";

function detectSmallerVP() {
	var newWidth = window.innerWidth;
	
	if (newWidth <= prevWidth) {
		// detect breakpoint and add class that reverses animation
		breakpoints.forEach((b,i) => {
			let nextB = breakpoints[i + 1] || 9999,
				betweenPoints = newWidth >= b && newWidth < nextB,
				notCurPoint = i != curBreakPoint,
				notLastPoint = i < breakpoints.length - 1,
				notResizedRightInPoint = !body.classList.contains(resizedRight);

			if (betweenPoints && notCurPoint && notLastPoint && notResizedRightInPoint) {
				curBreakPoint = i;
				body.className = "";
				void body.className;
				body.classList.add("down-to-point-" + curBreakPoint);
			}
		});

	} else if (body.classList.length) {
		body.className = resizedRight;
		curBreakPoint = null;
	}
	// remove animation freezer "resized-right" on next breakpoint to revert to normal animations
	if (body.classList.contains(resizedRight)) {
		let offset = 40;
		for (let b of breakpoints) {
			if (newWidth >= b && newWidth < b + offset) {
				body.classList.remove(resizedRight);
				break;
			}
		}
	}

	prevWidth = newWidth;
}

window.addEventListener("resize",detectSmallerVP);