import Size from '../models/size.js';
import Breed from '../models/breed.js';
import Dog from '../models/dog.js';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import upload from '../utils/multer.js';
import cloudUpload from '../utils/cloudinary.js';
import fs from 'fs/promises';

const breedValidation = [
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

export const breedList = asyncHandler(async (req, res, next) => {
  const breedList = await Breed.find({}, 'name img_url')
    .sort({ name: 1 })
    .exec();

  res.render('breed/breedList', { breedList });
});

export const breedDetail = asyncHandler(async (req, res, next) => {
  const [breed, breedDogs] = await Promise.all([
    Breed.findById(req.params.id).populate('size').exec(),
    Dog.find({ breed: req.params.id }, 'name img_url'),
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
  upload.single('img'),

  ...breedValidation,

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    let imgURL;

    if (req.file) {
      if (req.body.password === process.env.PASSWORD) {
        imgURL = await cloudUpload(req.file.path);
      } else {
        imgURL =
          'https://res.cloudinary.com/dyoh1algd/image/upload/v1716599228/dog_egrxor.svg';
      }
      await fs.unlink(req.file.path);
    } else {
      imgURL =
        'https://res.cloudinary.com/dyoh1algd/image/upload/v1716599228/dog_egrxor.svg';
    }

    const breed = new Breed({
      name: req.body.name,
      description: req.body.description,
      size: req.body.size,
      life_expectancy: req.body.lifeExpectancy,
      img_url: imgURL,
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
  const [breed, breedDogs] = await Promise.all([
    Breed.findById(req.params.id).populate('size').exec(),
    Dog.find({ breed: req.params.id }, 'name').sort({ name: 1 }).exec(),
  ]);

  if (!breed) {
    res.redirect('/inventory/breeds');
  }

  res.render('breed/breedDelete', { breed, breedDogs, errors: null });
});

export const breedDeletePost = [
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
      const [breed, breedDogs] = await Promise.all([
        Breed.findById(req.params.id).populate('size').exec(),
        Dog.find({ breed: req.params.id }, 'name').sort({ name: 1 }).exec(),
      ]);

      res.render('breed/breedDelete', {
        breed,
        breedDogs,
        errors: errors.array(),
      });
    } else {
      await Breed.findByIdAndDelete(req.body.breedID).exec();
      await Dog.deleteMany({ breed: req.body.breedID }).exec();
      res.redirect('/inventory/breeds');
    }
  }),
];

export const breedUpdateGet = asyncHandler(async (req, res, next) => {
  const [breed, sizes] = await Promise.all([
    Breed.findById(req.params.id).exec(),
    Size.find({}, 'name').exec(),
  ]);

  if (!breed) {
    const err = new Error('Breed not found');
    err.status = 404;
    return next(err);
  }

  res.render('breed/breedForm', {
    title: 'Update Breed',
    sizes,
    breed,
    errors: null,
  });
});

export const breedUpdatePost = [
  upload.single('img'),

  ...breedValidation,

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    let imgURL;

    if (req.file) {
      if (req.body.password === process.env.PASSWORD) {
        imgURL = await cloudUpload(req.file.path);
      } else {
        imgURL = breed.img_url;
      }
      await fs.unlink(req.file.path);
    } else {
      const breed = await Breed.findById(req.params.id, 'img_url').exec();
      imgURL = breed.img_url;
    }

    const breed = new Breed({
      name: req.body.name,
      description: req.body.description,
      size: req.body.size,
      life_expectancy: req.body.lifeExpectancy,
      img_url: imgURL,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const sizes = await Size.find({}, 'name').exec();

      res.render('breed/breedForm', {
        title: 'Update Breed',
        sizes,
        breed,
        errors: errors.array(),
      });
    } else {
      await Breed.findByIdAndUpdate(req.params.id, breed);
      res.redirect(breed.url);
    }
  }),
];
