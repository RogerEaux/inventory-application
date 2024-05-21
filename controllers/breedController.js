import Breed from '../models/breed.js';
import asyncHandler from 'express-async-handler';

export const breedList = asyncHandler(async (req, res, next) => {
  const breedList = await Breed.find({}).exec();

  res.render('breed/breedList', { breedList });
});

export const breedDetail = asyncHandler(async (req, res, next) => {
  res.send(
    `We get to it when we get to it! - Breed Detail for ${req.params.id}`
  );
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
