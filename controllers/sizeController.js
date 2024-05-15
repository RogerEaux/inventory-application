import Size from '../models/size.js';
import asyncHandler from 'express-async-handler';

export const sizeList = asyncHandler(async (req, res, next) => {
  res.send('We get to it when we get to it! - Size List');
});

export const sizeDetail = asyncHandler(async (req, res, next) => {
  res.send(
    `We get to it when we get to it! - Size Detail for ${req.params.id}`
  );
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
