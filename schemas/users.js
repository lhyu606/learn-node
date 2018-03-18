
var mongoose = require('mongoose');

// 用户的表结构
var schema = new mongoose.Schema({
	// 用户名
	username: String,
	// 密码
	password: String
});

module.exports = schema;




