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
        	$scope.drawCanvasText = function (txt, size) {
                console.log("canvassize", size);
        		CanvasFactory.drawText(canvas, txt, $scope.carsonNum, size);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1ha2VMaWUvbWFrZUxpZS5qcyIsIm1lbnUvbWVudS5qcyIsIm5hdmJhci9uYXZiYXIuanMiLCJDYW52YXNGYWN0b3J5LmpzIiwiZG93bmxvYWRGYWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0NhcnNvbkxpZXMnLCBbJ3VpLnJvdXRlciddKTtcblxuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuICAgIC8vIFRoaXMgdHVybnMgb2ZmIGhhc2hiYW5nIHVybHMgKC8jYWJvdXQpIGFuZCBjaGFuZ2VzIGl0IHRvIHNvbWV0aGluZyBub3JtYWwgKC9hYm91dClcbiAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gICAgLy8gSWYgd2UgZ28gdG8gYSBVUkwgdGhhdCB1aS1yb3V0ZXIgZG9lc24ndCBoYXZlIHJlZ2lzdGVyZWQsIGdvIHRvIHRoZSBcIi9cIiB1cmwuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufSk7XG5cbi8vIFRoaXMgYXBwLnJ1biBpcyBmb3IgY29udHJvbGxpbmcgYWNjZXNzIHRvIHNwZWNpZmljIHN0YXRlcy5cbmFwcC5ydW4oZnVuY3Rpb24gKCRyb290U2NvcGUsICRzdGF0ZSkge1xuICAgIC8vIFRoZSBnaXZlbiBzdGF0ZSByZXF1aXJlcyBhbiBhdXRoZW50aWNhdGVkIHVzZXIuXG5cbiAgICAvLyAkc3RhdGVDaGFuZ2VTdGFydCBpcyBhbiBldmVudCBmaXJlZFxuICAgIC8vIHdoZW5ldmVyIHRoZSBwcm9jZXNzIG9mIGNoYW5naW5nIGEgc3RhdGUgYmVnaW5zLlxuICAgIC8vICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uIChldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMpIHtcbiAgICAvLyBcdGNvbnNvbGUubG9nKFwicnVuIHRvc3RhdGVcIiwgdG9TdGF0ZSk7XG5cbiAgICAvLyB9KTtcblxufSk7XG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKFwibWFrZUxpZVwiLCB7XG4gICAgICAgIHVybDogJy9tYWtlTGllLzppbWdOdW0nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3N0YXRlcy9tYWtlTGllL21ha2VMaWUuaHRtbCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMsIERvd25sb2FkRmFjdG9yeSwgQ2FudmFzRmFjdG9yeSkge1xuICAgICAgICBcdHZhciB2cFdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aGUtY2FudmFzJyk7XG4gICAgICAgICAgICAkc2NvcGUuY2FudmFzU2l6ZSA9IHt3aWR0aDogODAwLCBoZWlnaHQ6IDYwMH07XG4gICAgICAgICAgICBpZiAodnBXaWR0aCA8IDc2OCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5jYW52YXNTaXplLndpZHRoID0gNDAwO1xuICAgICAgICAgICAgICAgICRzY29wZS5jYW52YXNTaXplLmhlaWdodD0gMzAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodnBXaWR0aCA+PSA3NjggJiYgdnBXaWR0aCA8IDk5Mykge1xuICAgICAgICAgICAgICAgICRzY29wZS5jYW52YXNTaXplLndpZHRoID0gNjAwO1xuICAgICAgICAgICAgICAgICRzY29wZS5jYW52YXNTaXplLmhlaWdodD0gNDUwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3aWR0aCwgY2FudmFzU2l6ZVwiLCB2cFdpZHRoLCAkc2NvcGUuY2FudmFzU2l6ZSk7XG4gICAgICAgIFx0JHNjb3BlLmNhcnNvbk51bSA9ICRzdGF0ZVBhcmFtcy5pbWdOdW07XG4gICAgICAgICAgICAkc2NvcGUuaW1nU3JjID0gXCIvY2Fyc29uXCIgKyAkc3RhdGVQYXJhbXMuaW1nTnVtICsgXCItY2xlYXItY3JvcC5qcGdcIjtcbiAgICAgICAgXHRmdW5jdGlvbiBkcmF3Q2FudmFzSW1hZ2UgKGN2cywgY2FudmFzU2l6ZSkge1xuICAgICAgICBcdFx0Q2FudmFzRmFjdG9yeS5kcmF3SW1nKGN2cywgY2FudmFzU2l6ZSk7XG4gICAgICAgIFx0fVxuICAgICAgICBcdCRzY29wZS5kcmF3Q2FudmFzVGV4dCA9IGZ1bmN0aW9uICh0eHQsIHNpemUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbnZhc3NpemVcIiwgc2l6ZSk7XG4gICAgICAgIFx0XHRDYW52YXNGYWN0b3J5LmRyYXdUZXh0KGNhbnZhcywgdHh0LCAkc2NvcGUuY2Fyc29uTnVtLCBzaXplKTtcbiAgICAgICAgXHR9O1xuICAgICAgICBcdGRyYXdDYW52YXNJbWFnZShjYW52YXMsICRzY29wZS5jYW52YXNTaXplKTtcbiAgICAgICAgICAgICRzY29wZS5wcmVwYXJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgXHQkc2NvcGUuZGF0YVVSTCA9IGNhbnZhcy50b0Jsb2IoZnVuY3Rpb24gKGJsb2IpIHtcbiAgICAgICAgICAgIFx0XHQkc2NvcGUuZG93bmxvYWRSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICBcdFx0c2F2ZUFzKGJsb2IsIFwiY2Fyc29uLWxpZXMuanBnXCIpO1xuICAgICAgICAgICAgXHR9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KTtcbn0pOyIsImFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoXCJtZW51XCIsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc3RhdGVzL21lbnUvbWVudS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAkc2NvcGUubG9hZENhcnNvbiA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBpbWdOdW0gPSBldmVudC50YXJnZXQuaWQuc3Vic3RyaW5nKDYpO1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhcIm1ha2VMaWVcIiwge2ltZ051bTogaW1nTnVtfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSk7XG59KTsiLCJhcHAuZGlyZWN0aXZlKCduYXZiYXInLCBmdW5jdGlvbiAoJHN0YXRlKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgcXVvdGU6IFwiQFwiLFxuICAgICAgICAgICAgY2hvc2VuOiBcIkBcIlxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2RpcmVjdGl2ZXMvbmF2YmFyL25hdmJhci5odG1sJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgICAgICBzY29wZS4kb24oXCIkc3RhdGVDaGFuZ2VTdGFydFwiLCBmdW5jdGlvbiAoZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuY2hvc2VuID0gdG9TdGF0ZS5uYW1lICE9PSBcIm1lbnVcIiA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxufSk7XG4iLCJhcHAuZmFjdG9yeShcIkNhbnZhc0ZhY3RvcnlcIiwgZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBkcmF3SW1nIChjYW52YXMsIHNpemUpIHtcblx0XHR2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblx0XHR2YXIgaW1taWogPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2Fyc29uLWltYWdlJyk7XG5cdFx0Y3R4LmRyYXdJbWFnZShpbW1paiwgMCwgMCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuXHRcdGltbWlqLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Y3R4LmRyYXdJbWFnZShpbW1paiwgMCwgMCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuXHRcdH07XG5cdFx0aW1taWoub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiaW1hZ2UgZXJyb3JcIik7XG5cdFx0fTtcblx0fVxuXHRmdW5jdGlvbiBkcmF3VGV4dChjYW52YXMsIHRleHQsIG51bSwgc2l6ZSkge1xuXHRcdGRyYXdJbWcoY2FudmFzLCBzaXplKTtcblx0XHR2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblx0XHR2YXIgY29vcmRzID0gZ2V0Q29vcmRzKG51bSwgc2l6ZSk7XG5cdFx0Y3R4LmZvbnQgPSBcIjN2dyAnSGVsdmV0aWNhJyBzYW5zLXNlcmlmIGJvbGQgYmxhY2tcIjtcblx0XHRjdHguZmlsbFRleHQodGV4dCwgY29vcmRzLngsIGNvb3Jkcy55LCBjb29yZHMubWF4KTtcblx0fVxuXHRmdW5jdGlvbiBnZXRDb29yZHMobnVtLCBzaXplKSB7XG5cdFx0dmFyIGNvb3JkQXJyU20gPSBbe3g6IDE1LCB5OiAyNjcsIG1heDogMzMyfSx7eDogNTMsIHk6IDI1NywgbWF4OiAzNDB9LHt4OiAxNSwgeTogMjY1LCBtYXg6IDM2NX0se3g6IDM1LCB5OiAyMjUsIG1heDogMzEzfV07XG5cdFx0dmFyIGNvb3JkQXJyTWQgPSBbe3g6IDIyLCB5OiA0MDEsIG1heDogNTA2fSx7eDogNzksIHk6IDM4NiwgbWF4OiA1MTB9LHt4OiAyMiwgeTogMzk3LCBtYXg6IDU0N30se3g6IDUyLCB5OiA0MTIsIG1heDogNTQzfV07XG5cdFx0dmFyIGNvb3JkQXJyTGcgPSBbe3g6IDMwLCB5OiA1MzUsIG1heDogNjc1fSx7eDogMTA1LCB5OiA1MTUsIG1heDogNjgwfSx7eDogMzAsIHk6IDUzMCwgbWF4OiA3MzB9LHt4OiA3MCwgeTogNTUwLCBtYXg6IDcyNX1dO1xuXHRcdGlmIChzaXplLndpZHRoID09PSA0MDApIHJldHVybiBjb29yZEFyclNtW251bS0xXTtcblx0XHRpZiAoc2l6ZS53aWR0aCA9PT0gNjAwKSByZXR1cm4gY29vcmRBcnJNZFtudW0tMV07XG5cdFx0aWYgKHNpemUud2lkdGggPT09IDgwMCkgcmV0dXJuIGNvb3JkQXJyTGdbbnVtLTFdO1xuXHR9XG5cdHJldHVybiB7XG5cdFx0ZHJhd0ltZzogZHJhd0ltZyxcblx0XHRkcmF3VGV4dDogZHJhd1RleHRcblx0fTtcbn0pOyIsImFwcC5mYWN0b3J5KFwiRG93bmxvYWRGYWN0b3J5XCIsIGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gZ2V0SW1nIChpbWdOdW0sIHRleHQpIHtcblx0XHR2YXIgcm91dGUgPSBgL2FwaS9kb3dubG9hZD9pbWdOdW09JHtpbWdOdW19JnRleHQ9JHt0ZXh0fWA7XG5cdFx0JGh0dHAuZ2V0KHJvdXRlKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdFx0cmV0dXJuIHJlc3BvbnNlLmRhdGE7XG5cdFx0fSk7XG5cdH1cblx0cmV0dXJuIHtcblx0XHRnZXRJbWc6IGdldEltZ1xuXHR9O1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
