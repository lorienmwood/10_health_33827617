var express = require("express");
var ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const expressSanitizer = require('express-sanitizer');
require("dotenv").config();
const mysql = require("mysql2");
const app = express();
const port = 8000;



// use EJS as the view engine
app.set("view engine", "ejs");

// Set up the body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.locals.appData = { appName: "Gym App" };

// create a session
app.use(
  session({
    secret: "somerandomstuff",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

const db = mysql.createPool({
  host: "localhost",
  user: "health_app",
  password: "qwertyuiop",
  database: "health",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


// load the route handlers
const mainRoutes = require("./routes/main");
app.use("/", mainRoutes);

// load the route handlers for /users
const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

// load the route handlers for /exercise
const exerciseRoutes = require("./routes/exercise");
app.use("/exercise", exerciseRoutes);

// start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
