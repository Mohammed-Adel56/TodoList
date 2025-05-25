const mongoose = require("mongoose");
const { Schema } = mongoose;
const TodoSchame = new mongoose.Schema({
  todo: String,
});
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  todos: [],
});
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
