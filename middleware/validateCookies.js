// Mock function for external cookie validation
async function externallyValidateCookie(cookie) {
	if (cookie === "invalid") {
		throw new Error("Invalid cookie value");
	}
	return true;
}

async function cookieValidator(cookies) {
	try {
		if (cookies && cookies.testCookie) {
			await externallyValidateCookie(cookies.testCookie);
		}
	} catch {
		throw new Error("Invalid cookies");
	}
}

module.exports = function (options = {}) {
	return async function (req, res, next) {
		try {
			await cookieValidator(req.cookies);
			next();
		} catch (err) {
			next(err);
		}
	};
};
