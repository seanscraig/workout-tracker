const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },

  exercises: [
    {
      // required fields
      type: {
        type: String,
        trim: true,
        required: "Enter a type for the exercise",
      },
      name: {
        type: String,
        trim: true,
        required: "Enter a name for the exercise",
      },
      duration: {
        type: Number,
        required: "Enter a duration for the exercise",
      },

      // optional fields
      distance: {
        type: Number,
        default: 0,
      },
      reps: {
        type: Number,
        default: 0,
      },
      sets: {
        type: Number,
        default: 0,
      },
      weight: {
        type: Number,
        default: 0,
      },
    },
  ],

  // totalDuration: {
  //   type: Number,
  //   default: 0,
  // },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
