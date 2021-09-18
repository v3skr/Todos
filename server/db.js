const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  try {
    mongoose.connect(process.env.db, { useNewUrlParser: true });
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = connectDB;
