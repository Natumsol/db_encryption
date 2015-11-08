var core = require("./core/core.js");
var mysql = require('mysql');
var events = require("events");
var emitter = new events.EventEmitter(); //事件发射器
var count = 0;
var k = 10;
var m = 3307; // m = k * n / ln2,且m为素数
var keyword;
var bignum = require('bignum');
process.stdin.setEncoding('utf8');
process.stdin.on('readable', function () {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    if (!keyword) {
      keyword = chunk.trim();
      emitter.emit("init");
    }
  }
});

var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test'
});


emitter.addListener("init", function () {
  pool.getConnection(function (err, connection) {
    var sql = "select text from novel_test where ";
    var V = (new Array(22)).join("0") + core.string_transfer(core.generateStrMatrix(keyword, false, false), m, k).join("");
    var result = [];
    for (var i = 0; i < V.length; i += 64) {
      var buf = new Buffer(8);
      for (var s = 0; s < 8; s++) {
        buf[s] = parseInt(V.substr(i, 64).substr(s * 8, 8), 2);
      }
      result.push(bignum.fromBuffer(buf));
    }
    for (var i = 0; i < result.length; i++) {
      sql = sql + "value" + (i + 1) + " & " + result[i] + " = " + result[i] + (i + 1 < result.length ? " and " : ";");
    }
    console.log(sql);
    // connection.query('select * from novel where id > ', function (err, rows) {
    //   for (var j = 0; j < rows.length; j++) {
    //     var sql = "update novel set ";
    //     for (var i = 0; i < result.length; i++) {
    //       sql = sql + "value" + (i + 1) + "=" + result[i] + (i + 1 < result.length ? "," : " ");
    //     }
    //     sql = sql + "where id=" + rows[j].id + ";";
    //     console.log(sql);
    //   }

    connection.release();// 释放链接
    process.exit();
  });
});


  