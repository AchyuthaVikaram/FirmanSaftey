import mongoose from 'mongoose';

const requestSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    status: {
      type: String,
      required: true,
      default: 'Initiated',
      enum: ['Initiated', 'Approved', 'Rejected', 'Delivered'],
    },
    // Additional fields for quote details
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model('Request', requestSchema);

export default Request;
