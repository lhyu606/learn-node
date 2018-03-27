
var express = require('express');
var router = express.Router();
var User = require('../models/User');

// 同意返回格式
var resposeData ;
router.use( function(req, res, next){
	resposeData = {
		code: 0,
		message: ''
	};
	next();
})

//  用户注册
router.post('/user/register', (req,res,next)=>{
	var username = req.body.username;
	var password = req.body.password;
	var repassword = req.body.repassword;

	// 用户名是否为空
	if( username == ''){
		resposeData.code = 1;
		resposeData.message = '用户名不能为空';
		res.json(resposeData);
		return;
	}
	if( password == '' ){
		resposeData.code = 2;
		resposeData.message = '密码不能为空'
		res.json(resposeData);
		return;
	}
	if(password != repassword){
		resposeData.code = 3;
		resposeData.message = '两次输入的密码不一致'
		res.json(resposeData);
		return;
	}

	// 数据库是否注册过
	User.findOne({
		username: username
	}).then(function(userInfo){
		if(userInfo ){
			// 数据库中已注册过该用户名
			resposeData.code = 4;
			resposeData.message = '该用户名已被注册'
			res.json(resposeData);
			return;
		}
		// 保存数据
		var user = new User({
			username : username,
			password : password
		});
		return user.save();		
	}).then(function(newUserInfo){
		console.log(newUserInfo)
		resposeData.message = '注册成功';
		res.json(resposeData);
	})
	
});

//  用户登录
router.post('/user/login', (req,res,next)=>{
	var username = req.body.username;
	var password = req.body.password;
	if(username == '' || password == ''){
		resposeData.code = 1;
		resposeData.message = '用户名和密码不能为空'
		res.json(resposeData);
		return;
	}
	// 验证数据库中是否存在该用户
	User.findOne({
		username: username,
		password: password
	}).then(function(userInfo){
		if(!userInfo){
			resposeData.code = 2;
			resposeData.message = '用户名或密码错误'
			res.json(resposeData);
			return;
		}
		// 存在该用户
		resposeData.userInfo = {
			_id: userInfo.id,
			username: userInfo.username
		}
		req.cookies.set('userInfo',JSON.stringify({
			_id: userInfo.id,
			username: userInfo.username
		}));
		resposeData.message = '登录成功';
		res.json(resposeData);
		return;
	})
});
//  用户登出
router.get('/user/logout', (req,res,next)=>{
	req.cookies.set('userInfo', null);
	resposeData.message = '登出成功';
	res.json(resposeData);
	return;
});
module.exports = router;
// http://mongoosejs.com/docs/api.html#Model  mongoose查询地址





