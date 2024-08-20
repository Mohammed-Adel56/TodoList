const router = require("express").Router();
const cors = require("cors");
const User = require("./user");
const { comparePassword, handlePassword } = require("./auth");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
//middleware
router.use(
  cors()
);

router.get("/", (req, res) => {
  // router code here
  res.json("test is working");
});
//Register EndPoint
router.post("/register", async (req, res) => {
  // res.header("Access-Control-Allow-Headers", "*");
  // res.header("Access-Control-Allow-Credentials", true);
  // res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  // router code here
  try {
    const { name, email, password } = req.body;
    const exit = await User.findOne({ email });
    if (exit) {
      return res.json({
        error: "Email is taken already",
      });
    }
    const handlePas = await handlePassword(password);
    const user = await User.create({
      name,
      email,
      password: handlePas,
    });
    jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      "kjsaiowq458",
      {},
      (err, token) => {
        if (err) throw err;
        console.log(token);

        res.cookie("token", token);
        res.json(user);
      }
    );
  } catch (err) {
    res.json({ error: err });
  }
});

//Login EndPoint
router.post("/login", async (req, res) => {
  // res.header("Access-Control-Allow-Headers", "*");
  // res.header("Access-Control-Allow-Credentials", true);
  // res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  // router code here
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No User Found",
      });
    }

    const match = await comparePassword(password, user.password);

    if (match) {
      console.log(password, user.password);
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        "kjsaiowq458",
        {},
        (err, token) => {
          if (err) throw err;
          console.log(token);

          res.cookie("token", token);
          res.json(user);
        }
      );
    }
    if (!match) {
      return res.json({
        error: "Password don't match",
      });
    }
  } catch (err) {
    res.json({ error: err });
  }
});

//forgetPassword
router.post("/forgetPassword", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.json({ error: "We could not find This email" });
  }
  const token = jwt.sign({ email: user.email, id: user.id }, user.password, {
    expiresIn: "10m",
  });
  const link = `http://localhost:5173/resetPassword/${user.id}/${token}`;
  const transporter = nodemailer.createTransport({
    service: "outlook",

    auth: {
      user: "mohamedadel4568@outlook.com",
      pass: "Mm772000",
    },
  });
  const info = await transporter
    .sendMail({
      from: "mohamedadel4568@outlook.com", // sender address
      to: user.email, // list of receivers
      subject: "Reset Password", // Subject line
      html: `<div><h4>Click on The Link to Reset Password </h4><p>${link}</p></div>`, // html body
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  res.json({
    message: "Successful link send to your email please Check your email",
  });
  // res.json({ message: "Click on the Link", resetPassword: link });
});

//resetPassword
router.post("/resetPassword", async (req, res) => {
  const { id, newPassword, token } = req.body;
  const user = await User.findById(id);
  try {
    jwt.verify(token, user.password, {}, (err, res) => {
      if (err) {
        res.json({ error: err });
      }
      console.log(res);
    });
    const newEnPass = await handlePassword(newPassword);
    user.password = newEnPass;
    await user.save();
    res.json({ message: "Successfully Change Password" });
  } catch (err) {
    res.json({ error: err });
  }
});

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
