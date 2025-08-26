import mongoose from 'mongoose';

const industrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const Industry = mongoose.model('Industry', industrySchema);

export default Industry;
