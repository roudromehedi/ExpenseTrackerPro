var express = require("express");
var server = express();
var routes = require("./routes/routes");
var mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 8000;
mongoose.connect(
  "mongodb+srv://roudro:Roudro%40114727@cluster0.eibxm4x.mongodb.net/expenseTracker",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Bind connection to open event (to get notification of connection success)
db.once("open", function () {
  console.log("MongoDB database connection established successfully!!!");
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(port, function check(error) {
  if (error) {
    console.log("errorr");
  } else {
    console.log("started!!!");
  }
});
