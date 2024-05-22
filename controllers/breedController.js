import Breed from '../models/breed.js';
import Dog from '../models/dog.js';
import asyncHandler from 'express-async-handler';

export const breedList = asyncHandler(async (req, res, next) => {
  const breedList = await Breed.find({}, 'name').sort({ name: 1 }).exec();

  res.render('breed/breedList', { breedList });
});

export const breedDetail = asyncHandler(async (req, res, next) => {
  const [breed, breedDogs] = await Promise.all([
    Breed.findById(req.params.id).populate('size').exec(),
    Dog.find({ breed: req.params.id }, 'name'),
  ]);

  if (breed === null) {
    const err = new Error('Breed not found');
    err.status = 404;
    return next(err);
  }

  res.render('breed/breedDetail', { breed, breedDogs });
});

export const breedCreateGet = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Breed Create Get');
});

export const breedCreatePost = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Breed Create Post');
});

export const breedDeleteGet = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Breed Delete Get');
});

export const breedDeletePost = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Breed Delete Post');
});

export const breedUpdateGet = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Breed Update Get');
});

export const breedUpdatePost = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Breed Update Post');
});
