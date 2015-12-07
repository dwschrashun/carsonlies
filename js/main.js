'use strict';
window.app = angular.module('CarsonLies', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, $state) {
    // The given state requires an authenticated user.

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    // $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    // 	console.log("run tostate", toState);

    // });

});

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
app.config(function ($stateProvider) {
    $stateProvider.state("menu", {
        url: '/',
        templateUrl: 'states/menu/menu.html',
        controller: function ($scope, $state) {
            $scope.loadCarson = function (event) {
                var imgNum = event.target.id.substring(6);
                $state.go("makeLie", {imgNum: imgNum});
            };
        }
    });
});
app.directive('navbar', function ($state) {

    return {
        restrict: 'E',
        scope: {
            quote: "@",
            chosen: "@"
        },
        templateUrl: 'directives/navbar/navbar.html',
        link: function (scope) {
            scope.$on("$stateChangeStart", function (event, toState, toParams) {
                scope.chosen = toState.name !== "menu" ? true : false;
            });
        }
    };

});

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
app.factory("DownloadFactory", function () {
	function getImg (imgNum, text) {
		var route = `/api/download?imgNum=${imgNum}&text=${text}`;
		$http.get(route).then(function (response) {
			return response.data;
		});
	}
	return {
		getImg: getImg
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1ha2VMaWUvbWFrZUxpZS5qcyIsIm1lbnUvbWVudS5qcyIsIm5hdmJhci9uYXZiYXIuanMiLCJDYW52YXNGYWN0b3J5LmpzIiwiZG93bmxvYWRGYWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdDYXJzb25MaWVzJywgWyd1aS5yb3V0ZXInXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgICAvLyBUaGlzIHR1cm5zIG9mZiBoYXNoYmFuZyB1cmxzICgvI2Fib3V0KSBhbmQgY2hhbmdlcyBpdCB0byBzb21ldGhpbmcgbm9ybWFsICgvYWJvdXQpXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuICAgIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn0pO1xuXG4vLyBUaGlzIGFwcC5ydW4gaXMgZm9yIGNvbnRyb2xsaW5nIGFjY2VzcyB0byBzcGVjaWZpYyBzdGF0ZXMuXG5hcHAucnVuKGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkc3RhdGUpIHtcbiAgICAvLyBUaGUgZ2l2ZW4gc3RhdGUgcmVxdWlyZXMgYW4gYXV0aGVudGljYXRlZCB1c2VyLlxuXG4gICAgLy8gJHN0YXRlQ2hhbmdlU3RhcnQgaXMgYW4gZXZlbnQgZmlyZWRcbiAgICAvLyB3aGVuZXZlciB0aGUgcHJvY2VzcyBvZiBjaGFuZ2luZyBhIHN0YXRlIGJlZ2lucy5cbiAgICAvLyAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zKSB7XG4gICAgLy8gXHRjb25zb2xlLmxvZyhcInJ1biB0b3N0YXRlXCIsIHRvU3RhdGUpO1xuXG4gICAgLy8gfSk7XG5cbn0pO1xuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZShcIm1ha2VMaWVcIiwge1xuICAgICAgICB1cmw6ICcvbWFrZUxpZS86aW1nTnVtJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdzdGF0ZXMvbWFrZUxpZS9tYWtlTGllLmh0bWwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgkc2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCBEb3dubG9hZEZhY3RvcnksIENhbnZhc0ZhY3RvcnkpIHtcbiAgICAgICAgXHR2YXIgdnBXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGhlLWNhbnZhcycpO1xuICAgICAgICAgICAgJHNjb3BlLmNhbnZhc1NpemUgPSB7d2lkdGg6IDgwMCwgaGVpZ2h0OiA2MDB9O1xuICAgICAgICAgICAgaWYgKHZwV2lkdGggPCA3NjgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2FudmFzU2l6ZS53aWR0aCA9IDQwMDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2FudmFzU2l6ZS5oZWlnaHQ9IDMwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHZwV2lkdGggPj0gNzY4ICYmIHZwV2lkdGggPCA5OTMpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2FudmFzU2l6ZS53aWR0aCA9IDYwMDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2FudmFzU2l6ZS5oZWlnaHQ9IDQ1MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid2lkdGgsIGNhbnZhc1NpemVcIiwgdnBXaWR0aCwgJHNjb3BlLmNhbnZhc1NpemUpO1xuICAgICAgICBcdCRzY29wZS5jYXJzb25OdW0gPSAkc3RhdGVQYXJhbXMuaW1nTnVtO1xuICAgICAgICAgICAgJHNjb3BlLmltZ1NyYyA9IFwiL2NhcnNvblwiICsgJHN0YXRlUGFyYW1zLmltZ051bSArIFwiLWNsZWFyLWNyb3AuanBnXCI7XG4gICAgICAgIFx0ZnVuY3Rpb24gZHJhd0NhbnZhc0ltYWdlIChjdnMsIGNhbnZhc1NpemUpIHtcbiAgICAgICAgXHRcdENhbnZhc0ZhY3RvcnkuZHJhd0ltZyhjdnMsIGNhbnZhc1NpemUpO1xuICAgICAgICBcdH1cbiAgICAgICAgXHQkc2NvcGUuZHJhd0NhbnZhc1RleHQgPSBmdW5jdGlvbiAodHh0KSB7XG4gICAgICAgIFx0XHQkc2NvcGUuZG93bmxvYWRSZWFkeSA9IGZhbHNlO1xuICAgICAgICBcdFx0Q2FudmFzRmFjdG9yeS5kcmF3VGV4dChjYW52YXMsIHR4dCwgJHNjb3BlLmNhcnNvbk51bSk7XG4gICAgICAgIFx0fTtcbiAgICAgICAgXHRkcmF3Q2FudmFzSW1hZ2UoY2FudmFzLCAkc2NvcGUuY2FudmFzU2l6ZSk7XG4gICAgICAgICAgICAkc2NvcGUucHJlcGFyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFx0JHNjb3BlLmRhdGFVUkwgPSBjYW52YXMudG9CbG9iKGZ1bmN0aW9uIChibG9iKSB7XG4gICAgICAgICAgICBcdFx0JHNjb3BlLmRvd25sb2FkUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgXHRcdHNhdmVBcyhibG9iLCBcImNhcnNvbi1saWVzLmpwZ1wiKTtcbiAgICAgICAgICAgIFx0fSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSk7XG59KTsiLCJhcHAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKFwibWVudVwiLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3N0YXRlcy9tZW51L21lbnUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgkc2NvcGUsICRzdGF0ZSkge1xuICAgICAgICAgICAgJHNjb3BlLmxvYWRDYXJzb24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW1nTnVtID0gZXZlbnQudGFyZ2V0LmlkLnN1YnN0cmluZyg2KTtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oXCJtYWtlTGllXCIsIHtpbWdOdW06IGltZ051bX0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7IiwiYXBwLmRpcmVjdGl2ZSgnbmF2YmFyJywgZnVuY3Rpb24gKCRzdGF0ZSkge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIHF1b3RlOiBcIkBcIixcbiAgICAgICAgICAgIGNob3NlbjogXCJAXCJcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXJlY3RpdmVzL25hdmJhci9uYXZiYXIuaHRtbCcsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICAgICAgc2NvcGUuJG9uKFwiJHN0YXRlQ2hhbmdlU3RhcnRcIiwgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcykge1xuICAgICAgICAgICAgICAgIHNjb3BlLmNob3NlbiA9IHRvU3RhdGUubmFtZSAhPT0gXCJtZW51XCIgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pO1xuIiwiYXBwLmZhY3RvcnkoXCJDYW52YXNGYWN0b3J5XCIsIGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gZHJhd0ltZyAoY2FudmFzLCBzaXplKSB7XG5cdFx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cdFx0dmFyIGltbWlqID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcnNvbi1pbWFnZScpO1xuXHRcdGN0eC5kcmF3SW1hZ2UoaW1taWosIDAsIDApO1xuXHRcdGltbWlqLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Y3R4LmRyYXdJbWFnZShpbW1paiwgMCwgMCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuXHRcdH07XG5cdFx0aW1taWoub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiaW1hZ2UgZXJyb3JcIik7XG5cdFx0fTtcblx0fVxuXHRmdW5jdGlvbiBkcmF3VGV4dChjYW52YXMsIHRleHQsIG51bSkge1xuXHRcdGRyYXdJbWcoY2FudmFzKTtcblx0XHR2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblx0XHR2YXIgY29vcmRzID0gZ2V0Q29vcmRzKG51bSk7XG5cdFx0Y3R4LmZvbnQgPSBcIjN2dyAnSGVsdmV0aWNhJyBzYW5zLXNlcmlmIGJvbGQgYmxhY2tcIjtcblx0XHRjdHguZmlsbFRleHQodGV4dCwgY29vcmRzLngsIGNvb3Jkcy55LCBjb29yZHMubWF4KTtcblx0fVxuXHRmdW5jdGlvbiBnZXRDb29yZHMobnVtKSB7XG5cdFx0dmFyIGNvb3JkQXJyID0gW3t4OiAzMCwgeTogNTM1LCBtYXg6IDY3NX0se3g6IDEwNSwgeTogNTE1LCBtYXg6IDY4MH0se3g6IDMwLCB5OiA1MzAsIG1heDogNzMwfSx7eDogNzAsIHk6IDU1MCwgbWF4OiA3MjV9XTtcblx0XHRyZXR1cm4gY29vcmRBcnJbbnVtLTFdO1xuXHR9XG5cdHJldHVybiB7XG5cdFx0ZHJhd0ltZzogZHJhd0ltZyxcblx0XHRkcmF3VGV4dDogZHJhd1RleHRcblx0fTtcbn0pOyIsImFwcC5mYWN0b3J5KFwiRG93bmxvYWRGYWN0b3J5XCIsIGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gZ2V0SW1nIChpbWdOdW0sIHRleHQpIHtcblx0XHR2YXIgcm91dGUgPSBgL2FwaS9kb3dubG9hZD9pbWdOdW09JHtpbWdOdW19JnRleHQ9JHt0ZXh0fWA7XG5cdFx0JGh0dHAuZ2V0KHJvdXRlKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdFx0cmV0dXJuIHJlc3BvbnNlLmRhdGE7XG5cdFx0fSk7XG5cdH1cblx0cmV0dXJuIHtcblx0XHRnZXRJbWc6IGdldEltZ1xuXHR9O1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
