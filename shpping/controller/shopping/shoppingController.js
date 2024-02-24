import { VendorModel } from "../../models/index.js";

//nearest restaurants
export const nearestResturent = async (req, res) => {
  const pinNo = req.params.pin;
  console.log(pinNo);

  try {
    const result = await VendorModel.find({ pin: pinNo, isEnable: true });
    if (result) {
      return res.status(200).json({
        status: true,
        results: result.length,
        data: result,
        message: `got ${result.length} items `,
      });
    } else {
      return res.status(200).json({
        status: true,
        results: result.length,
        data: result,
        message: `got ${result.length} items `,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      results: 0,
      data: {},
      message: error.message,
    });
  }
};

//top rated resturents
export const topRatedResturent = async (req, res) => {
  const pinNo = req.params.pin;

  try {
    const result = await VendorModel.find({ pin: pinNo, isEnable: true })
      .sort([["rating", "descending"]])
      .limit(6);
    if (result) {
      return res.status(200).json({
        status: true,
        results: result.length,
        data: result,
        message: `got ${result.length} items `,
      });
    } else {
      return res.status(200).json({
        status: true,
        results: result.length,
        data: result,
        message: `got ${result.length} items `,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      results: 0,
      data: {},
      message: error.message,
    });
  }
};

//top rated available food

export const availableFood = async (req, res) => {
  const pinNo = req.params.pin;

  try {
    const result = await VendorModel.find({ pin: pinNo, isEnable: true })
      .sort([["rating", "descending"]])
      .populate("foods");
    if (result) {
      let foodList = [];
      result.map((data) => {
        foodList.push(...data.foods);
      });

      return res.status(200).json({
        status: true,
        results: foodList.length,
        data: foodList,
        message: `got ${foodList.length} items `,
      });
    } else {
      return res.status(200).json({
        status: true,
        results: result.length,
        data: result,
        message: `got ${result.length} items `,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      results: 0,
      data: {},
      message: error.message,
    });
  }
};

//search foods

//food by resturent-id
export const foodById = async (req, res) => {
  const ID = req.params.id;

  try {
    console.log("calling food by id");
    const result = await VendorModel.find({ _id: ID, isEnable: true })
      .sort([["rating", "descending"]])
      .populate("foods");
    if (result) {
      return res.status(200).json({
        status: true,
        results: result.length,
        data: result,
        message: `got ${result.length} items `,
      });
    } else {
      return res.status(200).json({
        status: true,
        results: result.length,
        data: result,
        message: `got ${result.length} items `,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      results: 0,
      data: {},
      message: error.message,
    });
  }
};
