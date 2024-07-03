const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseYear: {
    
    type: Number,
  },
  genre: {
    type: String,

  },
  watched: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});



movieSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Task = mongoose.model("Task", movieSchema);

module.exports = Task;
