
var fs = require('fs')

/* fs.open(path,flags,[mode],callback)
*  path : 路径
*  flags: 代开文件的方式， 读/写  r  r+
*  mode : 设置文件模式，  读/写/执行  4 / 2 / 1
*  callback: 回调函数（ err:错误信息, fd： 被打开文件标识 ）
*/

// fs.open('1.txt','r',function(err,fd){
// 	console.log(err);
// 	console.log(fd);
// 	if(err){
// 		console.log('文件打开失败....')
// 	}else{
// 		console.log('success....')
// 	}
// })

console.log('这是先输出的....')


fs.openSync('1.txt','r',function(err,fd){
	console.log(fd)
	console.log('这是同步文件打开...')
})
console.log('这在同步文件之后.....')


/*
*  fs.read(fd,buffer,offset,length,position,callback);
*  fd: 成功打开文件返回的序号
*  
*
*/
fs.open('1.txt','r',function(err,fd){
	console.log(err);
	console.log(fd);
	if(err){
		console.log('文件打开失败....')
	}else{
		console.log('success....');
		var bf1 = new Buffer(10);
		fs.read(fd,bf1,0,10,null,function(err,len,newBf){
			console.log(err);
			console.log(len)
			console.log(newBf)
		})
	}
})
fs.open('1.txt','r+',function(err,fd){
	console.log(err);
	console.log(fd);
	if(err){
		console.log('文件打开失败....')
	}else{
		console.log('success....');
		var bf1 = new Buffer('000');
		// fs.write(fd,bf1,0,3,1,function(err,len,newBf){
		// 	console.log(err);
		// 	console.log(len)
		// 	console.log(newBf)
		// });
		fs.write(fd,'99999',0,'utf-8')
		fs.close(fd,function(){
			console.log('close the file:'+fd)
		})
	}
})

