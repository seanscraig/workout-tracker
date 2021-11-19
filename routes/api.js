const router = require("express").Router();
const Workout = require("../models/Workout");

router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    {
      $push: { exercises: body },
      $inc: { totalDuration: body.duration },
    },
    {
      new: true,
      runValidatiors: true,
    }
  )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  // Workout.find({})
  //   .then((data) => {
  //     data.forEach((workout) => {
  //       let total = 0;
  //       workout.exercises.forEach((exercise) => {
  //         total += exercise.duration;
  //       })
  //       workout.totalDuration = total;
  //     })
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    // Workout.find({})
    .sort({ _id: -1 })
    .limit(7)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// router.delete("/api/workouts/:id", ({ body }, res) => {
//   Workout.findByIdAndDelete(body.id)
//   .then((data) => {
//     res.status(200).json(data);
//   })
//   .catch((err) => {
//     res.status(400).json(err);
//   });
// });

module.exports = router;
