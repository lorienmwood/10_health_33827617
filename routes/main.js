// create a new router
const express = require("express");
const router = express.Router();
const db = global.db;

// handle routes
router.get('/',function(req, res, next){
    res.render('index.ejs')
});

router.get("/about", function (req, res, next) {
  res.render("about.ejs");
});


// export the router object so index.js can access it
module.exports = router;


