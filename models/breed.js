import { Schema, model } from 'mongoose';

const BreedSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 500 },
  size: { type: Schema.Types.ObjectId, ref: 'Size', required: true },
  life_expectancy: { type: Number, required: true },
  img_url: { type: String, required: true },
});

BreedSchema.virtual('url').get(function () {
  return `/inventory/breed/${this._id}`;
});

const Breed = model('Breed', BreedSchema);

export default Breed;
