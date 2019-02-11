
var mongoose = require('mongoose');

// 分类的表结构
var schema = new mongoose.Schema({
	// 关联字段 - 分类的 Id
	category: {
		// 类型
		type: mongoose.Schema.Types.ObjectId,
		// 引用
		ref: 'Category'
	},
	// 标题
	title: String,
	// 关联字段 - 用户的 Id
	user: {
		// 类型
		type: mongoose.Schema.Types.ObjectId,
		// 引用
		ref: 'User'
	},
	// 简介
	desc: {
		type: String,
		default: ''
	},
	// 内容
	content: {
		type: String,
		default: ''
	},
	// 阅读数量
	views: {
		type: Number,
		default: 0
	},
	// 添加时间
	addTime: {
		type: Date,
		default: new Date()
	}
});

module.exports = schema;




