const mongoose = require("mongoose");

module.exports = (req, res) => {
  try {
    mongoose
      .connect("mongodb://localhost:27017/react")
      .then(console.log("Database connection established"))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log("Database connection Error: " + err);
  }
};
