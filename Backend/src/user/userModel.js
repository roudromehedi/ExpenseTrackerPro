var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var expenseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

var userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  expenses: [expenseSchema],
});

module.exports = mongoose.model("User", userSchema);
