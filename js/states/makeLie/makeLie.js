app.config(function ($stateProvider) {
    $stateProvider.state("makeLie", {
        url: '/',
        templateUrl: 'states/makeLie/makeLie.html',
        resolve: {
            randomCarson: function () {
                return Math.floor(Math.random() * 10000) % 7 + 1; 
            }
        },
        controller: function ($scope, $state, DownloadFactory, CanvasFactory, randomCarson) {
        	$scope.reload = function () {
                $state.go("makeLie", {}, {reload:true});
            }
            var vpWidth = document.documentElement.clientWidth;
            var canvas = document.querySelector('#the-canvas');
            $scope.canvasSize = {width: 1067, height: 600};
            if (vpWidth < 768) {
                $scope.canvasSize.width = 533;
                $scope.canvasSize.height= 300;
            }
            else if (vpWidth >= 768 && vpWidth < 993) {
                $scope.canvasSize.width = 704;
                $scope.canvasSize.height= 400;
            }
            console.log("width, canvasSize", vpWidth, $scope.canvasSize);
        	$scope.carsonNum = randomCarson;
            console.log("carsonNum:", $scope.carsonNum);
            $scope.imgSrc = "/carson-" + $scope.carsonNum + ".jpg";
        	function drawCanvasImage (cvs, canvasSize) {
        		CanvasFactory.drawImg(cvs, canvasSize);
        	}
        	$scope.drawCanvasText = function (txt, size) {
                console.log("canvassize", size);
                var text = txt.toUpperCase();
        		CanvasFactory.drawText(canvas, text, size);
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