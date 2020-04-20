import mongoose from 'mongoose';

const instrumentSchema = new mongoose.Schema({
  name: {type: String, required: true},
  keyterms: {type: Array, required: true},
  description: {type: String},
  createdAt: {
    type: Date,
    default: Date.now,
  },
  instrumentImage: { type: String },
});

export default mongoose.model('instruments', instrumentSchema);
