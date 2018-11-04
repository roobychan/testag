'use strict';
angular.module('myRallyTool', [])
	.controller('myRallyController', ['$scope','$http', function($scope, $http) {
		let us = $scope;
		us.userStory = {
			uStory: {
				Name: '',
				Owner: {},
				ScheduleState: 'Backlog',
				c_CRM: '',
				c_Siebel: '',
				DisplayColor: '',
				Iteration: {},
				tag: {}
			},
			other:{
				towner: {},
				pureName: '',
				utype: '',
				app: ''
			}
		};

		us.user = [];
		us.proty = [];
		us.tags = [];
		us.itert = [];
		us.utype = ['Backend', 'Frontend', 'Both end'];
		us.selected = {};
		us.res = '';

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

		$http.get('./itert.json').then((response) => {
			us.itert = response.data;
		});

		this.create = () => {
			us.userStory.uStory.Name = us.userStory.other.pureName + '-' + us.userStory.uStory.c_CRM;
			alert(JSON.stringify(us.userStory.uStory.Name));
			// $http.post('http://127.0.0.1:3000/userstory/create',JSON.stringify(us.userStory),{
   //              headers : {
   //                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
   //              }
   //          }).then((response) => {
				
			// });
			$http({
				method: 'POST',
				url: 'http://127.0.0.1:3000/userstory/create',
				data: JSON.stringify(us.userStory),
				headers:{'Content-Type': 'application/x-www-form-urlencoded'},
			}).then((response) =>{

			});
		};

	}]);