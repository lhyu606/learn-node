
var http = require('http')

var app = http.createServer(function (req,res) {
	// console.log(req.headers)
	console.log('有客户端请求....')

	res.setHeader('myhead', 'aloha..')
	res.writeHead(200,'today is sunny....',{
		// 'content-type': 'text/html'
		'content-type': 'text/plain'
	})
	res.write('<h1>hello war....</h1>')
	res.end();
})

app.listen(3000)

app.on('error',function(err){
	console.log(err)
})

app.on('listening',function(err){
	console.log('the server is listening at port 3000  .....')
})

// app.on('request',function(){
// 	console.log('有客户端请求....')
// })
console.log(app.address())

// 连接超时默认 2 分钟

// response :
// { res.write(chunk,[encoding]), end([chunk],[encoding]),
// statusCode(), setHeader(name,value), writeHead(statusCode,[reasonPhrase],[headers])改方法只能一次
// }


// http.STATUS_CODES






