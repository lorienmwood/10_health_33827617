// create a new router
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = global.db;

function requireLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.redirect("/user/login");
  }
  next();
}

// create new workout route
router.get("/add", requireLogin, (req, res, next) => {
  const sql = "SELECT id, name FROM workoutTypes ORDER BY name";

  db.query(sql, (err, workoutTypes) => {
    if (err) return next(err);

    res.render("add.ejs", { workoutTypes });
  });
});

router.post("/added", requireLogin, (req, res, next) => {
  const { workoutDate, workoutTypeId, intensity, notes } = req.body;

  const sql = `
    INSERT INTO workouts (userId, workoutTypeId, workoutDate, intensity, notes)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [req.session.user.id, workoutTypeId, workoutDate, intensity, notes],
    (err, result) => {
      if (err) return next(err);

      const workoutId = result.insertId;

      res.redirect(`../exercise/${workoutId}/exercises/add`);
    }
  );
});

//add new exercise to workout
router.get("/:workoutId/exercises/add", (req, res, next) => {
  const workoutId = req.params.workoutId;

  const workoutSql = `
    SELECT w.*, t.name AS workoutTypeName
    FROM workouts w
    JOIN workoutTypes t ON w.workoutTypeId = t.id
    WHERE w.id = ?
  `;

  db.query(workoutSql, [workoutId], (err, workoutRows) => {
    if (err) return next(err);

    const workout = workoutRows[0];

    const exerciseSql = `
      SELECT id, name
      FROM exerciseTypes
      WHERE workoutTypeId = ?
      ORDER BY name
    `;

    db.query(exerciseSql, [workout.workoutTypeId], (err2, exerciseTypes) => {
      if (err2) return next(err2);

      const existingSql = `
        SELECT we.*, et.name AS exerciseName
        FROM workoutExercises we
        JOIN exerciseTypes et ON we.exerciseTypeId = et.id
        WHERE we.workoutId = ?
        ORDER BY we.id DESC
      `;

      db.query(existingSql, [workoutId], (err3, existingExercises) => {
        if (err3) return next(err3);

        res.render("addexercise.ejs", {
          workout,
          exerciseTypes,
          existingExercises,
        });
      });
    });
  });
});

router.post("/:workoutId/exercises/added", (req, res, next) => {
  const workoutId = req.params.workoutId;

  const {
    exerciseTypeId,
    sets,
    repsPerSet,
    weightKg,
    durationInMinutes,
    distanceKm,
    notes,
  } = req.body;

  const sql = `
    INSERT INTO workoutExercises
    (workoutId, exerciseTypeId, sets, repsPerSet, weightKg, durationInMinutes, distanceKm, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      workoutId,
      exerciseTypeId,
      sets || null,
      repsPerSet || null,
      weightKg || null,
      durationInMinutes || null,
      distanceKm || null,
      notes || null,
    ],
    (err) => {
      if (err) return next(err);

      res.redirect(`../exercise/${workoutId}/exercises/add`);
    }
  );
});

router.get("/search", requireLogin, (req, res) => {
  res.render("search.ejs");
});

router.get(
  "/searchresults",
  [check("keyword").isLength({ max: 100 }).trim().escape()],
  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("searchresults.ejs", {
        keyword: "",
        workouts: [],
        errors: errors.array(),
      });
    }

    const keyword = req.query.keyword || "";
    const search = `%${keyword}%`;
    const userId = req.session.user.id;

    const sql = `
      SELECT w.*, wt.name AS type
      FROM workouts w
      JOIN workoutTypes wt ON w.workoutTypeId = wt.id
      WHERE w.userId = ? AND wt.name LIKE ?
    `;

    db.query(sql, [userId, search], (err, result) => {
      if (err) return next(err);

      res.render("searchresults.ejs", {
        keyword,
        workouts: result,
      });
    });
  }
);

module.exports = router;
