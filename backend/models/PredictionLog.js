import mongoose from 'mongoose';

const predictionLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['soil', 'weather', 'crop'], required: true },
    inputs: { type: mongoose.Schema.Types.Mixed, required: true },
    outputs: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('PredictionLog', predictionLogSchema);
