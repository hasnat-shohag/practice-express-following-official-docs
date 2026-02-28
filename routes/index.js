var express = require("express");
var router = express.Router();

/* GET home page. */
// router.use('/', (req, res, next) => {
// 	console.log('Request URL:', req.originalUrl)
// 	next()
// }, (req, res, next) => {
// 	console.log('Request Type:', req.method)
// 	next()
// })

router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});	

router.get("/test", function (req, res, next) {
	res.render("layout", { title: "Testing Template Engine" });
});



module.exports = router;
