import { Schema, model } from 'mongoose';

const SizeSchema = new Schema({
  name: { type: String, required: true, minLength: 3 },
  description: { type: String, required: true, maxLength: 300 },
});

SizeSchema.virtual('url').get(function () {
  return `/inventory/size/${this._id}`;
});

const Size = model('Size', SizeSchema);

export default Size;
