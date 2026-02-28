const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		// fetch the posts from json placeholder
		const response = await fetch("https://jsonplaceholder.typicode.com/posts");
		const data = await response.json();
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch posts" });
	}
});

module.exports = router;
