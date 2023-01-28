import UserModel from '../models/user.model.js';
import { USER_NOT_FOUND } from '../utils/constants.js';
import { NotFoundError } from '../utils/errors/index.js';

async function getAllUsers(request, response, next) {
  try {
    const users = await UserModel.find({});
    response.send(users);
  } catch (error) {
    next(error);
  }
}

async function getUser(request, response, next) {
  try {
    const user = await UserModel.findById(request.params.id);
    if (user === null) {
      throw new NotFoundError(USER_NOT_FOUND);
    }
    response.send(user);
  } catch (error) {
    next(error);
  }
}

async function getMe(request, response, next) {
  try {
    const user = await UserModel.findById(request.user._id);
    if (user === null) {
      throw new NotFoundError(USER_NOT_FOUND);
    }
    response.send(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(request, response, next) {
  try {
    const user = await UserModel.findByIdAndUpdate(request.user._id, request.body, {
      new: true,
      runValidators: true,
    });
    if (user === null) {
      throw new NotFoundError(USER_NOT_FOUND);
    }
    response.send(user);
  } catch (error) {
    next(error);
  }
}

function updateAvatar(request, response, next) {
  const { avatar } = request.body;
  request.body = { avatar };
  return updateUser(request, response, next);
}

function updateInfo(request, response, next) {
  const { name, about } = request.body;
  request.body = { name, about };
  return updateUser(request, response, next);
}

export default {
  getAllUsers,
  getUser,
  updateInfo,
  updateAvatar,
  getMe,
};
