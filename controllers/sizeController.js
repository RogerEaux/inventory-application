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

export const sizeCreateGet = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Size Create Get');
});

export const sizeCreatePost = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Size Create Post');
});

export const sizeDeleteGet = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Size Delete Get');
});

export const sizeDeletePost = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Size Delete Post');
});

export const sizeUpdateGet = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Size Update Get');
});

export const sizeUpdatePost = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Size Update Post');
});
