import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import { AUTH_ERROR, CREATED_CODE, USER_EXISTS } from '../utils/constants.js';
import { ConflictError, UnauthorizedError } from '../utils/errors/index.js';

async function signup(request, response, next) {
  try {
    let { email, password } = request.body;
    email = email.toLowerCase();

    const checkUser = await UserModel.findOne({ email });
    if (checkUser !== null) {
      throw new ConflictError(USER_EXISTS);
    }

    password = await bcrypt.hash(password, 10);

    const user = await UserModel.create({ ...request.body, password });
    response.status(CREATED_CODE).send(user.toObject({
      transform: (doc, res) => {
        delete res.password;
        return res;
      },
    }));
  } catch (error) {
    next(error);
  }
}

async function signin(request, response, next) {
  try {
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email }).select('+password');
    if (user === null || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError(AUTH_ERROR);
    }

    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);

    response.send({ token });
  } catch (error) {
    next(error);
  }
}

export default {
  signup,
  signin,
};
