const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const connect = require("./database/db");
const UserRouter = require("./router/user");
const { default: mongoose } = require("mongoose");
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(cookieParser());
mongoose.connect("mongodb://localhost:27017/react");
connect();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/api/v1/user", UserRouter);

app.get("/test", (req, res) => {
  res.json({ message: "Dummy apis" });
});

const port = 4000;
app.listen(4000, console.log("Backed is running on port", port));
