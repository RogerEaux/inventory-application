import { Schema, model } from 'mongoose';

const DogSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  breed: { type: Schema.Types.ObjectId, ref: 'Breed', required: true },
  age: { type: Number },
  weight: { type: Number },
  height: { type: Number },
  img_url: { type: String, required: true },
});

DogSchema.virtual('url').get(function () {
  return `/inventory/dog/${this._id}`;
});

const Dog = model('Dog', DogSchema);

export default Dog;
