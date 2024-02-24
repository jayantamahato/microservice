import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        desc: { type: String },
        images: { type: [String] },
        price: { type: Number, required: true },
        rating: { type: Object },
        stock: { type: Number },
        vendor: { type: Object },
        readyTime: { type: Number },
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

const ProductModel = mongoose.model("products", ProductSchema);
export { ProductModel };
