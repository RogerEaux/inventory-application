import mongoose, { Schema } from 'mongoose';

const BreedSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 300 },
  size: { type: mongoose.Schema.Types.ObjectId, ref: 'Size', required: true },
  life_expectancy: { type: Number, required: true },
});

BreedSchema.virtual('url').get(function () {
  return `/inventory/breed/${this.name}`;
});

const Breed = mongoose.model('Breed', BreedSchema);

export default Breed;
