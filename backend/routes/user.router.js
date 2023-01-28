import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import UsersController from '../controllers/user.controller.js';

const router = Router();

const objectIDvalidator = celebrate({
  params: {
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  },
});

router.get('', UsersController.getAllUsers);
router.get('/me', UsersController.getMe);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    about: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
  }),
}), UsersController.updateInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri({
      scheme: [
        'http',
        'https',
      ],
    }),
  }),
}), UsersController.updateAvatar);
router.get('/:id', objectIDvalidator, UsersController.getUser);

export default router;
