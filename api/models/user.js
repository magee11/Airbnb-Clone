const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstname: String,
  secondname: String,
  phone: Number,
  email: { type: String, unique: true },
  password: String,
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
