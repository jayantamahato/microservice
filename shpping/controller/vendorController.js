import { FormattedData } from "../helper/dataFormat.js";
import { VendorService } from "../service/vendorServices.js";

class VendorController {
  constructor() {
    this.service = new VendorService();
  }

  // vendor login
  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const vendor = await this.service.ExistingVendor(email);
      if (vendor != null) {
        const data = await this.service.Login(
          password,
          vendor.password,
          vendor.salt,
          vendor._id,
          vendor.name,
          vendor.email
        );

        return res.status(200).json(data);
      } else
        return res
          .status(401)
          .json(FormattedData(false, 0, {}, "vendor not found"));
    } catch (error) {
      return res.status(500).json(FormattedData(false, 0, {}, `${error.message}`));
    }
  };

  //vendor profile
  profile = async (req, res) => {
    try {
      if (req.user) {
        const vendorInfo = this.service.Info(req.user.email);
        return res.status(200).json(vendorInfo);

      } else {
        return res.status(401).json(FormattedData(false, 0, {}, "unauthorized vendor"));
      }
    } catch (error) {
      return res.status(500).json(FormattedData(false, 0, {}, `${error.message}`));
    }
  };

  //edit vendor profile
  updateProfile = async (req, res) => {
    const { foodType, address, name, phone } = req.body;

    try {
      if (req.user) {
        const updateRes = await this.service.Update(req.user.email, foodType, address, name, phone)
        return res.status(200).json(updateRes);

      } else {
        return res.status(401).json(FormattedData(false, 0, {}, "unauthorized vendor"));
      }
    } catch (error) {
      return res.status(500).json(FormattedData(false, 0, {}, `${error.message}`));
    }
  };

  //update vendor service
  updateService = async (req, res) => {
    try {
      if (req.user) {

        const serviceUpdateRes = await this.service.UpdateVendorService(req.user.email);

        return res.status(200).json(serviceUpdateRes);

      } else {
        return res.status(401).json(FormattedData(false, 0, {}, "unauthorized vendor"));
      }
    } catch (error) {
      return res.status(500).json(FormattedData(false, 0, {}, `${error.message}`));
    }
  };

  //add food

  addFood = async (req, res) => {
    const { name, desc, category, foodType, readyTime, price } = req.body;

    try {
      if (req.user) {
        const file = req.files;
        var images = file.map((element) => element.path);
        const foodAddRes = await this.service.AddFood(name, req.user.email, desc, category, foodType, readyTime, price, images);
        return res.status(200).json(foodAddRes);

      } else {
        return res.status(400).json(FormattedData(false, 0, {}, "unauthorized vendor"));
      }
    } catch (error) {
      return res.status(500).json(FormattedData(false, 0, {}, "Internal error"));

    }
  };

  //edit food 
  editFood = async (req, res) => {

  }

  //get foods

  getFoods = async (req, res) => {
    try {
      const foods = await this.service.GetFoods(req.user.email)
      return res.status(200).json(foods);
      // return resp.successHandler(foods)
    } catch (error) {
      return res.status(500).json(FormattedData(false, 0, {}, "Internal error"));
    }
  };

  //delete food

  deleteFood = async (req, res) => {
    try {
      const foodId = req.params.id;
      const vendorEmail = req.user.email;
      const deleteRes = await this.service.DeleteFood(vendorEmail, foodId);
      return res.status(200).json(deleteRes);

    } catch (error) {
      return res.status(500).json(FormattedData(false, 0, {}, "Internal error"));
    }
  };
}
export { VendorController };

