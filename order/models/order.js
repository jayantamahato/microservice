import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [Object]
    },
    shipping_address: { type: [String], required: true },
    customerId: { type: String, required: true },
    vendorId: { type: String, required: true },
    paymentMood: { type: String, required: true },
    paymentStatus: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING', required: true },
    orderStatus: { type: String, enum: ['PENDING', 'ACCEPTED', 'PROCESSING', 'DISPATCH', 'REJECTED'], default: 'PENDING', required: true },
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

const OrderModel = mongoose.model('order', orderSchema)
export default OrderModel;
