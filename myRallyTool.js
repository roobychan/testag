'use strict';
angular.module('myRallyTool', [])
	.controller('myRallyController', ['$scope','$http', function($scope, $http) {
		let us = $scope;
		us.userStory = {
			Name: '',
			Owner: '',
			ScheduleState: 'Backlog',
			c_CRM: '',
			c_Siebel: '',
			DisplayColor: '',
			tag: '',
			towner: ''
		};

		us.user = [];
		us.proty = [];
		us.tags = [];
		us.selected = {};

		$http.get('./owner.json').then((response) => {
			us.user = response.data;
			us.selected = us.user[0];
		});

		$http.get('./proty.json').then((response) => {
			us.proty = response.data;
		});

		$http.get('./tag.json').then((response) => {
			us.tags = response.data;
		});

		us.create = () => {
			alert(us.userStory.c_CRM + '/' + us.userStory.Owner);
		};

	}]);