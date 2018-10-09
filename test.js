'use strict';
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./myRally.db', (err) => {
	if (err) {
		return console.error(err.message);
	}
});

db.serialize(() => {
	db.each(`select * from owner`, (err, row) => {
		console.log(row.NAME + '\t' + row.EMAIL);
	});
});

db.close();