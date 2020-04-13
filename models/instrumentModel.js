import mongoose from 'mongoose';

const instrumentSchema = new mongoose.Schema({
  keyterms: { type: Array, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('instruments', instrumentSchema);
