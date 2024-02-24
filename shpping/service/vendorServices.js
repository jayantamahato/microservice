import { getSignature, FormattedData as FormattedData } from "../helper/index.js";
import { VendorRepository} from"../repository/vendor.js";
import { FoodRepository } from '../repository/foods.js';
import { validatePassword } from "../helper/index.js";

class VendorService {
  constructor() {
    this.vendorRepository = new VendorRepository();
    this.foodRepository = new FoodRepository();
  }

//check if vendor exist or not

  async ExistingVendor(email) {
    return await this.vendorRepository.existingVendor(email);
  }

//vendor login

  async Login(password, savedPassword, salt, id, name, email) {
    if (await validatePassword(password, savedPassword, salt)) {
      //validating password
      const payload = {
        _id: id,
        name: name,
        email: email,
      };
      const data = {
        name: name,
        id: id,
        email: email,
        token: await getSignature(payload),
      };
      return FormattedData(true, 1, data, "login success");
    } else {
      return FormattedData(false, 0, {}, "login failed");
    }
  }


  //vendor information

  async Info(email) {
    const vendor = await this.ExistingVendor(email); //checking is user exist or not

    if (vendor != null) {
      return FormattedData(true, 1, vendor, "authorized vendor");
    } else {
      return FormattedData(false, 0, {}, "vendor not found");
    }
  }

//update vendor information

  async Update(email, foodType, address, name, phone) {
    const vendor = await this.ExistingVendor(email);
    if (vendor != null) {
      vendor.name = name;
      vendor.address = address;
      vendor.phone = phone;
      vendor.foodType = foodType;
      const updateRes = await vendor.save();
      return FormattedData(true, updateRes.length, updateRes, 'successfully updated')

    } else {
      return FormattedData(false, 0, {}, " vendor not found")
    }

  }

//update vendor service

  async UpdateVendorService(email) {

    //checking user authentication
    const vendor = await this.ExistingVendor(email); //checking is user exist or not
    if (vendor !== null) {
      vendor.isEnable = !vendor.isEnable;
      const updateRes = await vendor.save();
      // console.log(FormattedData(true, 1, updateRes, "vendor service updated"))
      return FormattedData(true, 1, updateRes, "vendor service updated");
    } else {
      return FormattedData(false, 0, {}, "vendor not found");
    }

  }

//add a food 

  async AddFood(name, email, desc, category, foodType, readyTime, price, images) {
    const vendor = await this.ExistingVendor(email); //checking is user exist or not

    if (vendor !== null) {
      const addFoodRes = await this.foodRepository.AddFood(name, desc, category, foodType, readyTime, price, vendor._id, images)

      vendor.foods.push(addFoodRes);
      const vendorData = await vendor.save();
      if (vendorData) {
        return FormattedData(true, 1, vendorData, 'successfully food added')
      } else {
        return FormattedData(false, 0, vendorData, 'failed')
      }
    } else {
      return FormattedData(false, 0, vendorData, 'vendor not found')
    }
  }

//update a food

  async UpdateFood(foodId, name, desc, category, foodType, readyTime, price, image) {
    const vendor = await this.ExistingVendor(email)
    if (vendor == null) {
      return FormattedData(false, 0, {}, 'no vendor found')
    } else {
      const updateRes = await this.foodRepository.UpdateFood(name, foodId, desc, category, foodType, readyTime, price, image)

      return FormattedData(true, 1, updateRes, 'update success');
    }
  }

//get all foods

  async GetFoods(email) {

    const vendor = await this.ExistingVendor(email);

    if (vendor === null) {
      return FormattedData(false, 0, {}, 'vendor not found')

    } else {
      const foodList = await this.foodRepository.GetFood(vendor._id);

      if (foodList === null) {
        return FormattedData(false, 0, {}, 'no food found for this vendor')

      } else {
        return FormattedData(false, foodList.length, foodList, 'success')

      }
    }
  }

//delete food

  async DeleteFood(email, foodId) {

    const vendor = await this.ExistingVendor(email)
    if (vendor == null) {
      return FormattedData(false, 0, {}, 'no vendor found')
    } else {
      const deleteResult = await this.foodRepository.DeleteFood(foodId)
      if (deleteResult) {
        vendor.foods.pop(deleteResult);
        const foodDeleteData = await vendor.save();
        return FormattedData(true, foodDeleteData.length, foodDeleteData, 'successfully deleted')
      } else {
        return FormattedData(false, 0, {}, 'error')
      }
    }
  }

}
export    {VendorService} ;