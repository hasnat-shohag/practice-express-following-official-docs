const express = require("express");
const router = express.Router();


// middleware that is specific to this router
const timeLog = (req, res, next) => {
	console.log("Time: ", Date.now());
	next();
};
router.use(timeLog);

// define the home page route
router.get("/", (req, res) => {
	res.send("Birds home page");
});
// define the about route
router.get("/about", (req, res) => {
	res.send("About birds");
});

router.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, (req, res, next) => {
  // send a regular response
  res.send('regular')
})

// handler for the /user/:id path, which sends a special response
router.get('/user/:id', (req, res) => {
  res.send('special')
})

function logOriginalUrl (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}

function logMethod (req, res, next) {
  console.log('Request Type:', req.method)
  next()
}

const logStuff = [logOriginalUrl, logMethod]
router.get('/posts/:id', logStuff, (req, res, next) => {
  res.send('post Info')
})



module.exports = router;
