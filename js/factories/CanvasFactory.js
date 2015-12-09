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
		var fontStr = '3vw Helvetica';
		ctx.font = fontStr;
		ctx.fillText(text, coords.x, coords.y, coords.max);
	}
	function getCoords(size) {
		var coordSm = {x: 26, y: 260, max: 407};
		var coordMd = {x: 35, y: 350, max: 534};
		var coordLg = {x: 57, y: 520, max: 820};
		if (size.height === 300) return coordSm;
		if (size.height === 400) return coordMd;
		if (size.height === 600) return coordLg;
	}
	return {
		drawImg: drawImg,
		drawText: drawText
	};
});