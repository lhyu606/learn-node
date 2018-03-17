var fs = require('fs')

var filename = '2.txt'

// 箱文件中写数据，如果文件不存在，则创建在写入，覆盖原内容
fs.writeFile(filename,'hello war.....',function(){
	console.log('2')
})
// 箱文件中写数据,在文件内容后面追加，如果文件不存在，则创建在写入，
fs.appendFile(filename,'i like it...',function(){
	console.log('追加内容....')
})





