 var fs = require('fs')

var filename = './newFile'
fs.mkdir(filename,function(){
	console.log(arguments)
})


// fs.rmdir(filename,function(){
// 	console.log(arguments)
// })

fs.readdir('../filetem',function(err,filelist){
	console.log(filelist)
	filelist.forEach(function(f){
		fs.stat(f,function(err,info){
			if(info.mode == 33206){
				console.log('文件: '+f)
			}else if(info.mode == 16822){
				console.log('文件夹: '+f)
			}else{
				console.log('其他类型: '+f)
			}
		})
	})
})









