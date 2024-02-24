import { FoodModel } from "../models/index.js"
class FoodRepository {


  //add food 
  async AddFood(name, desc, category, foodType, readyTime, price, vendorId, images) {
    const addRes = await FoodModel.create({
      name: name,
      desc: desc,
      category: category,
      foodType: foodType,
      readyTime: readyTime,
      price: price,
      vendorId: vendorId,
      images: images,
    });
    return addRes;
  }

  //get all foods 
  async GetAllFood() {
    const foodList = await FoodModel.find({});
    return foodList
  }

  //get foods of a specific vendor

  async GetFood(vendorID) {
    const foodList = await FoodModel.find({ vendorId: vendorID });
    return foodList
  }

  //delete food by Id

  async DeleteFood(foodID) {
    const deleteRes = await FoodModel.findOneAndDelete({ _id: foodID });
    return deleteRes;
  }

  //get food by Id

  async GetFoodById(foodID) {
    try {
      return await FoodModel.findOne({ _id: foodID });
    } catch (err) {
      console.log(err);
      console.log("error while checking vendor email address");
    }
  }

  //update Food
  
  async UpdateFood(name, foodId, desc, category, foodType, readyTime, price, images) {
    try {
      const foodInfo = await this.GetFoodById(foodId);
        foodInfo.name = name,
        foodInfo.desc = desc,
        foodInfo.category = category,
        foodInfo.foodType = foodType,
        foodInfo.readyTime = readyTime,
        foodInfo.price = price,
        foodInfo.images = images
      return await foodInfo.save();
    } catch (error) {
      console.log('Error while updating food')
      console.log(error)
    }


  }




}
export { FoodRepository }