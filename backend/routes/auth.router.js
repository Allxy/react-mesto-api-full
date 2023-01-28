import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';

const router = Router();

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), AuthController.signin);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    about: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().uri({
      scheme: [
        'http',
        'https',
      ],
    }),
  }),
}), AuthController.signup);

export default router;
