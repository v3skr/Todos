const express = require("express");
const UserAuth = require("../middleware/UserAuth");
const joi = require("@hapi/joi");
const router = express.Router();
const Todo = require("../Models/Todo");
router.use(express.json());

//POST A TODO
router.post("/", UserAuth, async (req, res) => {
  try {
    const { title, description, date, completed } = req.body;
    const todoSchema = joi.object({
      title: joi.string().required(),
      date: joi.string().required(),
      description: joi.string().allow(""),
      completed: joi.boolean().required(),
      userid: joi.string(),
    });
    const { error } = todoSchema.validate(req.body);
    if (error)
      return res.json({
        msg: error.details[0].message.replace(/"/g, ""),
        type: "err",
      });
    const todo = new Todo({
      title,
      description,
      date,
      completed,
      userid: req.id,
    });
    await todo.save();
    res.json({ msg: "Task Saved", type: "suc" });
  } catch (err) {
    res.json({ msg: err.message, type: "err" });
  }
});
//GET TODOS
router.get("/", UserAuth, async (req, res) => {
  try {
    const todos = await Todo.find({ userid: req.id })
      .select("-userid")
      .select("-__v");
    res.send(todos);
  } catch (err) {
    res.json({ msg: err.message, type: "err" });
  }
});
//PUT TODO
router.put("/", UserAuth, async (req, res) => {
  try {
    const { newTodo } = req.body;
    const todoSchema = joi.object({
      title: joi.string().alphanum().required(),
      date: joi.string().required(),
      description: joi.string().alphanum().allow(""),
      _id: joi.string(),
    });
    const { error } = todoSchema.validate(newTodo);
    if (error)
      return res.json({
        msg: error.details[0].message.replace(/"/g, ""),
        type: "err",
      });
    await Todo.findByIdAndUpdate(newTodo._id, { newTodo });
    res.json({ msg: "Task Updated", type: "suc" });
  } catch (err) {
    res.json({ msg: err.message, type: "err" });
  }
});

// DELETE A TODO
router.delete("/", UserAuth, async (req, res) => {
  const todoid = req.header("todo-id");
  await Todo.findByIdAndDelete(todoid);
  res.json({ msg: "Task Deleted", type: "suc" });
});
module.exports = router;
