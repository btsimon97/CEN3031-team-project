import mongoose from 'mongoose';

const instrumentSchema = new mongoose.Schema({
  name: {type: String, required: true},
  keyterms: { type: Array, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  instrumentImage: { type: String },
});

export default mongoose.model('instruments', instrumentSchema);
