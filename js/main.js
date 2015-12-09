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
        controller: function ($scope, $state, CanvasFactory, randomCarson) {
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
		var fontStr = 'bold 3vw Helvetica';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1ha2VMaWUvbWFrZUxpZS5qcyIsIm1lbnUvbWVudS5qcyIsIm5hdmJhci9uYXZiYXIuanMiLCJDYW52YXNGYWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdDYXJzb25MaWVzJywgWyd1aS5yb3V0ZXInXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgICAvLyBUaGlzIHR1cm5zIG9mZiBoYXNoYmFuZyB1cmxzICgvI2Fib3V0KSBhbmQgY2hhbmdlcyBpdCB0byBzb21ldGhpbmcgbm9ybWFsICgvYWJvdXQpXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuICAgIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbn0pO1xuXG4vLyBUaGlzIGFwcC5ydW4gaXMgZm9yIGNvbnRyb2xsaW5nIGFjY2VzcyB0byBzcGVjaWZpYyBzdGF0ZXMuXG5hcHAucnVuKGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkc3RhdGUpIHtcbiAgICAvLyBUaGUgZ2l2ZW4gc3RhdGUgcmVxdWlyZXMgYW4gYXV0aGVudGljYXRlZCB1c2VyLlxuXG4gICAgLy8gJHN0YXRlQ2hhbmdlU3RhcnQgaXMgYW4gZXZlbnQgZmlyZWRcbiAgICAvLyB3aGVuZXZlciB0aGUgcHJvY2VzcyBvZiBjaGFuZ2luZyBhIHN0YXRlIGJlZ2lucy5cbiAgICAvLyAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zKSB7XG4gICAgLy8gXHRjb25zb2xlLmxvZyhcInJ1biB0b3N0YXRlXCIsIHRvU3RhdGUpO1xuXG4gICAgLy8gfSk7XG5cbn0pO1xuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZShcIm1ha2VMaWVcIiwge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdzdGF0ZXMvbWFrZUxpZS9tYWtlTGllLmh0bWwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICByYW5kb21DYXJzb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApICUgNyArIDE7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlLCAkc3RhdGUsIENhbnZhc0ZhY3RvcnksIHJhbmRvbUNhcnNvbikge1xuICAgICAgICBcdCRzY29wZS5yZWxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKFwibWFrZUxpZVwiLCB7fSwge3JlbG9hZDp0cnVlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdnBXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGhlLWNhbnZhcycpO1xuICAgICAgICAgICAgJHNjb3BlLmNhbnZhc1NpemUgPSB7d2lkdGg6IDEwNjcsIGhlaWdodDogNjAwfTtcbiAgICAgICAgICAgIGlmICh2cFdpZHRoIDwgNzY4KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNhbnZhc1NpemUud2lkdGggPSA1MzM7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNhbnZhc1NpemUuaGVpZ2h0PSAzMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh2cFdpZHRoID49IDc2OCAmJiB2cFdpZHRoIDwgOTkzKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNhbnZhc1NpemUud2lkdGggPSA3MDQ7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmNhbnZhc1NpemUuaGVpZ2h0PSA0MDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIndpZHRoLCBjYW52YXNTaXplXCIsIHZwV2lkdGgsICRzY29wZS5jYW52YXNTaXplKTtcbiAgICAgICAgXHQkc2NvcGUuY2Fyc29uTnVtID0gcmFuZG9tQ2Fyc29uO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYXJzb25OdW06XCIsICRzY29wZS5jYXJzb25OdW0pO1xuICAgICAgICAgICAgJHNjb3BlLmltZ1NyYyA9IFwiL2NhcnNvbi1cIiArICRzY29wZS5jYXJzb25OdW0gKyBcIi5qcGdcIjtcbiAgICAgICAgXHRmdW5jdGlvbiBkcmF3Q2FudmFzSW1hZ2UgKGN2cywgY2FudmFzU2l6ZSkge1xuICAgICAgICBcdFx0Q2FudmFzRmFjdG9yeS5kcmF3SW1nKGN2cywgY2FudmFzU2l6ZSk7XG4gICAgICAgIFx0fVxuICAgICAgICBcdCRzY29wZS5kcmF3Q2FudmFzVGV4dCA9IGZ1bmN0aW9uICh0eHQsIHNpemUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNhbnZhc3NpemVcIiwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSB0eHQudG9VcHBlckNhc2UoKTtcbiAgICAgICAgXHRcdENhbnZhc0ZhY3RvcnkuZHJhd1RleHQoY2FudmFzLCB0ZXh0LCBzaXplKTtcbiAgICAgICAgXHR9O1xuICAgICAgICBcdGRyYXdDYW52YXNJbWFnZShjYW52YXMsICRzY29wZS5jYW52YXNTaXplKTtcbiAgICAgICAgICAgICRzY29wZS5wcmVwYXJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgXHQkc2NvcGUuZGF0YVVSTCA9IGNhbnZhcy50b0Jsb2IoZnVuY3Rpb24gKGJsb2IpIHtcbiAgICAgICAgICAgIFx0XHQkc2NvcGUuZG93bmxvYWRSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICBcdFx0c2F2ZUFzKGJsb2IsIFwiY2Fyc29uLWxpZXMuanBnXCIpO1xuICAgICAgICAgICAgXHR9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KTtcbn0pOyIsImFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoXCJtZW51XCIsIHtcbiAgICAgICAgdXJsOiAnL21lbnUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3N0YXRlcy9tZW51L21lbnUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgkc2NvcGUsICRzdGF0ZSkge1xuICAgICAgICAgICAgJHNjb3BlLmxvYWRDYXJzb24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW1nTnVtID0gZXZlbnQudGFyZ2V0LmlkLnN1YnN0cmluZyg2KTtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oXCJtYWtlTGllXCIsIHtpbWdOdW06IGltZ051bX0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7IiwiYXBwLmRpcmVjdGl2ZSgnbmF2YmFyJywgZnVuY3Rpb24gKCRzdGF0ZSkge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIHF1b3RlOiBcIkBcIixcbiAgICAgICAgICAgIGNob3NlbjogXCJAXCJcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXJlY3RpdmVzL25hdmJhci9uYXZiYXIuaHRtbCcsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgICAgICAgc2NvcGUuJG9uKFwiJHN0YXRlQ2hhbmdlU3RhcnRcIiwgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcykge1xuICAgICAgICAgICAgICAgIHNjb3BlLmNob3NlbiA9IHRvU3RhdGUubmFtZSAhPT0gXCJtZW51XCIgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pO1xuIiwiYXBwLmZhY3RvcnkoXCJDYW52YXNGYWN0b3J5XCIsIGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gZHJhd0ltZyAoY2FudmFzLCBzaXplKSB7XG5cdFx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cdFx0dmFyIGltbWlqID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcnNvbi1pbWFnZScpO1xuXHRcdGN0eC5kcmF3SW1hZ2UoaW1taWosIDAsIDAsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcblx0XHRpbW1pai5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGN0eC5kcmF3SW1hZ2UoaW1taWosIDAsIDAsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcblx0XHR9O1xuXHRcdGltbWlqLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcImltYWdlIGVycm9yXCIpO1xuXHRcdH07XG5cdH1cblx0ZnVuY3Rpb24gZHJhd1RleHQoY2FudmFzLCB0ZXh0LCBzaXplKSB7XG5cdFx0ZHJhd0ltZyhjYW52YXMsIHNpemUpO1xuXHRcdHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXHRcdHZhciBjb29yZHMgPSBnZXRDb29yZHMoc2l6ZSk7XG5cdFx0dmFyIGZvbnRTdHIgPSAnYm9sZCAzdncgSGVsdmV0aWNhJztcblx0XHRjdHguZm9udCA9IGZvbnRTdHI7XG5cdFx0Y3R4LmZpbGxUZXh0KHRleHQsIGNvb3Jkcy54LCBjb29yZHMueSwgY29vcmRzLm1heCk7XG5cdH1cblx0ZnVuY3Rpb24gZ2V0Q29vcmRzKHNpemUpIHtcblx0XHR2YXIgY29vcmRTbSA9IHt4OiAyNiwgeTogMjYwLCBtYXg6IDQwN307XG5cdFx0dmFyIGNvb3JkTWQgPSB7eDogMzUsIHk6IDM1MCwgbWF4OiA1MzR9O1xuXHRcdHZhciBjb29yZExnID0ge3g6IDU3LCB5OiA1MjAsIG1heDogODIwfTtcblx0XHRpZiAoc2l6ZS5oZWlnaHQgPT09IDMwMCkgcmV0dXJuIGNvb3JkU207XG5cdFx0aWYgKHNpemUuaGVpZ2h0ID09PSA0MDApIHJldHVybiBjb29yZE1kO1xuXHRcdGlmIChzaXplLmhlaWdodCA9PT0gNjAwKSByZXR1cm4gY29vcmRMZztcblx0fVxuXHRyZXR1cm4ge1xuXHRcdGRyYXdJbWc6IGRyYXdJbWcsXG5cdFx0ZHJhd1RleHQ6IGRyYXdUZXh0XG5cdH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
