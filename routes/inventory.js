import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import Size from '../models/size.js';
import Breed from '../models/breed.js';
import Dog from '../models/dog.js';
import * as sizeController from '../controllers/sizeController.js';
import * as breedController from '../controllers/breedController.js';
import * as dogController from '../controllers/dogController.js';

const router = Router();

// Index Route

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const [sizes, breeds, dogs] = await Promise.all([
      Size.find({}, 'name').exec(),
      Breed.find({}, 'name').exec(),
      Dog.find({}, 'name').exec(),
    ]);

    res.render('index', { title: 'Catadog', sizes, breeds, dogs });
  })
);

// Size Routes

router.get('/size/:id', sizeController.sizeDetail);
router.get('/sizes', sizeController.sizeList);

// Breed Routes

router.get('/breed/create', breedController.breedCreateGet);
router.post('/breed/create', breedController.breedCreatePost);

router.get('/breed/:id/delete', breedController.breedDeleteGet);
router.post('/breed/:id/delete', breedController.breedDeletePost);

router.get('/breed/:id/update', breedController.breedUpdateGet);
router.post('/breed/:id/update', breedController.breedUpdatePost);

router.get('/breed/:id', breedController.breedDetail);
router.get('/breeds', breedController.breedList);

// Dog Routes

router.get('/dog/create', dogController.dogCreateGet);
router.post('/dog/create', dogController.dogCreatePost);

router.get('/dog/:id/delete', dogController.dogDeleteGet);
router.post('/dog/:id/delete', dogController.dogDeletePost);

router.get('/dog/:id/update', dogController.dogUpdateGet);
router.post('/dog/:id/update', dogController.dogUpdatePost);

router.get('/dog/:id', dogController.dogDetail);
router.get('/dogs', dogController.dogList);

export default router;
