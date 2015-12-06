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
	function drawImg (canvas) {
		var ctx = canvas.getContext("2d");
		var immij = document.getElementById('carson-image');
		ctx.drawImage(immij, 0, 0);
		immij.onload = function () {
			console.log("image loaded", immij, ctx);
			ctx.drawImage(immij, 0, 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1ha2VMaWUvbWFrZUxpZS5qcyIsIm1lbnUvbWVudS5qcyIsIm5hdmJhci9uYXZiYXIuanMiLCJDYW52YXNGYWN0b3J5LmpzIiwiZG93bmxvYWRGYWN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbndpbmRvdy5hcHAgPSBhbmd1bGFyLm1vZHVsZSgnQ2Fyc29uTGllcycsIFsndWkucm91dGVyJ10pO1xuXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG4gICAgLy8gVGhpcyB0dXJucyBvZmYgaGFzaGJhbmcgdXJscyAoLyNhYm91dCkgYW5kIGNoYW5nZXMgaXQgdG8gc29tZXRoaW5nIG5vcm1hbCAoL2Fib3V0KVxuICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcbiAgICAvLyBJZiB3ZSBnbyB0byBhIFVSTCB0aGF0IHVpLXJvdXRlciBkb2Vzbid0IGhhdmUgcmVnaXN0ZXJlZCwgZ28gdG8gdGhlIFwiL1wiIHVybC5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG59KTtcblxuLy8gVGhpcyBhcHAucnVuIGlzIGZvciBjb250cm9sbGluZyBhY2Nlc3MgdG8gc3BlY2lmaWMgc3RhdGVzLlxuYXBwLnJ1bihmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHN0YXRlKSB7XG4gICAgLy8gVGhlIGdpdmVuIHN0YXRlIHJlcXVpcmVzIGFuIGF1dGhlbnRpY2F0ZWQgdXNlci5cblxuICAgIC8vICRzdGF0ZUNoYW5nZVN0YXJ0IGlzIGFuIGV2ZW50IGZpcmVkXG4gICAgLy8gd2hlbmV2ZXIgdGhlIHByb2Nlc3Mgb2YgY2hhbmdpbmcgYSBzdGF0ZSBiZWdpbnMuXG4gICAgLy8gJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcykge1xuICAgIC8vIFx0Y29uc29sZS5sb2coXCJydW4gdG9zdGF0ZVwiLCB0b1N0YXRlKTtcblxuICAgIC8vIH0pO1xuXG59KTtcbiIsImFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoXCJtYWtlTGllXCIsIHtcbiAgICAgICAgdXJsOiAnL21ha2VMaWUvOmltZ051bScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc3RhdGVzL21ha2VMaWUvbWFrZUxpZS5odG1sJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgRG93bmxvYWRGYWN0b3J5LCBDYW52YXNGYWN0b3J5KSB7XG4gICAgICAgIFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aGUtY2FudmFzJyk7XG4gICAgICAgIFx0JHNjb3BlLmNhcnNvbk51bSA9ICRzdGF0ZVBhcmFtcy5pbWdOdW07XG4gICAgICAgICAgICAkc2NvcGUuaW1nU3JjID0gXCIvY2Fyc29uXCIgKyAkc3RhdGVQYXJhbXMuaW1nTnVtICsgXCItY2xlYXItY3JvcC5qcGdcIjtcbiAgICAgICAgXHRmdW5jdGlvbiBkcmF3Q2FudmFzSW1hZ2UgKGN2cykge1xuICAgICAgICBcdFx0Q2FudmFzRmFjdG9yeS5kcmF3SW1nKGN2cyk7XG4gICAgICAgIFx0fVxuICAgICAgICBcdCRzY29wZS5kcmF3Q2FudmFzVGV4dCA9IGZ1bmN0aW9uICh0eHQpIHtcbiAgICAgICAgXHRcdCRzY29wZS5kb3dubG9hZFJlYWR5ID0gZmFsc2U7XG4gICAgICAgIFx0XHRDYW52YXNGYWN0b3J5LmRyYXdUZXh0KGNhbnZhcywgdHh0LCAkc2NvcGUuY2Fyc29uTnVtKTtcbiAgICAgICAgXHR9O1xuICAgICAgICBcdGRyYXdDYW52YXNJbWFnZShjYW52YXMpO1xuICAgICAgICAgICAgJHNjb3BlLnByZXBhcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBcdCRzY29wZS5kYXRhVVJMID0gY2FudmFzLnRvQmxvYihmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICAgICAgXHRcdCRzY29wZS5kb3dubG9hZFJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIFx0XHRzYXZlQXMoYmxvYiwgXCJjYXJzb24tbGllcy5qcGdcIik7XG4gICAgICAgICAgICBcdH0pO1xuICAgICAgICAgICAgXHQvLyBEb3dubG9hZEZhY3RvcnkuZ2V0SW1nKGNhbnZhcykudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdC8vIFx0Y29uc29sZS5sb2coXCJkYXRhIHJlY2VpdmVkXCIsIGRhdGEpO1xuICAgICAgICAgICAgXHQvLyB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KTtcbn0pOyIsImFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoXCJtZW51XCIsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc3RhdGVzL21lbnUvbWVudS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICAkc2NvcGUubG9hZENhcnNvbiA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBpbWdOdW0gPSBldmVudC50YXJnZXQuaWQuc3Vic3RyaW5nKDYpO1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbyhcIm1ha2VMaWVcIiwge2ltZ051bTogaW1nTnVtfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSk7XG59KTsiLCJhcHAuZGlyZWN0aXZlKCduYXZiYXInLCBmdW5jdGlvbiAoJHN0YXRlKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgcXVvdGU6IFwiQFwiLFxuICAgICAgICAgICAgY2hvc2VuOiBcIkBcIlxuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2RpcmVjdGl2ZXMvbmF2YmFyL25hdmJhci5odG1sJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlKSB7XG4gICAgICAgICAgICBzY29wZS4kb24oXCIkc3RhdGVDaGFuZ2VTdGFydFwiLCBmdW5jdGlvbiAoZXZlbnQsIHRvU3RhdGUsIHRvUGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuY2hvc2VuID0gdG9TdGF0ZS5uYW1lICE9PSBcIm1lbnVcIiA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxufSk7XG4iLCJhcHAuZmFjdG9yeShcIkNhbnZhc0ZhY3RvcnlcIiwgZnVuY3Rpb24gKCkge1xuXHRmdW5jdGlvbiBkcmF3SW1nIChjYW52YXMpIHtcblx0XHR2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblx0XHR2YXIgaW1taWogPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2Fyc29uLWltYWdlJyk7XG5cdFx0Y3R4LmRyYXdJbWFnZShpbW1paiwgMCwgMCk7XG5cdFx0aW1taWoub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJpbWFnZSBsb2FkZWRcIiwgaW1taWosIGN0eCk7XG5cdFx0XHRjdHguZHJhd0ltYWdlKGltbWlqLCAwLCAwKTtcblx0XHR9O1xuXHRcdGltbWlqLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcImltYWdlIGVycm9yXCIpO1xuXHRcdH07XG5cdH1cblx0ZnVuY3Rpb24gZHJhd1RleHQoY2FudmFzLCB0ZXh0LCBudW0pIHtcblx0XHRkcmF3SW1nKGNhbnZhcyk7XG5cdFx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cdFx0dmFyIGNvb3JkcyA9IGdldENvb3JkcyhudW0pO1xuXHRcdGN0eC5mb250ID0gXCIzdncgJ0hlbHZldGljYScgc2Fucy1zZXJpZiBib2xkIGJsYWNrXCI7XG5cdFx0Y3R4LmZpbGxUZXh0KHRleHQsIGNvb3Jkcy54LCBjb29yZHMueSwgY29vcmRzLm1heCk7XG5cdH1cblx0ZnVuY3Rpb24gZ2V0Q29vcmRzKG51bSkge1xuXHRcdHZhciBjb29yZEFyciA9IFt7eDogMzAsIHk6IDUzNSwgbWF4OiA2NzV9LHt4OiAxMDUsIHk6IDUxNSwgbWF4OiA2ODB9LHt4OiAzMCwgeTogNTMwLCBtYXg6IDczMH0se3g6IDcwLCB5OiA1NTAsIG1heDogNzI1fV07XG5cdFx0cmV0dXJuIGNvb3JkQXJyW251bS0xXTtcblx0fVxuXHRyZXR1cm4ge1xuXHRcdGRyYXdJbWc6IGRyYXdJbWcsXG5cdFx0ZHJhd1RleHQ6IGRyYXdUZXh0XG5cdH07XG59KTsiLCJhcHAuZmFjdG9yeShcIkRvd25sb2FkRmFjdG9yeVwiLCBmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIGdldEltZyAoaW1nTnVtLCB0ZXh0KSB7XG5cdFx0dmFyIHJvdXRlID0gYC9hcGkvZG93bmxvYWQ/aW1nTnVtPSR7aW1nTnVtfSZ0ZXh0PSR7dGV4dH1gO1xuXHRcdCRodHRwLmdldChyb3V0ZSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcdHJldHVybiByZXNwb25zZS5kYXRhO1xuXHRcdH0pO1xuXHR9XG5cdHJldHVybiB7XG5cdFx0Z2V0SW1nOiBnZXRJbWdcblx0fTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
