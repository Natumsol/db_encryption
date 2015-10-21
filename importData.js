var mysql      = require('mysql');
var fs 		   = require("fs");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'liujia',
  database : 'test'
});

connection.connect();
 
connection.query('select * from student', function(err, rows, fields) {
  if (err) throw err;
 
  console.log(rows);
});
 
fs.readFile("data.txt", "utf-8", function(err, data){
	if (err) throw err;
	var result = [];
	data = data.replace(/\s{2,}/,"");
	console.log(data.length);
	for(var i= 0 ; i < data.length; i += 50) {
		result[i] = data.substr(i, 50);
	}
	console.log(result);
})
connection.end();