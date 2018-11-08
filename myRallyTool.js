'use strict';
let myApp = angular.module('myRallyTool', []);

myApp.controller('myRallyController', ['$scope', '$http', function($scope, $http) {
	let us = $scope;
	us.userStory = {
		name: '',
		owner: {},
		scheduleState: 'Backlog',
		crm: '',
		siebel: '',
		displayColor: {},
		iteration: {},
		tag: {},
		owner2: {},
		towner: {},
		purename: '',
		utype: '',
		project: '',
		app: ''
	};

	us.user = [];
	us.proty = [];
	us.tags = [];
	us.itert = [];
	us.utype = ['Backend', 'Frontend', 'Both end'];
	us.selectedOwner = '';
	us.selectedOwner2 = '';
	us.selectedTag = '';
	us.selectedIter = '';
	us.selectedTowner = '';
	us.inputName = '';
	us.selectedColor = '';


	$http.get('./owner.json').then((response) => {
		us.user = response.data;
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

	this.convert = (selected, arr, obj) => {
		for (let x of arr) {
			if (x.ref == selected) {
				us.userStory[obj] = x;
			}
		}
	};

	this.dropdownConvert = () => {
		this.convert(us.selectedOwner, us.user, 'owner');
	};

	this.create = () => {
		this.convert(us.selectedOwner2, us.user, 'owner2');
		this.convert(us.selectedTowner, us.user, 'towner');
		this.convert(us.selectedIter, us.itert, 'iteration');
		this.convert(us.selectedTag, us.tags, 'tag');
		this.convert(us.selectedColor, us.proty, 'displayColor');
		if (us.utype != 'Both end') {
			us.userStory.owner2 = {
				name: ''
			}
		}

		us.userStory.name = us.inputName + '-' + us.userStory.crm;
		us.userStory.siebel = us.userStory.crm;
		us.userStory.project = us.userStory.owner.project;
		console.log(us.userStory);
		$http({
			method: 'POST',
			url: 'http://localhost:3000/userstory/create',
			data: JSON.stringify(us.userStory),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
		}).then((response) => {
			console.log(response);
			alert(`${response.data.usID} created`);
			us.userStory = {
				name: '',
				owner: {},
				scheduleState: 'Backlog',
				crm: '',
				siebel: '',
				displayColor: '',
				iteration: {},
				tag: {},
				owner2: {},
				towner: {},
				purename: '',
				utype: '',
				project: '',
				app: ''
			};
			us.selectedOwner = '';
			us.selectedOwner2 = '';
			us.selectedTag = '';
			us.selectedIter = '';
			us.selectedTowner = '';
			us.inputName = '';
			us.selectedColor = '';
			us.usId = response.data.usID;
		});
	};
}]);

myApp.filter('myFilter', () => {
	return (itert, proj) => {
		let newIt = [];
		// console.log(itert);
		for (var i of itert) {
			// console.log(proj);
			if (i.project == proj) {
				// console.log(i);
				newIt.push(i);
			}
		}
		return newIt;
	}
});
myApp.directive("limit", [function() {
	return {
		restrict: "A",
		link: function(scope, elem, attrs) {
			var limit = parseInt(attrs.limit);
			angular.element(elem).on("keypress", function(e) {
				if (this.value.length == limit) e.preventDefault();
			});
		}
	}
}]);