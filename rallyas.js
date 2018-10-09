'use strict';
var rally = require('rally');
var async = require('async');

var restAPI = rally({
	apiKey: '_b0ZewDOZThOpwqO4hbOi278k1JpeAE0tueYqgmzxIeY'

});

// var queryUtils = rally.util.query;

var usList = {};

restAPI.query({
	type: 'hierarchicalrequirement',
	start: 400, //the 1-based start index, defaults to 1
	limit: Infinity,
	scope: {
		workspace: '/workspace/6582349404',
		project: '/project/193018525092'
	},
	fetch: ['FormattedID', 'Name', 'CRM', 'Owner', 'ScheduleState', 'Iteration', 'Tasks'], //the fields to retrieve
	// query: queryUtils.where('ScheduleState', '!=', 'Accepted') //optional filter
}).then(usGet);

function usGet(result) {
	result.Results.forEach(function(element) {
		var us = {};
		var res = element;
		us.ref = res._ref;
		us.usID = res.FormattedID;
		us.name = res.Name;
		us.crm = res.CRM;
		us.owner = res.Owner._refObjectName;
		us.status = res.ScheduleState;
		us.iter = res.Iteration.Name;
		us.tasks = [];
		usList[us.usID] = us;
	});
	async.mapValues(usList, readTask, taskGet);
}

function taskGet(error, result) {
	// console.log(result['US1053650'].Owner);
	var item = null;
	for (var key in result) {
		item = result[key];
		// item.Results.forEach(function(r) {
		for (var r of item.Results){
			var task = {};
			task.ref = r._ref;
			task.taskID = r.FormattedID;
			task.name = r.Name;
			task.owner = r.Owner._refObjectName;
			task.status = r.State;
			task.usID = key;
			usList[key].tasks.push(task);
		}
	}
	// console.log(usList);
}

function readTask(us, key, callback) {
	restAPI.query({
		type: 'task',
		ref: us.ref + '/Tasks',
		start: 1, //the 1-based start index, defaults to 1
		limit: 99,
		scope: {
			workspace: '/workspace/6582349404',
			project: '/project/193018525092'
		},
		fetch: ['FormattedID', 'Name', 'Owner', 'State', 'Parent'], //the fields to retrieve
		// query: queryUtils.where('ScheduleState', '!=', 'Accepted') //optional filter
	}, callback);
}