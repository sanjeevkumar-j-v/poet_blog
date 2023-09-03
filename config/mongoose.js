//require the library
const mongoose = require("mongoose");
const uri = "mongodb+srv://vithaikkul:virutcham@cluster0.ngfqupj.mongodb.net/virutcham_db?retryWrites=true&w=majority";

//connect to the database
mongoose.connect(
  uri,
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on("error", function (err) {
  console.log(err.message);
});

//up and running then print the message
db.once("open", function () {
  console.log("Successfully connected to the database");
});

module.exports = db;