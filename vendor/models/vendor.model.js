import mongoose, { Schema } from 'mongoose'

const vendorSchema = new Schema(
	{
		name: { type: String, required: true },
		address: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		ownerName: { type: String, required: true },
		password: { type: String, required: true },
		salt: { type: String, required: true },
		shopType: { type: String },
		rating: { type: Number },
		coverImages: { type: [String] },
		ownerImage: { type: String, default: 'https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0' },
		isEnable: { type: Boolean, required: true },
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret.password, delete ret.salt, delete ret.createdAt, delete ret.updatedAt, delete ret.__v
			},
		},

		timestamps: true,
	}
)

const VendorModel = mongoose.model('vendor', vendorSchema)
export { VendorModel }
