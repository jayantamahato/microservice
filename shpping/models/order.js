import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    items: [{
      type:mongoose.Schema.ObjectId,
      ref:'food'
    }],
    shipping_address: { type: [String], required: true },
    customerId: { type: String, required: true },
    paymentMood: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    orderStatus: { type: String, required: true },
    total_price: { type: Number, required: true },
    tax: { type: Number, required: true },
    packaging_charges: { type: Number, required: true },
    delivery_charges: { type: Number, required: true },
    discount: { type: Number, required: true },
    payablePrice: { type: Number, required: true },
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

const OrderModel = mongoose.model('order',orderSchema)
export{OrderModel}
