import { VendorModel } from "../../models/index.js";
import { generateSalt, generatePassword } from "../../helper/index.js";

//create a vendor

//check email

export const existingEmail = async (email) => {
  try {
    return await VendorModel.findOne({ email: email });
  } catch (error) {
    console.log("error while checking vendor email address");
  }
};

const createVendor = async (req, res, nxt) => {
  console.log("Create vendor controller");
  const { name, address, pin, email, phone, ownerName, password, foodType } =
    req.body;

  try {
    if (await existingEmail(email)) {
      res.status(400).json({
        status: false,
        results: existingEmail(email),
        data: {},
        message: "this email already exsist",
      });
    } else {
      const salt = await generateSalt();
      const userPassword = await generatePassword(password, salt);

      const result = await VendorModel.create({
        name: name,
        address: address,
        email: email,
        phone: phone,
        coverImages: [],
        ownerName: ownerName,
        pin: pin,
        password: userPassword,
        rating: 0,
        vendorImage: "",
        isEnable: true,
        foodType: foodType,
        salt: salt,
      });
      res.status(200).json({
        status: true,
        results: result.length,
        data: result,
        message: "account created successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      results: 0,
      data: {},
      message: error.message,
    });
  }
};

//get vendors
const getVendors = async (req, res, nxt) => {
  try {
    const result = await VendorModel.find({});

    if (result.length > 0) {
      res.status(200).json({
        status: true,
        results: result.length,
        data: result,
        message: `got ${result.length} vendors`,
      });
    } else
      res.status(400).json({
        status: false,
        results: 0,
        data: {},
        message: "no vendor found",
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      results: 0,
      data: {},
      message: error.message,
    });
  }
};

//get vendor by ID
const getVendorById = (req, res, nxt) => {
  res.send("get vendor by Id call");
};

export { createVendor, getVendors, getVendorById };
