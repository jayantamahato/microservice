import { VendorModel } from "../models/index.js";

class VendorRepository {
  //existing Vendor
  async existingVendor(email) {
    try {
      return await VendorModel.findOne({ email: email });
    } catch (err) {
      console.log(err);
      console.log("error while checking vendor email address");
    }
  }

//get all vendors 

async getAllVendors(){
  try {
    return await VendorModel.find({});
  } catch (err) {
    console.log(err);
    console.log("error while fetching vendors");
  }
}

  // vendor login

  async vendorLogin() { }

  //delete vendor

  async deleteVendor() { }

//add food 
async addFood(){

}
async UpdateVendor(email){
  try {
   const vendor =  exsistingVendor(email);


  } catch (err) {
    console.log(err);
    console.log("error while updating vendor");
  }
}


}
export { VendorRepository };
