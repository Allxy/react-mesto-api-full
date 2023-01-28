import { Router } from 'express';
import { PAGE_NOT_FOUND } from '../utils/constants.js';
import cardsRouter from './cards.router.js';
import userRouter from './user.router.js';
import authRouter from './auth.router.js';
import auth from '../middlewares/auth.middleware.js';
import NotFoundError from '../utils/errors/NotFoundError.js';

const router = Router();

router.use('/', authRouter);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardsRouter);
router.use('*', (req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND)));

export default router;
