"use_strict";

cs142App.controller("HeaderController", ["$scope", "$timeout", function($scope, $timeout) {

	$scope.header = {};
	$scope.header.firstname = "Umit";
	$scope.header.lastname = "Yoruk";
	$scope.header.dateObj = new Date();
	$scope.header.bgPath = "/modelData/banners/Banner-Sunset.jpg";
	$scope.header.color = "white";

	$scope.$watchGroup(["header.firstname", "header.lastname"], function() {
		$scope.header.fullname = $scope.header.firstname + " " + $scope.header.lastname;
	});

	$scope.$watch("header.dateObj", function() {
		$scope.header.dateStr = $scope.header.dateObj.toLocaleDateString();
		$scope.header.timeStr = $scope.header.dateObj.toLocaleTimeString();
	}, true);

	$scope.header.addHours = function (hours) {
		if ($scope.header.promise) {
			$timeout.cancel($scope.header.promise);
			$scope.header.promise = null;
			console.log("Time updates are cancelled");
		}
		var currentHours = $scope.header.dateObj.getHours();
		$scope.header.dateObj.setHours(currentHours + hours);
	};

	var updateBackground = function() {
		var hours = $scope.header.dateObj.getHours();
		if (hours >= 6 && hours < 9) { // Sunrise
			$scope.header.bgPath = "/modelData/banners/Banner-Sunrise.jpg";
			$scope.header.color = "white";
		}
		if (hours >= 9 && hours < 16) { // Midday
			$scope.header.bgPath = "/modelData/banners/Banner-Noon.jpg";
			$scope.header.color = "black";
		}
		if (hours >= 16 && hours < 19) { // Sunset
			$scope.header.bgPath = "/modelData/banners/Banner-Sunset.jpg";
			$scope.header.color = "white";
		}
		if (hours >= 19 || hours < 6) { // Night
			$scope.header.bgPath = "/modelData/banners/Banner-Night.jpg";
			$scope.header.color = "white";
		}
	};

	var updateTime = function() {
		$scope.header.dateObj = new Date();
		$scope.header.promise = $timeout(updateTime, 1000);
	};
	$timeout(updateTime, 0);

	$scope.$watch("header.dateObj.getHours()", function() {
		updateBackground();
	});

}]);


cs142App.directive("backImg", function () {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			attrs.$observe('backImg', function(value) {
				element.css({
					'background-image': 'url(' + value + ')',
					'background-size': 'cover'
				});
			});
		}
	};
});


