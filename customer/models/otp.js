import mongoose,{Schema} from "mongoose";

const OtpSchema = new Schema({
    mobile:{type:String,required:true},
    otp:{type:String,required:true},
    otp_exp:{type:Number,required:true},
    verified:{type:Boolean,required:true},
})
const OtpModel = mongoose.model('otp',OtpSchema);
export {OtpModel}