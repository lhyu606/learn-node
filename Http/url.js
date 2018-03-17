var http = require('http')
var url = require('url')
// console.log(url)


var server = http.createServer(function(req,res){
	var urlstr = url.parse(req.url)
	switch(urlstr.pathname) {
		case '/home':

		case '/':
			// 首页
			res.writeHead(200,{
				'content-type': 'text/html;charset=utf-8'
			});
			res.write('<h1>首页.....</h1>')
			break;
		case '/user':
			// 用户主页
			res.writeHead(200,{
				'content-type': 'text/html;charset=utf-8'
			});
			res.write('<h1>用户主页.....</h1>')
			break;
		default:
			// 其他
			res.writeHead(404,{
				'content-type': 'text/html;charset=utf-8'
			});
			res.write('<h1>你已经跑到火星上了.....</h1>')
			break;
	}
	res.end()
})


server.listen(3000,function(err){
	console.log('this server is listening at port 3000 .....')
})

/*
if  url  =   http://www.baidu.com:80/a/index.html?logo=logo1#&date=12
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com:80',
  port: '80',
  hostname: 'www.baidu.com',
  hash: '#date=12',
  search: '?logo=logo1',
  query: 'logo=logo1',
  pathname: '/a/index.html',
  path: '/a/index.html?logo=logo1',
  href: 'http://www.baidu.com:80/a/index.html?logo=logo1#date=12' 
}
*/







