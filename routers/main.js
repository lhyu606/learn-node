
var express = require('express');
var router = express.Router();

// var User = require('../models/User');
var Category = require('../models/Category');
var Content = require('../models/Content');

var data;

router.use( (req, res, next) => {
	data = {
		userInfo: req.userInfo,
		categories: []
	}
	Category.find().then( (categories) => {
		data.categories = categories
		next();
	});
});

// 首页
router.get('/', (req, res, next)=>{
	
		data.category = req.query.category || '';
		data.page = Number(req.query.page || 1);
		data.count = 0;
		data.limit = 3;
		data.pages = 0;
	
	var where = {};
	if (req.query.category) {
		where.category = data.category
	}
	// 读取所有分类
	Content.where(where).count().then( (count) => {
		data.count = count;
		//  总页数
		data.pages = Math.ceil(data.count / data.limit);

		data.page = Math.min(data.page,data.pages);
		data.page = Math.max(data.page,1);
		let skip = (data.page -1) * data.limit;
		
		return Content.find().where(where).limit(data.limit).skip(skip).populate(['category', 'user']).sort({
			addTime: -1
		})
	}).then( (contents) => {
		data.contents = contents;
		res.render('main/index',data);
	})
});

// 阅读全文
router.get('/view', (req, res) => {
	var contentId = req.query.contentid || '';
	Content.findOne({
		_id: contentId
	}).then( (content) => {
		data.content = content;
		content.views++;
		content.save();
		res.render('main/view',data);
	})
});

module.exports = router;








