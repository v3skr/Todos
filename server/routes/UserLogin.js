const express = require("express");
const app = express();
const User = require("../Models/User");
app.use(express.json());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const joi = require("@hapi/joi");

app.post("/", async (req, res) => {
  try {
    //destruct from the req object
    const { username, password } = req.body;
    const userSchema = joi.object({
      username: joi.string().trim().alphanum().min(3).max(16).required(),
      password: joi.string().min(8).required(),
    });
    //Check for syntax errors
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.json({
        msg: error.details[0].message.replace(/"/g, ""),
        type: "err",
      });
    }
    //check if the user exists in the database
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "username or password incorrect", type: "err" });

    //decrypte and compare the passwords
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.json({ msg: "username or password incorrect", type: "err" });
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.json({ msg: err.message, type: "err" });
  }
});

module.exports = app;
