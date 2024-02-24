import mongoose, { Schema } from "mongoose";

const FoodSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    desc: { type: String },
    vendorId: { type: String },
    readyTime: { type: Number },
    images: { type: [String] },
    price: { type: Number, required: true },
    rating: { type: Number },
    stock: { type: Number },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v, delete ret.createdAt, delete ret.updatedAt;
      },
    },

    timestamps: true,
  }
);

const FoodModel = mongoose.model("food",FoodSchema)
export {FoodModel};