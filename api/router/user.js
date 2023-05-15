const express = require("express");
const {
  Register,
  Login,
  Profile,
  Logout,
  addPlace,
  Image_Download,
  AddedPlaces,
} = require("../controllers/user");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

router.post("/register", Register);
router.post("/login", Login);
router.get("/profile", Profile);
router.post("/logout", Logout);
router.post("/places", addPlace);
router.post("/image_download", Image_Download);
router.get('/added_places',AddedPlaces)

const photosMiddleware = multer({ dest: "uploads/" });
router.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    console.log(path, originalname);
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

module.exports = router;
