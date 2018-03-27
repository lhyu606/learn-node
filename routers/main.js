
var express = require('express');
var router = express.Router();

router.get('/', (req,res,next)=>{
	console.log(req.userInfo);
	res.render('main/index',{
		userInfo: req.userInfo
	});
	// res.send('main/index');
	// res.end();
});


module.exports = router;








