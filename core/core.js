var SHA1 = require("crypto-js/sha1");
var _ = require("underscore");
var k = 10;
var n = 228;
var m = 3307; // m = k * n / ln2,且m为素数
/**
 * @description 哈希函数工厂
 * @param  {string} str
 * @param  {number} d
 * @return {number}
 */
function hash(str, d) {
	if (d > k - 1) return console.log("哈希函数参数错误!");

	var hashStr = (parseInt("0x" + SHA1(str)).toString(2)).substr(d * 160 / k, 160 / k);
	return parseInt(hashStr, 2);
}
/**
 * @description 取得字符的unicode码
 * @param  {string} str
 * @return {number}
 */
function getUnicode(str) {
	return str.charCodeAt(0)
}

/**
 * @description 讲中文的uincode转换为两个ascii码
 * @param  {string} str
 * @return {array} paris
 */
function convertChineseUnicode(str) {
	str = str[0];
	var unicode = getUnicode(str).toString(16);
	var pairs = [];
	pairs.push(parseInt(unicode.substr(0, 2), 16));
	pairs.push(parseInt(unicode.substr(2, 2), 16));
	return pairs;
}

/**
 * @description 返回字符串的信息矩阵
 * @param  {string} str
 * @return {object}
 */
function generateStrMatrix(str) {

	var matrix = new Array(260);
	var strUnicodeParis = [];
	for (var i = 0; i < 260; i++) {
		matrix[i] = new Array(256);
		for (var j = 0; j < 256; j++) {
			matrix[i][j] = 0;
		}
	}// 初始化信息矩阵

	for (var i = 0; i < str.length; i++) {
		strUnicodeParis.push(convertChineseUnicode([str[i]]));
	}
	for (var i = 0; i < strUnicodeParis.length - 1; i++) {
		var a1 = strUnicodeParis[i][0];
		var a2 = strUnicodeParis[i][1];
		var b1 = strUnicodeParis[i + 1][0];
		var b2 = strUnicodeParis[i + 1][1];

			matrix[a1][a2] = 1;
			matrix[a1][b1] = 1;
			matrix[a1][b2] = 1;
		try {
			matrix[a2][b1] = 1;
		} catch (e) {
			console.log(str);
			throw e;
		}
			matrix[a2][b2] = 1;
			matrix[b1][b2] = 1;

	} // 填入邻接关系
	matrix[256][strUnicodeParis[0][0]] = 1; // 头字节信息
	matrix[257][strUnicodeParis[strUnicodeParis.length - 1][1]] = 1; // 尾字节信息
	matrix[258][strUnicodeParis[0][1]] = 1; // 第二个字节信息
	matrix[259][strUnicodeParis[strUnicodeParis.length - 1][0]] = 1; // 倒数第二个字节信息

	return matrix;

}

function string_transfer(matrix, m, k){
	
} 

exports.convertChineseUnicode = convertChineseUnicode;
exports.getUnicode = getUnicode;
exports.generateStrMatrix = generateStrMatrix;