import { Router } from 'express';
const router = Router();

router.get('/', function (req, res, next) {
  res.redirect('/inventory');
});

export default router;
