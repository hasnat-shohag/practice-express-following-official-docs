const { v4: uuidv4 } = require("uuid");

/**
 * Middleware to add a unique request ID to each request.
 * Useful for tracing logs and debugging.
 */
module.exports = function () {
	return function (req, res, next) {
		req.id = uuidv4();
		res.setHeader("X-Request-Id", req.id);
		next();
	};
};
