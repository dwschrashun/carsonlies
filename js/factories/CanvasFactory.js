app.factory("CanvasFactory", function () {
	function drawImg (canvas, size) {
		var ctx = canvas.getContext("2d");
		var immij = document.getElementById('carson-image');
		ctx.drawImage(immij, 0, 0);
		immij.onload = function () {
				ctx.drawImage(immij, 0, 0, size.width, size.height);
		};
		immij.onerror = function () {
			console.log("image error");
		};
	}
	function drawText(canvas, text, num) {
		drawImg(canvas);
		var ctx = canvas.getContext("2d");
		var coords = getCoords(num);
		ctx.font = "3vw 'Helvetica' sans-serif bold black";
		ctx.fillText(text, coords.x, coords.y, coords.max);
	}
	function getCoords(num) {
		var coordArr = [{x: 30, y: 535, max: 675},{x: 105, y: 515, max: 680},{x: 30, y: 530, max: 730},{x: 70, y: 550, max: 725}];
		return coordArr[num-1];
	}
	return {
		drawImg: drawImg,
		drawText: drawText
	};
});