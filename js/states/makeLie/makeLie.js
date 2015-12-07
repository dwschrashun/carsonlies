app.config(function ($stateProvider) {
    $stateProvider.state("makeLie", {
        url: '/makeLie/:imgNum',
        templateUrl: 'states/makeLie/makeLie.html',
        resolve: {
        },
        controller: function ($scope, $state, $stateParams, DownloadFactory, CanvasFactory) {
        	var vpWidth = document.documentElement.clientWidth;
            var canvas = document.querySelector('#the-canvas');
            $scope.canvasSize = {width: 800, height: 600};
            if (vpWidth < 768) {
                $scope.canvasSize.width = 400;
                $scope.canvasSize.height= 300;
            }
            else if (vpWidth >= 768 && vpWidth < 993) {
                $scope.canvasSize.width = 600;
                $scope.canvasSize.height= 450;
            }
            console.log("width, canvasSize", vpWidth, $scope.canvasSize);
        	$scope.carsonNum = $stateParams.imgNum;
            $scope.imgSrc = "/carson" + $stateParams.imgNum + "-clear-crop.jpg";
        	function drawCanvasImage (cvs, canvasSize) {
        		CanvasFactory.drawImg(cvs, canvasSize);
        	}
        	$scope.drawCanvasText = function (txt) {
        		$scope.downloadReady = false;
        		CanvasFactory.drawText(canvas, txt, $scope.carsonNum);
        	};
        	drawCanvasImage(canvas, $scope.canvasSize);
            $scope.prepare = function () {
            	$scope.dataURL = canvas.toBlob(function (blob) {
            		$scope.downloadReady = true;
            		saveAs(blob, "carson-lies.jpg");
            	});
            };
        }
    });
});