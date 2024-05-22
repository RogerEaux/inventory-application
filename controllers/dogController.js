import Dog from '../models/dog.js';
import asyncHandler from 'express-async-handler';

export const dogList = asyncHandler(async (req, res, next) => {
  const dogList = await Dog.find({}, 'name').sort({ name: 1 }).exec();

  res.render('dog/dogList', { dogList });
});

export const dogDetail = asyncHandler(async (req, res, next) => {
  const dog = await Dog.findById(req.params.id).populate('breed').exec();

  if (dog === null) {
    const err = new Error('Dog not found');
    err.status = 404;
    return next(err);
  }

  res.render('dog/dogDetail', { dog });
});

export const dogCreateGet = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Dog Create Get');
});

export const dogCreatePost = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Dog Create Post');
});

export const dogDeleteGet = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Dog Delete Get');
});

export const dogDeletePost = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Dog Delete Post');
});

export const dogUpdateGet = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Dog Update Get');
});

export const dogUpdatePost = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Dog Update Post');
});
