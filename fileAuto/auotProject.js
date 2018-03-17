var projectData = {
	'name': 'wb',
	'fileData': [
		{
			'name': 'css',
			'type': 'dir'
		},
		{
			'name': 'js',
			'type': 'dir'
		},
		{
			'name': 'images',
			'type': 'dir'
		},
		{
			'name': 'index.html',
			'type': 'file',
			'content': '<!DOCTYPE>\n<html>\n\t<head>\n\t\t<title>title</title>\n\t</head>\n\t<body>\n\t\t<h1>body</h1>\n\t</body>\n<html>'
		}
	]
}

var fs = require('fs')
if(projectData.name){
	fs.mkdirSync(projectData.name);
	var fileData = projectData.fileData;

	if(fileData && fileData.forEach) {
		fileData.forEach(function (f) {
			f.path = projectData.name + '/' + f.name;
			f.content = f.content || '';
			switch (f.type) {
				case 'dir':
					fs.mkdirSync(f.path);
					break;
				case 'file':
					fs.writeFileSync(f.path, f.content, 'utf-8');
					break;
				default:
					break; 
			}
		})
	}
}











