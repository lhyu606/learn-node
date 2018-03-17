/*
*
*/
var http =require('http')
var url = require('url')
var fs = require('fs')
var qs = require('querystring')

var HtmlDir = __dirname + '/app';

var server = http.createServer((req,res)=>{
	var urlstr = url.parse(req.url)
	switch(urlstr.pathname) {
		case '/home':

		case '/':
			// 首页
			sendData( HtmlDir + '/index.html', req, res)
			break;
		case '/login/check' :
			// console.log(qs.parse(urlstr.query))  // GET 方法
			if(req.method.toUpperCase() == 'POST'){
				var str = '';
				req.on('data',function(chunk){
					str += chunk;
				})
				req.on('end',function(){
					console.log(str)
					console.log(qs.parse(str))
				})
			}
			res.end('登录....')
			break;
		default:
			// 其他
			sendData( HtmlDir + urlstr.pathname + '.html', req, res)
			break;
	}
	
})

function sendData(file, req, res){
	fs.readFile(file,function(err,data){

			console.log('===>' + file)
		if(err){
			res.writeHead(404,{
				'content-type': 'text/html;charset=utf-8'
			});
			res.write('<h1>你已经跑到火星上了.....</h1>')
		}else{
			res.writeHead(200,{
				'content-type': 'text/html;charset=utf-8'
			});
			res.write(data)
		}
		res.end()
	})
}





server.listen(3000,(err)=>{
	console.log('this server is listening at port 3000 .....')
})























