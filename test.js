var core = require("./core/core.js");
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'liujia',
  database        : 'test'
});

/*pool.getConnection(function(err, connection) {
  connection.query( 'select * from novel limit 10', function(err, rows) {
  	if(err) throw err;
  	console.log(rows);
    connection.release();// 释放链接
  });
});*/
var matrix = core.generateStrMatrix( (new Array(50).join("我") ) );
var flag = 0;
for(var i = 0; i < 260; i ++) {
  for(var j = 0; j < 256; j ++ ) {
    if(matrix[i][j] === 1) {
      flag ++;
      console.log(matrix[i][j]);
    }
  }
}
console.log(flag);
