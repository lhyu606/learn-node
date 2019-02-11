
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Category = require('../models/Category');
var Content = require('../models/Content');

router.use((req,res,next)=>{
	User.findOne({
		username: req.userInfo.username
	}).then(()=>{
		if( !req.userInfo.isAdmin ){
			res.send('对不起只有管理员才能进入后台管理....');
			return ;
		}
	console.log('admin-----------------------')
		next();
	})
	
});

// 管理首页
router.get('/',function(req,res,next){
	res.render('admin/index',{
		userInfo: req.userInfo
	});
});

// 用户管理
router.get('/user',(req,res,next)=>{
	let page = req.query.page-0 || 1;
	let limit = 2;
	User.count().then((count)=>{
		//  总页数
		let pages = Math.ceil(count / limit);

		page = Math.max(page,1);
		page = Math.min(page,pages);
		let skip = (page -1)*limit;
		User.find().skip(skip).limit(limit).then((users)=>{
			res.render('admin/user_index',{
				userInfo: req.userInfo,
				users: users,
				page: page,
				pages: pages,
				count: count,
				limit: limit
			});
		});
	})
	
	
});

// 分类首页
router.get('/category',(req,res,next)=>{
	let page = req.query.page-0 || 1;
	let limit = 10;
	Category.count().then((count)=>{
		//  总页数
		let pages = Math.ceil(count / limit);

		page = Math.max(page,1);
		page = Math.min(page,pages);
		let skip = (page -1)*limit;
		// sort 里面 1 升序，-1 降序
		Category.find().sort({ _id: -1 }).skip(skip).limit(limit).then((categories)=>{
			res.render('admin/category_index',{
				userInfo: req.userInfo,
				categories: categories,
				page: page,
				pages: pages,
				count: count,
				limit: limit
			});
		});
	})
});

// 分类的添加
router.get('/category/add', (req, res, next) => {
	res.render('admin/category_add', {
		userInfo: req.userInfo
	})
});

// 分类的保存
router.post('/category/add', (req, res, next) => {
	var name = req.body.name || '';

	if (name == '') {
		res.render('admin/error', {
			userInfo: req.userInfo,
			message: '名称不能为空！'
		});
		return;
	}

	// 数据库中是否已经存在同名分类名称
	Category.findOne({
		name: name
	}).then((rs) => {
		// 数据库中已经存在该分类了
		if (rs) {
			res.render('admin/error', {
				userInfo: req.userInfo,
				message: '分类已经存在'
			});
			return Promise.reject();
		} else {
			// 数据库中不存在，可以保存
			return new Category({
				name: name
			}).save();
		}
	}).then( (newCategory) => {
		res.render('admin/success', {
			userInfo: req.userInfo,
			message: '分类保存成功！',
			url: '/admin/category'
		})
	});
});

// 分类修改
router.get('/category/edit', (req, res, next) => {
	// 获取要修改的分类的信息，并且用表单的形式展现出来
	var id = req.query.id || '';

	// 获取要修改的分类的信息
	Category.findOne({
		_id: id
	}).then( (category) => {
		if (!category) {
			res.render('admin/error', {
				userInfo: req.userInfo,
				message: '分类信息不存在'
			});
		} else {
			res.render('admin/category_edit', {
				userInfo: req.userInfo,
				category: category
			});
		}
	})
})
// 分类修改保存
router.post('/category/edit', (req, res, next) => {
	// 获取要修改的分类的信息，并且用表单的形式展现出来
	var id = req.query.id || '';
	// 获取 post 过来的名称
	var name = req.body.name || '';

	// 获取要修改的分类名称
	Category.findOne({
		_id: id
	}).then( (category) => {
		if (!category) {
			res.render('admin/error', {
				userInfo: req.userInfo,
				message: '分类信息不存在'
			});
			return Promise.reject();
		} else {
			// 当用户没有做任何修改
			if (name == category.name) {
				res.render('admin/success', {
					userInfo: req.userInfo,
					message: '修改成功！',
					url: '/admin/category'
				});
				return Promise.reject();
			} else {
				// 要修改的名称是否在数据库中已存在
				return Category.findOne({
					_id: { $ne: id },
					name: name
				}).then( (sameCategory) => {
					if (sameCategory) {
						res.render('admin/error', {
							userInfo: req.userInfo,
							message: '数据库中存在同名分类了！'
						});
						return Promise.reject();
					} else {
						return Category.update({
							_id: id
						}, {
							name: name
						})
					}
				}).then(() => {
					res.render('admin/success', {
						userInfo: req.userInfo,
						message: '修改成功！',
						url: '/admin/category'
					});
				})
			}
		}
	})
});
// 分类删除
router.get('/category/delete', (req, res, next) => {
	// 获取要删除的 id
	var id = req.query.id || '';

	Category.remove({
		_id: id
	}).then( () => {
		res.render('admin/success', {
			userInfo: req.userInfo,
			message: '删除成功！',
			url: '/admin/category'
		});
	})
});

// 内容首页
router.get('/content', (req, res) => {
	let page = req.query.page-0 || 1;
	let limit = 10;
	Content.count().then((count)=>{
		//  总页数
		let pages = Math.ceil(count / limit);

		page = Math.max(page,1);
		page = Math.min(page,pages);
		let skip = (page -1)*limit;
		// sort 里面 1 升序，-1 降序
		Content.find().sort({
			addTime: -1 
		}).skip(skip).populate(['category', 'user']).limit(limit).then((contents)=>{
			console.log(contents)
			res.render('admin/content_index',{
				userInfo: req.userInfo,
				contents: contents,
				page: page,
				pages: pages,
				count: count,
				limit: limit
			});
		});
	})
});

// 内容添加
router.get('/content/add', (req, res) => {

	Category.find().sort({_id: -1}).then( (categories) => {
		res.render('admin/content_add', {
			userInfo: req.userInfo,
			categories: categories
		})
	});
});

// 内容保存
router.post('/content/add', (req, res) => {
	if (req.body.category == '') {
		res.render('admin/error', {
			userInfo: userInfo,
			message: '内容分类不能为空！'
		})
	}
	if (req.body.title == '') {
		res.render('admin/error', {
			userInfo: req.userInfo,
			message: '内容标题不能为空！'
		})
	}
	// 保存数据到数据库
	new Content({
		category: req.body.category,
		title: req.body.title,
		user: req.userInfo._id.toString(),
		desc: req.body.desc,
		content: req.body.content
	}).save().then( (rs) => {
		res.render('admin/success', {
			userInfo: req.userInfo,
			message: '内容保存成功！',
			url: '/admin/content'
		})
	});
});

// 修改内容
router.get('/content/edit', (req, res) => {
	var id = req.query.id || '';
	if (req.body.category == '') {
		res.render('admin/error', {
			userInfo: req.userInfo,
			message: '内容分类不能为空！'
		})
	}
	if (req.body.title == '') {
		res.render('admin/error', {
			userInfo: req.userInfo,
			message: '内容标题不能为空！'
		})
	}
	var categories = [];
	Category.find().sort({_id: -1}).then( (rs) => {
		categories = rs;
		return Content.findOne({
			_id: id
		}).populate('category');
	}).then( (content) => {
		if (!content) {
			res.render('admin/error', {
				userInfo: req.userInfo,
				message: '内容不存在！'
			});
		} else {
			res.render('admin/content_edit', {
				userInfo: req.userInfo,
				content: content,
				categories: categories
			})
		}
	});
});
// 修改内容保存
router.post('/content/edit', (req, res) => {
	// 获取要修改的内容 ID
	var id = req.query.id || '';
	if (req.body.category == '') {
		res.render('admin/error', {
			userInfo: req.userInfo,
			message: '内容分类不能为空！'
		})
	}
	if (req.body.title == '') {
		res.render('admin/error', {
			userInfo: req.userInfo,
			message: '内容标题不能为空！'
		})
	}

	// 获取要修改的分类名称
	Content.findOne({
		_id: id
	}).then( (category) => {
		if (!category) {
			res.render('admin/error', {
				userInfo: req.userInfo,
				message: '分类信息不存在'
			});
			return Promise.reject();
		} else {
			Content.update({
				_id: id
			},　{
				category: req.body.category,
				title: req.body.title,
				desc: req.body.desc,
				content: req.body.content
			}).then( () => {
				res.render('admin/success', {
					userInfo: req.userInfo,
					message: '内容修改成功！',
					url: '/admin/content/edit?id=' + id
				});
			});
		}
	})
});
// 内容删除
router.get('/content/delete', (req, res) => {
	// 获取要删除的内容 ID
	var id = req.query.id || '';
	Content.remove({
		_id: id
	}).then( () => {
		res.render('admin/success', {
			userInfo: req.userInfo,
			message: '删除成功！',
			url: '/admin/content'
		});
	});
})
module.exports = router;








