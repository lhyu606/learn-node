var fs = require('fs')

var filename = '3.txt'


/*  异步操作

var ext = fs.exists(filename,function(isExists){
	console.log('是否存在： '+ isExists)
	if(!isExists){
		fs.writeFile(filename,'the file is not exists,so I create a file named as "'+filename+'"\n',function(err){
			if(err){
				console.log('create failed....')
			}else{
				console.log('create success....')
			}
		})
	}else{
		fs.appendFile(filename,' add something here.....\n',function(err){
			if(err){
				console.log('append failed.....')
			}else{
				console.log('add something to file .')
			}
		})
	}
})

console.log('判断是否存在： '+ ext)
*/

//  同步操作
if(!fs.existsSync(filename)){
	if(fs.writeFile(filename,'chinese people...\n')){
		console.log('create a new file....')
	}else{
		console.log('create new file failed....')
	}
}else{
	if(fs.appendFile(filename,'is very kindly....\n')){
		console.log('append something to the file....')
	}else{
		console.log('append something failed....')
	}
}
