import mongoose, { Schema } from "mongoose";

const vendorSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    pin: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    ownerName: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    foodType: { type: [String] },
    rating: { type: Number },
    coverImages: { type: [String] },
    vendorImage: { type: String },
    isEnable: { type: Boolean, required: true },
      foods:[{
        type:mongoose.Schema.ObjectId,
        ref:'food'
      }]
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password, delete ret.salt,delete ret.createdAt,delete ret.updatedAt,delete ret.__v;
      },
    },

    timestamps: true,
  }
);

const VendorModel = mongoose.model("vendor", vendorSchema);
export { VendorModel };
