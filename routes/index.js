var express = require('express');
var router = express.Router();
var core = require("../core/core.js");
var mysql = require('mysql');
var bignum = require('bignum');
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
var count = 0;
var k = 10;
var m = 3307; // m = k * n / ln2,且m为素数
var keyword;
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'liujia',
  database: 'test'
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '数据库加密实验' });
});

router.post('/search1', function (req, res, next) {
  var keyword = req.body.keyword.trim();
  var isHead = false, isTail = false;
  if (/^%.*[^%]$/.test(keyword)) isTail = true;
  if ((/^[^%].*%$/.test(keyword))) isHead = true;
  keyword = keyword.replace(/%/g, "");
  pool.getConnection(function (err, connection) {
    var sql = "select crypt_text,text from novel where ";
    var V = (new Array(22)).join("0") + core.string_transfer(core.generateStrMatrix(keyword, isHead, isTail), m, k).join("");
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
    var start = (new Date()).getTime();
    connection.query(sql, function (err, rows) {
      var end = (new Date()).getTime();
      var time = end - start;
      res.json({ list: rows, time: time });
    });

    connection.release();// 释放链接
  });
});

router.post('/search2', function (req, res, next) {
  var keyword = req.body.keyword.trim();

  pool.getConnection(function (err, connection) {
    var sql = "select crypt_text,text from novel where text like " + keyword;
    var start = (new Date()).getTime();
    connection.query(sql, function (err, rows) {
      var end = (new Date()).getTime();
      var time = end - start;
      res.json({ list: rows, time: time });
    });
    connection.release();// 释放链接
  });
});
module.exports = router;
