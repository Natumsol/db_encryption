var core = require("./core/core.js");
var mysql = require('mysql');
var count = 0;

process.stdin.setEncoding('utf8');
var events = require("events");
var emitter = new events.EventEmitter(); //事件发射器
var str1, str2;
process.stdin.on('readable', function () {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    if (!str1) str1 = chunk;
    else if (!str2) {
      str2 = chunk;
      emitter.emit("init");
    }
  }
});
emitter.addListener("init", function () {
  str1 = parseInt(str1);
  str2 = parseInt(str2);
  pool.getConnection(function (err, connection) {
    connection.query('select * from novel where id > ' + str1 + ' and id <= ' + str2, function (err, rows) {
      // if (err) throw err;
      // for(var i = 0; i < rows.length; i ++) {
      //   var matrix = core.generateStrMatrix(rows[i].text);
      //   calculate(matrix);
      // }
      // console.log("所有字符串矩阵1的个数：" + count);
      // console.log("1的平均个数" + count / rows.length);
      var k = 10;
      var m = 3307; // m = k * n / ln2,且m为素数
      for (var j = 0; j < rows.length; j++) {
        var V = (new Array(22)).join("0") + core.string_transfer(core.generateStrMatrix(rows[j].text), m, k).join("");
        var result = [];
        for (var i = 0; i < V.length; i += 64) {
          result.push(parseInt(V.substr(i, 64), 2));
        }
        var sql = "update novel set ";
        for (var i = 0; i < result.length; i++) {
          sql = sql + "value" + (i + 1) + "=" + result[i] + (i + 1 < result.length ? "," : " ");
        }
        sql = sql + "where id=" + rows[j].id + ";";
        console.log(sql);
      }

      connection.release();// 释放链接
      process.exit();
    });
  });
})
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


  