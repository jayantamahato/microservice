import express from "express";

import { authentication } from "../middleware/auth.js";
import multer from "multer";
import { VendorController } from "../controller/vendorController.js";
// import { uploadImage } from "../../middleware/foodImage.js";

const router = express.Router();
const vendor = new VendorController();
// image upload with multer

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './images')
  },
  filename: function (req, file, cb) {
    console.log(file)
    return cb(null, Date.now() + file.originalname)
  }
})

const uploadImage = multer({ storage: multerStorage }).array('images', 5);
//login




router.post("/", vendor.login);
//profile
router.use(authentication);
router.get("/profile", vendor.profile);
router.patch("/profile", vendor.updateProfile);
router.patch("/service", vendor.updateService);
//food
router.post("/food", uploadImage, vendor.addFood);
router.get("/foods", vendor.getFoods);
router.delete("/food/:id", vendor.deleteFood);


export { router as vendorRouer };
