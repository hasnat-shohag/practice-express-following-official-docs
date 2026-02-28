/**
 * Centralized error handling middleware.
 * Provides consistent error responses, especially for API requests.
 */
module.exports = function (err, req, res, next) {
	const status = err.status || 500;
	const message = err.message || "Internal Server Error";

	// Log the error (can be enhanced with a proper logger)
	console.error(`[Error] ${req.id ? `Request-ID: ${req.id} | ` : ""}${status} - ${message}`);
	if (err.stack) {
		console.error(err.stack);
	}

	res.status(status).json({
		error: {
			message: message,
			status: status,
			...(req.app.get("env") === "development" && { stack: err.stack }),
		},
	});
};
