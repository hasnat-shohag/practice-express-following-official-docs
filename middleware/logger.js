module.exports = function (options = {}) {
	return function (req, res, next) {
		const requestId = req.id || "N/A";
		console.log(`[${new Date().toISOString()}] [${requestId}] ${req.method} ${req.url}`);
		next();
	};
};
