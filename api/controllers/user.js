const User = require("../models/user");
const Place = require("../models/places");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const imageDownloader = require("image-downloader");
const Register = async (req, res) => {
  const { firstname, secondname, phone, password, email } = req.body;
  try {
    const user = await User.create({
      firstname: firstname,
      secondname: secondname,
      phone: phone,
      email: email,
      password: bcrypt.hashSync(password, 8),
    });
    res.json({ message: "User created successfully", user });
  } catch (err) {
    console.log(err);
  }
};
const Login = async (req, res) => {
  const jwtsecret = "kjshdfkjsdhfjhsdf";
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compare(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id, name: userDoc.firstname },
        jwtsecret,
        {
          expiresIn: "1h",
        },
        (err, token) => {
          if (err) {
            res.json({ message: err.message });
          }
          console.log(userDoc);
          res
            .cookie('token', token, { sameSite: "none", secure: true })
            .json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
};

const Profile = (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  const jwtsecret = "kjshdfkjsdhfjhsdf";
  if (token) {
    jwt.verify(token, jwtsecret, {}, async (err, userData) => {
      if (err) throw err;
      const {email,_id,firstname} = await User.findById(userData.id);
      res.json({email,_id,firstname});
    });
  } else {
    res.json(null);
  }
};

const Logout = (req, res) => {
  res.cookie('token', '',{ sameSite: "none", secure: true }).json(true);
};

const Image_Download = async (req, res) => {
  const { link } = req.body;
  const newName = "Photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: "/home/harshan/Desktop/Booking_App/api/uploads/" + newName,
  });
  res.json(newName);
};

const addPlace = async (req, res) => {
  const jwtsecret = "kjshdfkjsdhfjhsdf";
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    price,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  console.log(req.body);
  jwt.verify(token, jwtsecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      price,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    res.json(placeDoc);
  });
};

const AddedPlaces = async (req, res) => {
  const jwtsecret = "kjshdfkjsdhfjhsdf";
  const { token } = req.cookies;
  jwt.verify(token, jwtsecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
};

module.exports = {
  Register,
  Login,
  Profile,
  Logout,
  Image_Download,
  addPlace,
  AddedPlaces,
};
