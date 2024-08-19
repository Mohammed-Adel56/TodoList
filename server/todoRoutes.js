const router = require("express").Router();
const cors = require("cors");
const User = require("./user");
// const { comparePassword, handlePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
router.get("/get", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, "kjsaiowq458", {}, async (err, user) => {
      if (err) {
        res.json({ error: err });
      }
      const query = await User.findOne({ _id: user.id }).select("todos");
      res.json(query.todos);
    });
  }
});
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, "kjsaiowq458", {}, async (err, user) => {
      if (err) {
        res.json({ error: err });
      }

      await User.findById(user.id)
        .then(async (user) => {
          if (user && user.todos.length > id) {
            user.todos.splice(id, 1);

            await user.save();
          } else {
            res.json({ error: "Index out of bounds or user not found" });
          }
        })
        .catch((err) => console.log(err));
      const query = await User.findOne({ _id: user.id }).select("todos");
      res.json(query.todos);
    });
  }
});
router.post("/add", (req, res) => {
  const todo = req.body.todo;
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, "kjsaiowq458", {}, async (err, user) => {
      if (err) {
        res.json({ error: err });
      }

      const newUp = await User.updateOne(
        { _id: user.id },
        { $push: { todos: todo } }
      );
      const query = await User.findOne({ _id: user.id }).select("todos");
      res.json(query.todos);
    });
  }
});
module.exports = router;
