import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    eligibilityCriteria: { type: String, required: true },
    benefits: { type: String, required: true },
    applyLink: { type: String, required: true },
    category: { type: String, default: 'General' },
  },
  { timestamps: true }
);

export default mongoose.model('Scheme', schemeSchema);
