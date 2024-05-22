import Size from '../models/size.js';
import Breed from '../models/breed.js';
import Dog from '../models/dog.js';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

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
  const sizes = await Size.find({}, 'name').exec();

  res.render('breed/breedForm', {
    title: 'Create Breed',
    sizes,
    breed: null,
    errors: null,
  });
});

export const breedCreatePost = [
  body('name')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('Name must not be empty')
    .isLength({ max: 100 })
    .withMessage('Name must be less than 100 characters'),

  body('description')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('Description must not be empty')
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters'),

  body('size', 'Size must not be empty').trim().notEmpty().escape(),

  body('lifeExpectancy')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('Life expectancy must not be empty')
    .isNumeric({ min: 0 })
    .withMessage('Life expectancy must be a number greater than 0'),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const breed = new Breed({
      name: req.body.name,
      description: req.body.description,
      size: req.body.size,
      life_expectancy: req.body.lifeExpectancy,
    });

    if (!errors.isEmpty()) {
      const sizes = await Size.find({}, 'name').exec();

      res.render('breed/breedForm', {
        title: 'Create Breed',
        sizes,
        breed,
        errors: errors.array(),
      });
    } else {
      await breed.save();
      res.redirect(breed.url);
    }
  }),
];

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
