const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Todo", TodoSchema, "Todos");
