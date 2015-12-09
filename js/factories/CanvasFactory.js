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
	function drawText(canvas, text, size) {
		drawImg(canvas, size);
		var ctx = canvas.getContext("2d");
		var coords = getCoords(size);
		ctx.font = "3vw 'Helvetica' sans-serif bold black";
		ctx.fillText(text, coords.x, coords.y, coords.max);
	}
	function getCoords(size) {
		var coordSm = {x: 26, y: 267, max: 407};
		var coordMd = {x: 35, y: 353, max: 534};
		var coordLg = {x: 53, y: 535, max: 825};
		if (size.height === 300) return coordSm;
		if (size.height === 400) return coordMd;
		if (size.height === 600) return coordLg;
	}
	return {
		drawImg: drawImg,
		drawText: drawText
	};
});