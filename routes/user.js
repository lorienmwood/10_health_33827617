const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");

const saltRounds = 10;
const { check, validationResult } = require("express-validator");

function requireLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.redirect("/user/login");
  }
  next();
}

// register route
router.get("/register", (req, res, next) => {
  res.render("register.ejs", { error: null });
});

router.post(
  "/registered",
  [
    check("email").isEmail(),
    check("username").isLength({ min: 5, max: 20 }),
    check("password").isLength({ min: 5 }),
    check("firstName").notEmpty().isAlpha().isLength({ min: 2, max: 50 }),
    check("lastName").notEmpty().isAlpha().isLength({ min: 2, max: 50 }),
  ],
  function (req, res, next) {
    const plainPassword = req.body.password;

    bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      req.body.firstName = req.sanitize(req.body.firstName);
      req.body.lastName = req.sanitize(req.body.lastName);
      req.body.username = req.sanitize(req.body.username);
      req.body.email = req.sanitize(req.body.email);

      const sqlquery =
        "INSERT INTO users (username, firstName, lastName, email, hashedPassword) VALUES (?,?,?,?,?)";

      const newrecord = [
        req.body.username,
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        hashedPassword,
      ];

      db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
          return next(err);
        }

        let output =
          "Hello " +
          req.body.firstName +
          " " +
          req.body.lastName +
          ", you are now registered! We will send an email to you at " +
          req.body.email;

        output +=
          "<br>Your password is: " +
          req.body.password +
          "<br>And your hashed password is: " +
          hashedPassword;

        return res.send(output);
      });
    });
  }
);

//login route
router.get("/login", (req, res) => {
  res.render("login.ejs", { error: null });
});

// logged in route
router.post(
  "/loggedin",
  [check("username").notEmpty(), check("password").notEmpty()],
  
  function (req, res, next) {
    const { username, password } = req.body;

    const sqlquery = "SELECT * FROM users WHERE username = ?";
    db.query(sqlquery, [username], (err, rows) => {
      if (err) return next(err);

      if (rows.length === 0) {
        return res.render("login.ejs", {
          error: "Invalid username or password",
        });
      }

      const user = rows[0];

      bcrypt.compare(password, user.hashedPassword, (err, match) => {
        if (err) return next(err);

        if (!match) {
          return res.render("login.ejs", {
            error: "Invalid username or password",
          });
        }

        req.session.user = {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
        };

        res.redirect("/");
      });
    });
  }
);

//logout route
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.render("logout.ejs");
  });
});

// profile route
router.get("/profile", requireLogin, (req, res, next) => {
  const userId = req.session.user.id;

  // Get user info
  const userSql =
    "SELECT username, firstName, lastName, email FROM users WHERE id = ?";

  // Get workout stats for this user
  const statsSql =
    "SELECT COUNT(*) AS workoutCount, MAX(workoutDate) AS lastWorkoutDate FROM workouts WHERE userId = ?";

  db.query(userSql, [userId], (err, userRows) => {
    if (err) return next(err);
    if (userRows.length === 0) {
      return res.status(404).send("User not found");
    }

    const user = userRows[0];

    db.query(statsSql, [userId], (err, statsRows) => {
      if (err) return next(err);

      const stats = statsRows[0] || { workoutCount: 0, lastWorkoutDate: null };

      res.render("profile.ejs", { user, stats });
    });
  });
});

module.exports = router;
