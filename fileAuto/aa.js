var fs = require('fs')

var filedir = './wb/source'

fs.watch(filedir,function (ev,file) {
	// console.log(ev + ' / ' + file) // 这里不需要判断 file 是否有内容
	// 只要有一个文件发生变化，就需要对这个文件夹下的所有文件进行读取，合并
	fs.readdir(filedir,function(err,datalist){
		var arr = [];
		datalist.forEach(function(f){
			var info = fs.statSync(filedir + '/' + f)
			if(info.mode == 33206){
				arr.push(filedir + '/' + f);
			}
		});
		console.log(arr)
		// 读取数组中的文件内容并合并

		var content = '';
		arr.forEach(function(f){
			var c = fs.readFileSync(f)
			console.log(c)
			content += c.toString() + '\n';
		})
		console.log('========',content)
		fs.writeFile('./wb/js/index.js',content,function(err){});
	})
})









