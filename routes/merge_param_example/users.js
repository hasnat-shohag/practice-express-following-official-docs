const express = require("express");
const router = express.Router();

const postRouter = require("./posts");

// Example user route
router.get("/:userId", (req, res) => {
	res.send(`User ID: ${req.params.userId}`);
});

// Mount child router
router.use("/:userId/posts", postRouter);

module.exports = router;
