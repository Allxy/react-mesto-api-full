import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import CardsController from '../controllers/cards.controller.js';

const router = Router();

const objectIDvalidator = celebrate({
  params: {
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  },
});

router.get('', CardsController.getAllCards);
router.delete('/:id', objectIDvalidator, CardsController.deleteCard);
router.post('', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri().regex(/^https?:\/\//i),
  }),
}), CardsController.createCard);
router.put('/:id/likes', objectIDvalidator, CardsController.likeCard);
router.delete('/:id/likes', objectIDvalidator, CardsController.dislikeCard);

export default router;
