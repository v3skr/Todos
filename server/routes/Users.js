const express = require("express");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
const joi = require("@hapi/joi");
const UserAuth = require("../middleware/UserAuth");
router.use(express.json());

// POST REQUEST
router.post("/", async (req, res) => {
  try {
    let { Email, username, password } = req.body;
    //validate syntax
    const userSchema = joi.object({
      Email: joi.string().email().required(),
      username: joi.string().alphanum().min(3).max(16).required(),
      password: joi.string().min(8).required(),
    });
    const { error } = userSchema.validate(req.body);
    if (error)
      return res.json({
        mag: error.details[0].message.replace(/"/g, ""),
        type: "err",
      });

    //Check if the email exists
    const email = await User.findOne({ Email });
    if (email) return res.json({ msg: "Eamil Taken", type: "err" });

    //Check if the username exists
    const Username = await User.findOne({ username });
    if (Username) return res.json({ msg: "Username Taken", type: "err" });

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const newUser = new User({
      Email,
      username,
      password,
    });

    //save user in the database
    await newUser.save();
    res.json({ msg: "User Saved", type: "suc" });
  } catch (err) {
    res.json({ msg: err.message, type: "err" });
  }
});
// PUT REQUEST
router.put("/", UserAuth, async (req, res) => {
  const { newUser } = req.body;
  //check new user is sent
  if (!newUser) res.json({ msg: "Access Denied", type: "err" });
  const userSchema = joi.object({
    username: joi.string().trim().alphanum().min(3).max(16).required(),
    Email: joi.string().email().required(),
  });
  //validate syntax
  const { error } = userSchema.validate(newUser);
  if (error) {
    return res.json({ msg: error.details[0].message.replace(/"/g, "") });
  }
  //find original user
  const user = await User.findById(req.id);

  //Check if email is updated
  if (user.Email !== newUser.Email) {
    //Check if Email is taken
    const userEmail = await User.findOne({ Email: newUser.Email });
    if (userEmail) return res.json({ msg: "Email is Taken", type: "war" });
  }

  //check if username is updated
  if (user.username !== newUser.username) {
    //Check if username is taken
    const userUsername = await User.findOne({ username: newUser.username });
    if (userUsername)
      return res.json({ msg: "Username is Taken", type: "war" });
  }

  await User.findByIdAndUpdate(req.id, newUser);
  res.json({ msg: "Account Updated", type: "suc" });
});
//GET REQUEST
router.get("/", UserAuth, async (req, res) => {
  try {
    const id = req.id;
    const user = await User.findById(id)
      .select("-password")
      .select("-__v")
      .select("");
    if (!user) return res.json({ msg: "User Not Found", type: "err" });
    res.send(user);
  } catch (err) {
    res.josn({ msg: err.message, type: "err" });
  }
});

module.exports = router;
