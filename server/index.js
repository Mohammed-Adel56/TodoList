const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;
//database connection
mongoose
  .connect(
    "mongodb+srv://569mohamedadel2514:Mm772000@cluster0.7lwvkwx.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database is connect"))
  .catch((err) => console.log(err));

//middleware
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./authRoutes"));
app.use("/", require("./todoRoutes"));
app.listen(port, () =>
  console.log(`Server is running on port ${port} link http://localhost:${port}`)
);
