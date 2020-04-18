import mongoose from 'mongoose';

const instrumentSchema = new mongoose.Schema({
  keyterms: { type: Array, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  instrumentImage: { type: String },
});

export default mongoose.model('instruments', instrumentSchema);
