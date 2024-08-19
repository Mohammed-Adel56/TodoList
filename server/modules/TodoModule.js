const mongoose = require("mongoose");

const TodoSchame = new mongoose.Schema({
    todo:String,
   
});
const TodoModel = mongoose.model("todo",TodoSchame);
module.exports = TodoModel;