const express = require("express");

// 🔥 Important here
const router = express.Router({ mergeParams: true });

// Get all posts of a specific user
router.get("/", (req, res) => {
	res.send(`Posts of User ${req.params.userId}`);
});

// Get specific post of that user
router.get("/:postId", (req, res) => {
	res.send(`Post ${req.params.postId} of User ${req.params.userId}`);
});

module.exports = router;
