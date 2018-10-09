'use strict';
var rally = require('rally');

var restAPI = rally({
	apiKey: '_b0ZewDOZThOpwqO4hbOi278k1JpeAE0tueYqgmzxIeY'

});

// var queryUtils = rally.util.query;

var usList = [];

restAPI.query({
	type: 'hierarchicalrequirement',
	start: 400, //the 1-based start index, defaults to 1
	limit: 1,
	scope: {
		workspace: '/workspace/6582349404',
		project: '/project/193018525092'
	},
	fetch: ['FormattedID', 'Name', 'CRM', 'Owner', 'ScheduleState', 'Iteration', 'Tasks'], //the fields to retrieve
	// query: queryUtils.where('ScheduleState', '!=', 'Accepted') //optional filter
}).then(usGet);

console.log(usList);

function usGet(result) {
	for (var i = 0; i < result.Results.length; i++) {
		var us = {};
		var res = result.Results[i];
		us.tasks = [];
		us.ref = res._ref;
		us.usID = res.FormattedID;
		us.name = res.Name;
		us.crm = res.CRM;
		us.owner = res.Owner._refObjectName;
		us.status = res.ScheduleState;
		us.iter = res.Iteration.Name;
		usList.push(us);
		console.log(res.Tasks._ref);
		restAPI.query({
			type: 'task',
			ref: result.Results[i].Tasks._ref,
			start: 1, //the 1-based start index, defaults to 1
			limit: 99,
			scope: {
				workspace: '/workspace/6582349404',
				project: '/project/193018525092'
			},
			fetch: ['FormattedID', 'Name', 'Owner', 'State', 'Parent'], //the fields to retrieve
			// query: queryUtils.where('ScheduleState', '!=', 'Accepted') //optional filter
		}).then(taskGet);

		// .then(function(result) {
		// 	console.log(result);
		// 	result.forEach(function(entry) {
		// 		entry.usID = us.usID;
		// 		us.tasks.push(entry);
		// 	});
		// 	usList.push(us);
		// 	console.log(usList[0].tasks);
		// });
	}
	return result;
	function taskGet(result) {
			// console.log(result);
			// var tasks = [];
			for (var i = 0; i < result.Results.length; i++) {
				var r = result.Results[i];
				var task = {};
				task.ref = r._ref;
				task.taskID = r.FormattedID;
				task.name = r.Name;
				task.owner = r.Owner._refObjectName;
				task.status = r.State;
				task.usID = us.usID;
				us.tasks.push(task);
				// console.log(task);
				// tasks.push(task);
			}
			// console.log(us);
			// return tasks;
		}
}

