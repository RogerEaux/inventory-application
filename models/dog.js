import mongoose from 'mongoose';

const DogSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 100 },
  breed: { type: mongoose.Schema.Types.ObjectId, ref: 'Breed', require: true },
  age: { type: Number },
  weigth: { type: Number },
  height: { type: Number },
});

DogSchema.virtual('url').get(function () {
  return `/invevntory/dog/${this._id}`;
});

const Dog = mongoose.model('Dog', DogSchema);

export default Dog;
