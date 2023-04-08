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
  expenseDate: { type: String },
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
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },

  expenses: [expenseSchema],
});

module.exports = mongoose.model("User", userSchema);
