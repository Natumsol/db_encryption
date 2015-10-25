var core = require("./core/core.js");
var mysql = require('mysql');
var count = 0;
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'liujia',
  database: 'test'
});

function calculate(matrix) {
  for (var i = 0; i < 260; i++) {
    for (var j = 0; j < 256; j++) {
      if (matrix[i][j] === 1) {
        count++;
      }
    }
  }
}

pool.getConnection(function (err, connection) {
  connection.query('select * from novel ', function (err, rows) {
    // if (err) throw err;
    // for(var i = 0; i < rows.length; i ++) {
    //   var matrix = core.generateStrMatrix(rows[i].text);
    //   calculate(matrix);
    // }
    // console.log("所有字符串矩阵1的个数：" + count);
    // console.log("1的平均个数" + count / rows.length);
    var k = 10;
    var m = 3307; // m = k * n / ln2,且m为素数
    var V = core.string_transfer(core.generateStrMatrix(rows[0].text), m, k);
    console.log(parseInt(V.join(""),10));
    connection.release();// 释放链接
  });
});
  