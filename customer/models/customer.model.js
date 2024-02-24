import mongoose, { Schema } from "mongoose";

const CustomerSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    memberShip: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    isVerified: { type: Boolean },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    isLogedIn: { type: Boolean, required: true },
    address: { type: [Object] }
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password,
          delete ret.salt,
          delete ret.createdAt,
          delete ret.updatedAt,
          delete ret.__v;
      },
    },

    timestamps: true,
  }
);

const CustomerModel = mongoose.model("Customer", CustomerSchema);
export { CustomerModel };
