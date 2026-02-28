var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

router.get(
	"/user/:id",
	(req, res, next) => {
		if (req.params.id === "0") {
			return next("route");
		}
		next();
	},
	(req, res) => {
		res.send(`Regular User ${req.params.id}`);
	},
);

router.get("/user/:id", (req, res) => {
	res.send("Special handler for ID 0");
});

router.get(
	"/example/b",
	(req, res, next) => {
		console.log("the response will be sent by the next function ...");
		next();
	},
	(req, res) => {
		res.send("Hello from B!");
	},
);

// const cb0 = function (req, res, next) {
// 	console.log("CB0");
// 	next();
// };

// const cb1 = function (req, res, next) {
// 	console.log("CB1");
// 	next();
// };

// const cb2 = function (req, res) {
// 	res.send("Hello from C!");
// };

// router.get("/example/c", [cb0, cb1, cb2]);

const cb0 = function (req, res, next) {
	console.log("CB0");
	next();
};

const cb1 = function (req, res, next) {
	console.log("CB1");
	res.send("Hello from cb1!");
	// next();
};

router.get(
	"/example/d",
	[cb1, cb0],
	(req, res, next) => {
		console.log("the response will be sent by the next function ...");
		next();
	},
	(req, res) => {
		res.send("Hello from D!");
	},
);

router.get(
	"/test",
	(req, res, next) => {
		res.send("Done");
	},
	(req, res) => {
		res.send("Hello"); // ❌ Never runs
	},
);

module.exports = router;
