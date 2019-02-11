
/*
*  应用程序入口
*/

var express = require('express');
// 模板模块
var swig = require('swig');
// 数据库模块
var mongoose = require('mongoose');
// 加载 body-parser 处理请求数据
var bodyParser = require('body-parser');
// cookies
var Cookies = require('cookies');

var app = express();

var User = require('./models/User');


// 设置静态文件托管
// 当用户访问的 URL 以 /public 开始，那么直接返回对应 __dirname + 'public' 下的文件
app.use( '/public', express.static( __dirname + '/public' ) );

// 定义当前应用所使用的模板引擎
// 参数1 模板引擎名称，同时也是模板文件的后缀
// 参数2 解析处理模板内容的方法
app.engine('html',swig.renderFile);
// 设置模板文件的目录，
// 参数1 必须是 views
// 参数2 是目录
app.set('views','./views');
// 注册所使用的模板引擎
// 参数1 必须是 view engine 
// 参数2 必须和 app.engine 的第一个参数一致
app.set('view engine','html');
// 在开发过程中，需要取消模板缓存
swig.setDefaults({cache: false});

// bodyParser 设置
app.use(bodyParser.urlencoded({ extended:true }));

// cookies 设置
app.use(function(req, res, next){
	req.cookies = new Cookies(req, res);
	
	// 解析用户登录的 cookie 信息
	req.userInfo = {};
	if(req.cookies.get('userInfo')){
		try {
			req.userInfo = JSON.parse(req.cookies.get('userInfo'));
			// 获取当前登录用户的类型,是否管理员
			User.findById(req.userInfo._id).then(function(userInfo){
				req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
				
			});
		}catch(e) {

		}
	}else{

	}
	next();
});

// 根据不同功能划分不同模块
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));



mongoose.connect('mongodb://127.0.0.1:27017/blog', (err)=>{
	if(err){
		console.log('连接数据库失败....');
	}else{
		console.log('连接数据库成功....');


		app.listen(8080);
		console.log('开始监听 8080 端口....')
	}
});





// app.get('/',(req,res,next)=>{
	// 读取 view 目录下的指定文件，解析并返回客户端
	// 参数1 表示模板文件，相对于 views 目录
	// 参数2 传递给模板使用的数据
	// res.render('index');
// });



// 用户发送 http 请求 --> url --> 解析路由 --> 找到匹配的规则 --> 执行绑定函数返回对应点内容到客户端

// /public  --> 静态文件，直接返回该文件内容
// 动态 -> 处理业务逻辑，加载模板，解析模板，返回给用户


