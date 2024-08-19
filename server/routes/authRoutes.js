const router = require("express").Router();
const cors = require("cors");
const User = require("../modules/user");
const { comparePassword, handlePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
//middleware
router.use(
  cors({
    origin: true,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
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
    console.log("Password :");
    console.log(handlePas);
    const user = await User.create({
      name,
      email,
      password: handlePas,
    });
    jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        console.log(token);

        res.cookie("token", token);
        res.json(user);
      }
    );
  } catch (err) {
    console.log(err);
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
        process.env.JWT_SECRET,
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
    console.log(err);
  }
});

module.exports = router;
