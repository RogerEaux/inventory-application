import mongoose from 'mongoose';

const BreedSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 500 },
  size: { type: mongoose.Schema.Types.ObjectId, ref: 'Size', required: true },
  life_expectancy: { type: Number, required: true },
});

BreedSchema.virtual('url').get(function () {
  return `/inventory/breed/${this._id}`;
});

const Breed = mongoose.model('Breed', BreedSchema);

export default Breed;
