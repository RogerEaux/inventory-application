import Breed from '../models/breed.js';
import Dog from '../models/dog.js';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

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
  const breeds = await Breed.find({}, 'name').sort({ name: 1 }).exec();

  res.render('dog/dogForm', {
    title: 'Create Dog',
    breeds,
    dog: null,
    errors: null,
  });
});

export const dogCreatePost = [
  body('name', 'Name must not be empty').trim().notEmpty().escape(),

  body('breed', 'Breed must not be empty').trim().notEmpty().escape(),

  body('age')
    .optional({ values: 'falsy' })
    .trim()
    .notEmpty()
    .escape()
    .withMessage('Age must not be empty')
    .isNumeric({ min: 0 })
    .withMessage('Age must be a number greater than 0'),

  body('weight')
    .optional({ values: 'falsy' })
    .trim()
    .notEmpty()
    .escape()
    .withMessage('Weight must not be empty')
    .isNumeric({ min: 0 })
    .withMessage('Weight must be a number greater than 0'),

  body('height')
    .optional({ values: 'falsy' })
    .trim()
    .notEmpty()
    .escape()
    .withMessage('Height must not be empty')
    .isNumeric({ min: 0 })
    .withMessage('Height must be a number greater than 0'),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newDog = {
      name: req.body.name,
      breed: req.body.breed,
    };

    req.body.age ? (newDog.age = req.body.age) : null;
    req.body.weight ? (newDog.weight = req.body.weight) : null;
    req.body.height ? (newDog.height = req.body.height) : null;

    const dog = new Dog(newDog);

    if (!errors.isEmpty()) {
      const breeds = await Breed.find({}, 'name').sort({ name: 1 }).exec();

      res.render('dog/dogForm', {
        title: 'Create Dog',
        breeds,
        dog,
        errors: errors.array(),
      });
    } else {
      await dog.save();
      res.redirect(dog.url);
    }
  }),
];

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
