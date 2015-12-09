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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1ha2VMaWUvbWFrZUxpZS5qcyIsIm1lbnUvbWVudS5qcyIsIm5hdmJhci9uYXZiYXIuanMiLCJDYW52YXNGYWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbndpbmRvdy5hcHAgPSBhbmd1bGFyLm1vZHVsZSgnQ2Fyc29uTGllcycsIFsndWkucm91dGVyJ10pO1xuXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG4gICAgLy8gVGhpcyB0dXJucyBvZmYgaGFzaGJhbmcgdXJscyAoLyNhYm91dCkgYW5kIGNoYW5nZXMgaXQgdG8gc29tZXRoaW5nIG5vcm1hbCAoL2Fib3V0KVxuICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcbiAgICAvLyBJZiB3ZSBnbyB0byBhIFVSTCB0aGF0IHVpLXJvdXRlciBkb2Vzbid0IGhhdmUgcmVnaXN0ZXJlZCwgZ28gdG8gdGhlIFwiL1wiIHVybC5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59KTtcblxuLy8gVGhpcyBhcHAucnVuIGlzIGZvciBjb250cm9sbGluZyBhY2Nlc3MgdG8gc3BlY2lmaWMgc3RhdGVzLlxuYXBwLnJ1bihmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHN0YXRlKSB7XG4gICAgLy8gVGhlIGdpdmVuIHN0YXRlIHJlcXVpcmVzIGFuIGF1dGhlbnRpY2F0ZWQgdXNlci5cblxuICAgIC8vICRzdGF0ZUNoYW5nZVN0YXJ0IGlzIGFuIGV2ZW50IGZpcmVkXG4gICAgLy8gd2hlbmV2ZXIgdGhlIHByb2Nlc3Mgb2YgY2hhbmdpbmcgYSBzdGF0ZSBiZWdpbnMuXG4gICAgLy8gJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcykge1xuICAgIC8vIFx0Y29uc29sZS5sb2coXCJydW4gdG9zdGF0ZVwiLCB0b1N0YXRlKTtcblxuICAgIC8vIH0pO1xuXG59KTtcbiIsImFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoXCJtYWtlTGllXCIsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc3RhdGVzL21ha2VMaWUvbWFrZUxpZS5odG1sJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgcmFuZG9tQ2Fyc29uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKSAlIDcgKyAxOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlLCBDYW52YXNGYWN0b3J5LCByYW5kb21DYXJzb24pIHtcbiAgICAgICAgXHQkc2NvcGUucmVsb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhcIm1ha2VMaWVcIiwge30sIHtyZWxvYWQ6dHJ1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHZwV2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RoZS1jYW52YXMnKTtcbiAgICAgICAgICAgICRzY29wZS5jYW52YXNTaXplID0ge3dpZHRoOiAxMDY3LCBoZWlnaHQ6IDYwMH07XG4gICAgICAgICAgICBpZiAodnBXaWR0aCA8IDc2OCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5jYW52YXNTaXplLndpZHRoID0gNTMzO1xuICAgICAgICAgICAgICAgICRzY29wZS5jYW52YXNTaXplLmhlaWdodD0gMzAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodnBXaWR0aCA+PSA3NjggJiYgdnBXaWR0aCA8IDk5Mykge1xuICAgICAgICAgICAgICAgICRzY29wZS5jYW52YXNTaXplLndpZHRoID0gNzA0O1xuICAgICAgICAgICAgICAgICRzY29wZS5jYW52YXNTaXplLmhlaWdodD0gNDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3aWR0aCwgY2FudmFzU2l6ZVwiLCB2cFdpZHRoLCAkc2NvcGUuY2FudmFzU2l6ZSk7XG4gICAgICAgIFx0JHNjb3BlLmNhcnNvbk51bSA9IHJhbmRvbUNhcnNvbjtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2Fyc29uTnVtOlwiLCAkc2NvcGUuY2Fyc29uTnVtKTtcbiAgICAgICAgICAgICRzY29wZS5pbWdTcmMgPSBcIi9jYXJzb24tXCIgKyAkc2NvcGUuY2Fyc29uTnVtICsgXCIuanBnXCI7XG4gICAgICAgIFx0ZnVuY3Rpb24gZHJhd0NhbnZhc0ltYWdlIChjdnMsIGNhbnZhc1NpemUpIHtcbiAgICAgICAgXHRcdENhbnZhc0ZhY3RvcnkuZHJhd0ltZyhjdnMsIGNhbnZhc1NpemUpO1xuICAgICAgICBcdH1cbiAgICAgICAgXHQkc2NvcGUuZHJhd0NhbnZhc1RleHQgPSBmdW5jdGlvbiAodHh0LCBzaXplKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYW52YXNzaXplXCIsIHNpemUpO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gdHh0LnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIFx0XHRDYW52YXNGYWN0b3J5LmRyYXdUZXh0KGNhbnZhcywgdGV4dCwgc2l6ZSk7XG4gICAgICAgIFx0fTtcbiAgICAgICAgXHRkcmF3Q2FudmFzSW1hZ2UoY2FudmFzLCAkc2NvcGUuY2FudmFzU2l6ZSk7XG4gICAgICAgICAgICAkc2NvcGUucHJlcGFyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFx0JHNjb3BlLmRhdGFVUkwgPSBjYW52YXMudG9CbG9iKGZ1bmN0aW9uIChibG9iKSB7XG4gICAgICAgICAgICBcdFx0JHNjb3BlLmRvd25sb2FkUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgXHRcdHNhdmVBcyhibG9iLCBcImNhcnNvbi1saWVzLmpwZ1wiKTtcbiAgICAgICAgICAgIFx0fSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSk7XG59KTsiLCJhcHAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKFwibWVudVwiLCB7XG4gICAgICAgIHVybDogJy9tZW51JyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdzdGF0ZXMvbWVudS9tZW51Lmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgICRzY29wZS5sb2FkQ2Fyc29uID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGltZ051bSA9IGV2ZW50LnRhcmdldC5pZC5zdWJzdHJpbmcoNik7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKFwibWFrZUxpZVwiLCB7aW1nTnVtOiBpbWdOdW19KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KTtcbn0pOyIsImFwcC5kaXJlY3RpdmUoJ25hdmJhcicsIGZ1bmN0aW9uICgkc3RhdGUpIHtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICBxdW90ZTogXCJAXCIsXG4gICAgICAgICAgICBjaG9zZW46IFwiQFwiXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnZGlyZWN0aXZlcy9uYXZiYXIvbmF2YmFyLmh0bWwnLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgICAgICAgIHNjb3BlLiRvbihcIiRzdGF0ZUNoYW5nZVN0YXJ0XCIsIGZ1bmN0aW9uIChldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5jaG9zZW4gPSB0b1N0YXRlLm5hbWUgIT09IFwibWVudVwiID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KTtcbiIsImFwcC5mYWN0b3J5KFwiQ2FudmFzRmFjdG9yeVwiLCBmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIGRyYXdJbWcgKGNhbnZhcywgc2l6ZSkge1xuXHRcdHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXHRcdHZhciBpbW1paiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJzb24taW1hZ2UnKTtcblx0XHRjdHguZHJhd0ltYWdlKGltbWlqLCAwLCAwLCBzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XG5cdFx0aW1taWoub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRjdHguZHJhd0ltYWdlKGltbWlqLCAwLCAwLCBzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XG5cdFx0fTtcblx0XHRpbW1pai5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJpbWFnZSBlcnJvclwiKTtcblx0XHR9O1xuXHR9XG5cdGZ1bmN0aW9uIGRyYXdUZXh0KGNhbnZhcywgdGV4dCwgc2l6ZSkge1xuXHRcdGRyYXdJbWcoY2FudmFzLCBzaXplKTtcblx0XHR2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblx0XHR2YXIgY29vcmRzID0gZ2V0Q29vcmRzKHNpemUpO1xuXHRcdGN0eC5mb250ID0gXCIzdncgJ0hlbHZldGljYScgc2Fucy1zZXJpZiBib2xkIGJsYWNrXCI7XG5cdFx0Y3R4LmZpbGxUZXh0KHRleHQsIGNvb3Jkcy54LCBjb29yZHMueSwgY29vcmRzLm1heCk7XG5cdH1cblx0ZnVuY3Rpb24gZ2V0Q29vcmRzKHNpemUpIHtcblx0XHR2YXIgY29vcmRTbSA9IHt4OiAyNiwgeTogMjY3LCBtYXg6IDQwN307XG5cdFx0dmFyIGNvb3JkTWQgPSB7eDogMzUsIHk6IDM1MywgbWF4OiA1MzR9O1xuXHRcdHZhciBjb29yZExnID0ge3g6IDUzLCB5OiA1MzUsIG1heDogODI1fTtcblx0XHRpZiAoc2l6ZS5oZWlnaHQgPT09IDMwMCkgcmV0dXJuIGNvb3JkU207XG5cdFx0aWYgKHNpemUuaGVpZ2h0ID09PSA0MDApIHJldHVybiBjb29yZE1kO1xuXHRcdGlmIChzaXplLmhlaWdodCA9PT0gNjAwKSByZXR1cm4gY29vcmRMZztcblx0fVxuXHRyZXR1cm4ge1xuXHRcdGRyYXdJbWc6IGRyYXdJbWcsXG5cdFx0ZHJhd1RleHQ6IGRyYXdUZXh0XG5cdH07XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
