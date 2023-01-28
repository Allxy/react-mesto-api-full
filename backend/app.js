import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errors as celebrateErrorHandler } from 'celebrate';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes/index.js';
import requestLogger from './middlewares/reqlog.middleware.js';
import limiter from './middlewares/limiter.middleware.js';
import logger from './utils/logger.js';
import errorHandler from './middlewares/error.middleware.js';
import errorLog from './middlewares/errlog.middleware.js';

dotenv.config();
const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/mestodb';
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'devjwtmesto';
}

const whitelist = ['https://testo-mesto.nomoredomainsclub.ru', 'http://localhost:3000'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

async function start() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGODB_URL);
    logger.info('Success connection to database.');

    const app = express();
    app.use(requestLogger);
    app.use(limiter);
    app.use(helmet());
    app.use(json());
    app.use(cors(corsOptions));

    app.get('/crash-test', () => {
      setTimeout(() => {
        throw new Error('Сервер сейчас упадёт');
      }, 0);
    });

    app.use('/', router);
    app.use(errorLog);
    app.use(celebrateErrorHandler());
    app.use(errorHandler);

    app.listen(PORT, () => {
      logger.info(`Server starts at port ${PORT}`);
    });
  } catch (error) {
    logger.error(error.message);
  }
}

start();
