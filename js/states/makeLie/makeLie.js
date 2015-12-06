app.config(function ($stateProvider) {
    $stateProvider.state("makeLie", {
        url: '/makeLie/:imgNum',
        templateUrl: 'states/makeLie/makeLie.html',
        resolve: {
        },
        controller: function ($scope, $state, $stateParams, DownloadFactory, CanvasFactory) {
        	var canvas = document.querySelector('#the-canvas');
        	$scope.carsonNum = $stateParams.imgNum;
            $scope.imgSrc = "/carson" + $stateParams.imgNum + "-clear-crop.jpg";
        	function drawCanvasImage (cvs) {
        		CanvasFactory.drawImg(cvs);
        	}
        	$scope.drawCanvasText = function (txt) {
        		$scope.downloadReady = false;
        		CanvasFactory.drawText(canvas, txt, $scope.carsonNum);
        	};
        	drawCanvasImage(canvas);
            $scope.prepare = function () {
            	$scope.dataURL = canvas.toBlob(function (blob) {
            		$scope.downloadReady = true;
            		saveAs(blob, "carson-lies.jpg");
            	});
            	// DownloadFactory.getImg(canvas).then(function(data) {
            	// 	console.log("data received", data);
            	// });
            };
        }
    });
});