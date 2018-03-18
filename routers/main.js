
var express = require('express');
var router = express.Router();

router.get('/', (req,res,next)=>{
	res.send('首页....');
	res.end();
});


module.exports = router;








