
var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.use((req,res,next)=>{
	User.findOne({
		username: req.userInfo.username
	}).then(()=>{
		if( !req.userInfo.isAdmin ){
			res.send('对不起只有管理员才能进入后台管理....');
			return ;
		}
	
		next();
	})
	
});

router.get('/',function(req,res,next){
	res.render('admin/index',{
		userInfo: req.userInfo
	});
});

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
			console.log(users);
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
module.exports = router;








