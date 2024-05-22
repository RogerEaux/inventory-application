import Breed from '../models/breed.js';
import Size from '../models/size.js';
import asyncHandler from 'express-async-handler';

export const sizeList = asyncHandler(async (req, res, next) => {
  const sizeList = await Size.find({}, 'name').exec();

  res.render('size/sizeList', { sizeList });
});

export const sizeDetail = asyncHandler(async (req, res, next) => {
  const [size, sizeBreeds] = await Promise.all([
    Size.findById(req.params.id).exec(),
    Breed.find({ size: req.params.id }, 'name'),
  ]);

  if (size === null) {
    const err = new Error('Size not found');
    err.status = 404;
    return next(err);
  }

  res.render('size/sizeDetail', { size, sizeBreeds });
});
