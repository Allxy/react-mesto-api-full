import CardModel from '../models/card.model.js';
import { CARD_NOT_FOUND, CREATED_CODE, NO_RIGHTS } from '../utils/constants.js';
import { ForbiddenError, NotFoundError } from '../utils/errors/index.js';

async function createCard(request, response, next) {
  try {
    let card = new CardModel({ ...request.body, owner: request.user._id });
    await card.save();
    card = await card.populate('owner likes');
    response.status(CREATED_CODE).send(card);
  } catch (error) {
    next(error);
  }
}

async function getAllCards(request, response, next) {
  try {
    const cards = await CardModel.find({}).populate('owner likes');
    response.send(cards);
  } catch (error) {
    next(error);
  }
}

async function deleteCard(request, response, next) {
  try {
    const card = await CardModel.findById(request.params.id).populate('owner likes');
    if (card === null) {
      throw new NotFoundError(CARD_NOT_FOUND);
    }
    if (card.owner.id !== request.user._id) {
      throw new ForbiddenError(NO_RIGHTS);
    }
    await card.delete();
    response.send(card);
  } catch (error) {
    next(error);
  }
}

async function toggleLike(action, request, response, next) {
  try {
    const card = await CardModel.findByIdAndUpdate(request.params.id, {
      [action]: { likes: request.user._id },
    }, {
      new: true,
      runValidators: true,
    }).populate('owner likes');
    if (card === null) {
      throw new NotFoundError(CARD_NOT_FOUND);
    }
    response.send(card);
  } catch (error) {
    next(error);
  }
}

function likeCard(request, response, next) {
  return toggleLike('$addToSet', request, response, next);
}

function dislikeCard(request, response, next) {
  return toggleLike('$pull', request, response, next);
}

export default {
  createCard,
  getAllCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
