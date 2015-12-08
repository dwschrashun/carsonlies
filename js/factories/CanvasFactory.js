app.factory("CanvasFactory", function () {
	function drawImg (canvas, size) {
		var ctx = canvas.getContext("2d");
		var immij = document.getElementById('carson-image');
		ctx.drawImage(immij, 0, 0, size.width, size.height);
		immij.onload = function () {
				ctx.drawImage(immij, 0, 0, size.width, size.height);
		};
		immij.onerror = function () {
			console.log("image error");
		};
	}
	function drawText(canvas, text, num, size) {
		drawImg(canvas, size);
		var ctx = canvas.getContext("2d");
		var coords = getCoords(num, size);
		ctx.font = "3vw 'Helvetica' sans-serif bold black";
		ctx.fillText(text, coords.x, coords.y, coords.max);
	}
	function getCoords(num, size) {
		var coordArrSm = [{x: 15, y: 267, max: 332},{x: 53, y: 257, max: 340},{x: 15, y: 265, max: 365},{x: 35, y: 225, max: 313}];
		var coordArrMd = [{x: 22, y: 401, max: 506},{x: 79, y: 386, max: 510},{x: 22, y: 397, max: 547},{x: 52, y: 412, max: 543}];
		var coordArrLg = [{x: 30, y: 535, max: 675},{x: 105, y: 515, max: 680},{x: 30, y: 530, max: 730},{x: 70, y: 550, max: 725}];
		if (size.width === 400) return coordArrSm[num-1];
		if (size.width === 600) return coordArrMd[num-1];
		if (size.width === 800) return coordArrLg[num-1];
	}
	return {
		drawImg: drawImg,
		drawText: drawText
	};
});