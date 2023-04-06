var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("login_data", userSchema);
