var mysql = require('mysql');
var fs = require("fs");
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'liujia',
	database: 'test'
});
/*
connection.connect();
 
connection.query('select * from student', function(err, rows, fields) {
  if (err) throw err;
 
  console.log(rows);
});*/

fs.readFile("temp3.txt", "utf-8", function(err, data) {
	if (err) throw err;
	var result = "insert into novel(text) values";
	console.log(data.length);
	for(var i = 0; i < data.length; i += 50) {
		result = result + "\n('" + data.substr(i, 50) + "')" + (i + 50 < data.length ? "," : ";");
	}
	fs.writeFile('mysql2.sql', result, function(err) {
		if (err) throw err;
		console.log('It\'s saved!'); //文件被保存
	});
})

/*connection.end();*/