import Breed from '../models/breed.js';
import Dog from '../models/dog.js';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import upload from '../utils/multer.js';
import cloudUpload from '../utils/cloudinary.js';
import fs from 'fs/promises';

const dogValidation = [
  body('name')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('Name must not be empty')
    .isLength({ max: 100 })
    .withMessage('Name must be less than 100 characters'),

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

  body('password')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('Password must be provided')
    .custom((value) => {
      console.log(value);
      if (value !== process.env.PASSWORD) {
        throw new Error('Incorrect password');
      } else {
        return value;
      }
    }),
];

export const dogList = asyncHandler(async (req, res, next) => {
  const dogList = await Dog.find({}, 'name img_url').sort({ name: 1 }).exec();

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
  upload.single('img'),

  ...dogValidation,

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    let imgURL =
      'https://res.cloudinary.com/dyoh1algd/image/upload/v1716599228/dog_egrxor.svg';

    if (req.file) {
      if (req.body.password === process.env.PASSWORD) {
        imgURL = await cloudUpload(req.file.path);
      }
      await fs.unlink(req.file.path);
    }

    const newDog = {
      name: req.body.name,
      breed: req.body.breed,
      img_url: imgURL,
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
  const dog = await Dog.findById(req.params.id).populate('breed').exec();

  if (!dog) {
    res.redirect('/inventory/dogs');
  }

  res.render('dog/dogDelete', { dog, errors: null });
});

export const dogDeletePost = [
  body('password')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('Password must be provided')
    .custom((value) => {
      console.log(value);
      if (value !== process.env.PASSWORD) {
        throw new Error('Incorrect password');
      } else {
        return value;
      }
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const dog = await Dog.findById(req.params.id).populate('breed').exec();

      res.render('dog/dogDelete', {
        dog,
        errors: errors.array(),
      });
    } else {
      await Dog.findByIdAndDelete(req.body.dogID).exec();
      res.redirect('/inventory/dogs');
    }
  }),
];

export const dogUpdateGet = asyncHandler(async (req, res, next) => {
  const [dog, breeds] = await Promise.all([
    Dog.findById(req.params.id).exec(),
    Breed.find({}, 'name').sort({ name: 1 }).exec(),
  ]);

  if (!dog) {
    const err = new Error('Dog not found');
    err.status = 404;
    return next(err);
  }

  res.render('dog/dogForm', { title: 'Update Dog', breeds, dog, errors: null });
});

export const dogUpdatePost = [
  upload.single('img'),

  ...dogValidation,

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    let imgURL = await Dog.findById(req.params.id, 'img_url').exec().img_url;

    if (req.file) {
      if (req.body.password === process.env.PASSWORD) {
        imgURL = await cloudUpload(req.file.path);
      }
      await fs.unlink(req.file.path);
    }

    const newDog = {
      name: req.body.name,
      breed: req.body.breed,
      img_url: imgURL,
      _id: req.params.id,
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
      await Dog.findByIdAndUpdate(req.params.id, dog);
      res.redirect(dog.url);
    }
  }),
];
