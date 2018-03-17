var fs = require('fs')

fs.readFile('2.txt',function(err,data){
	 if(err){
	 	console.log('读取文件失败： '+err)
	 }else{
	 	console.log(data.toString())
	 }
	 
})

// 删除文件
/*
fs.unlink('2.txt',function(err){
	if(err){
		console.log('删除失败...')
	}else{
		console.log('删除成功....')
	}
})
*/


// 重命名文件
/*
fs.rename('1.txt','1.new.txt',function(err){
	console.log(err)
})
*/

// 文件状态
fs.stat('3.txt',function(){
	console.log(arguments)
})


// 监听文件变化

fs.watch('3.txt',function(ev,fn){
	console.log(ev)// change  rename
	if(fn){
		console.log(fn + '发生了变化....')
	}
})
