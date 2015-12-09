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
app.config(function ($stateProvider) {
    $stateProvider.state("menu", {
        url: '/menu',
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
app.factory("DownloadFactory", function () {
	// function getImg (imgNum, text) {
	// 	var route = `/api/download?imgNum=${imgNum}&text=${text}`;
	// 	$http.get(route).then(function (response) {
	// 		return response.data;
	// 	});
	// }
	// return {
	// 	getImg: getImg
	// };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1ha2VMaWUvbWFrZUxpZS5qcyIsIm1lbnUvbWVudS5qcyIsIm5hdmJhci9uYXZiYXIuanMiLCJDYW52YXNGYWN0b3J5LmpzIiwiZG93bmxvYWRGYWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdDYXJzb25MaWVzJywgWyd1aS5yb3V0ZXInXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgICAvLyBUaGlzIHR1cm5zIG9mZiBoYXNoYmFuZyB1cmxzICgvI2Fib3V0KSBhbmQgY2hhbmdlcyBpdCB0byBzb21ldGhpbmcgbm9ybWFsICgvYWJvdXQpXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuICAgIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn0pO1xuXG4vLyBUaGlzIGFwcC5ydW4gaXMgZm9yIGNvbnRyb2xsaW5nIGFjY2VzcyB0byBzcGVjaWZpYyBzdGF0ZXMuXG5hcHAucnVuKGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkc3RhdGUpIHtcbiAgICAvLyBUaGUgZ2l2ZW4gc3RhdGUgcmVxdWlyZXMgYW4gYXV0aGVudGljYXRlZCB1c2VyLlxuXG4gICAgLy8gJHN0YXRlQ2hhbmdlU3RhcnQgaXMgYW4gZXZlbnQgZmlyZWRcbiAgICAvLyB3aGVuZXZlciB0aGUgcHJvY2VzcyBvZiBjaGFuZ2luZyBhIHN0YXRlIGJlZ2lucy5cbiAgICAvLyAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zKSB7XG4gICAgLy8gXHRjb25zb2xlLmxvZyhcInJ1biB0b3N0YXRlXCIsIHRvU3RhdGUpO1xuXG4gICAgLy8gfSk7XG5cbn0pO1xuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZShcIm1ha2VMaWVcIiwge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdzdGF0ZXMvbWFrZUxpZS9tYWtlTGllLmh0bWwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICByYW5kb21DYXJzb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApICUgNyArIDE7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlLCAkc3RhdGUsIERvd25sb2FkRmFjdG9yeSwgQ2FudmFzRmFjdG9yeSwgcmFuZG9tQ2Fyc29uKSB7XG4gICAgICAgIFx0JHNjb3BlLnJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oXCJtYWtlTGllXCIsIHt9LCB7cmVsb2FkOnRydWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB2cFdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aGUtY2FudmFzJyk7XG4gICAgICAgICAgICAkc2NvcGUuY2FudmFzU2l6ZSA9IHt3aWR0aDogMTA2NywgaGVpZ2h0OiA2MDB9O1xuICAgICAgICAgICAgaWYgKHZwV2lkdGggPCA3NjgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2FudmFzU2l6ZS53aWR0aCA9IDUzMztcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2FudmFzU2l6ZS5oZWlnaHQ9IDMwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHZwV2lkdGggPj0gNzY4ICYmIHZwV2lkdGggPCA5OTMpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2FudmFzU2l6ZS53aWR0aCA9IDcwNDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2FudmFzU2l6ZS5oZWlnaHQ9IDQwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid2lkdGgsIGNhbnZhc1NpemVcIiwgdnBXaWR0aCwgJHNjb3BlLmNhbnZhc1NpemUpO1xuICAgICAgICBcdCRzY29wZS5jYXJzb25OdW0gPSByYW5kb21DYXJzb247XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhcnNvbk51bTpcIiwgJHNjb3BlLmNhcnNvbk51bSk7XG4gICAgICAgICAgICAkc2NvcGUuaW1nU3JjID0gXCIvY2Fyc29uLVwiICsgJHNjb3BlLmNhcnNvbk51bSArIFwiLmpwZ1wiO1xuICAgICAgICBcdGZ1bmN0aW9uIGRyYXdDYW52YXNJbWFnZSAoY3ZzLCBjYW52YXNTaXplKSB7XG4gICAgICAgIFx0XHRDYW52YXNGYWN0b3J5LmRyYXdJbWcoY3ZzLCBjYW52YXNTaXplKTtcbiAgICAgICAgXHR9XG4gICAgICAgIFx0JHNjb3BlLmRyYXdDYW52YXNUZXh0ID0gZnVuY3Rpb24gKHR4dCwgc2l6ZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FudmFzc2l6ZVwiLCBzaXplKTtcbiAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IHR4dC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBcdFx0Q2FudmFzRmFjdG9yeS5kcmF3VGV4dChjYW52YXMsIHRleHQsIHNpemUpO1xuICAgICAgICBcdH07XG4gICAgICAgIFx0ZHJhd0NhbnZhc0ltYWdlKGNhbnZhcywgJHNjb3BlLmNhbnZhc1NpemUpO1xuICAgICAgICAgICAgJHNjb3BlLnByZXBhcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBcdCRzY29wZS5kYXRhVVJMID0gY2FudmFzLnRvQmxvYihmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICAgICAgXHRcdCRzY29wZS5kb3dubG9hZFJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIFx0XHRzYXZlQXMoYmxvYiwgXCJjYXJzb24tbGllcy5qcGdcIik7XG4gICAgICAgICAgICBcdH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7IiwiYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZShcIm1lbnVcIiwge1xuICAgICAgICB1cmw6ICcvbWVudScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc3RhdGVzL21lbnUvbWVudS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAkc2NvcGUubG9hZENhcnNvbiA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBpbWdOdW0gPSBldmVudC50YXJnZXQuaWQuc3Vic3RyaW5nKDYpO1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhcIm1ha2VMaWVcIiwge2ltZ051bTogaW1nTnVtfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSk7XG59KTsiLCJhcHAuZGlyZWN0aXZlKCduYXZiYXInLCBmdW5jdGlvbiAoJHN0YXRlKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgcXVvdGU6IFwiQFwiLFxuICAgICAgICAgICAgY2hvc2VuOiBcIkBcIlxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2RpcmVjdGl2ZXMvbmF2YmFyL25hdmJhci5odG1sJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgICAgICBzY29wZS4kb24oXCIkc3RhdGVDaGFuZ2VTdGFydFwiLCBmdW5jdGlvbiAoZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuY2hvc2VuID0gdG9TdGF0ZS5uYW1lICE9PSBcIm1lbnVcIiA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxufSk7XG4iLCJhcHAuZmFjdG9yeShcIkNhbnZhc0ZhY3RvcnlcIiwgZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBkcmF3SW1nIChjYW52YXMsIHNpemUpIHtcblx0XHR2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblx0XHR2YXIgaW1taWogPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2Fyc29uLWltYWdlJyk7XG5cdFx0Y3R4LmRyYXdJbWFnZShpbW1paiwgMCwgMCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuXHRcdGltbWlqLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Y3R4LmRyYXdJbWFnZShpbW1paiwgMCwgMCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuXHRcdH07XG5cdFx0aW1taWoub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiaW1hZ2UgZXJyb3JcIik7XG5cdFx0fTtcblx0fVxuXHRmdW5jdGlvbiBkcmF3VGV4dChjYW52YXMsIHRleHQsIHNpemUpIHtcblx0XHRkcmF3SW1nKGNhbnZhcywgc2l6ZSk7XG5cdFx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cdFx0dmFyIGNvb3JkcyA9IGdldENvb3JkcyhzaXplKTtcblx0XHRjdHguZm9udCA9IFwiM3Z3ICdIZWx2ZXRpY2EnIHNhbnMtc2VyaWYgYm9sZCBibGFja1wiO1xuXHRcdGN0eC5maWxsVGV4dCh0ZXh0LCBjb29yZHMueCwgY29vcmRzLnksIGNvb3Jkcy5tYXgpO1xuXHR9XG5cdGZ1bmN0aW9uIGdldENvb3JkcyhzaXplKSB7XG5cdFx0dmFyIGNvb3JkU20gPSB7eDogMjYsIHk6IDI2NywgbWF4OiA0MDd9O1xuXHRcdHZhciBjb29yZE1kID0ge3g6IDM1LCB5OiAzNTMsIG1heDogNTM0fTtcblx0XHR2YXIgY29vcmRMZyA9IHt4OiA1MywgeTogNTM1LCBtYXg6IDgyNX07XG5cdFx0aWYgKHNpemUuaGVpZ2h0ID09PSAzMDApIHJldHVybiBjb29yZFNtO1xuXHRcdGlmIChzaXplLmhlaWdodCA9PT0gNDAwKSByZXR1cm4gY29vcmRNZDtcblx0XHRpZiAoc2l6ZS5oZWlnaHQgPT09IDYwMCkgcmV0dXJuIGNvb3JkTGc7XG5cdH1cblx0cmV0dXJuIHtcblx0XHRkcmF3SW1nOiBkcmF3SW1nLFxuXHRcdGRyYXdUZXh0OiBkcmF3VGV4dFxuXHR9O1xufSk7IiwiYXBwLmZhY3RvcnkoXCJEb3dubG9hZEZhY3RvcnlcIiwgZnVuY3Rpb24gKCkge1xuXHQvLyBmdW5jdGlvbiBnZXRJbWcgKGltZ051bSwgdGV4dCkge1xuXHQvLyBcdHZhciByb3V0ZSA9IGAvYXBpL2Rvd25sb2FkP2ltZ051bT0ke2ltZ051bX0mdGV4dD0ke3RleHR9YDtcblx0Ly8gXHQkaHR0cC5nZXQocm91dGUpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdC8vIFx0XHRyZXR1cm4gcmVzcG9uc2UuZGF0YTtcblx0Ly8gXHR9KTtcblx0Ly8gfVxuXHQvLyByZXR1cm4ge1xuXHQvLyBcdGdldEltZzogZ2V0SW1nXG5cdC8vIH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
