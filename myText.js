'use strict';

// let myTextApp = angular.module('myText', []);

myApp.controller('myTextController', ['$scope', '$http', function($scope, $http) {
	$scope.usID = '';
	$scope.result = '';

	this.create = () => {
		$http({
			method: 'POST',
			url: 'http://localhost:3000/text/create',
			data: JSON.stringify({usID: $scope.usID}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
		}).then((response) => {
			console.log(response);
			$scope.result = response.data.ctext;
		});
	};
}]);