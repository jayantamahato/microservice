import mongoose,{Schema} from "mongoose";

const cartSchema = new Schema({
customerId:{type:String,required:true},
items:{type:[Object]},
cartPrice:{type:String,required:true},
tax:{type:String,required:true},
deliveryCharges:{type:String,required:true},
discount:{type:String,required:true},
payablePrice:{type:String,required:true}
},{timestamps: true,});

const CartModel = mongoose.model("cart",cartSchema);






export {CartModel}