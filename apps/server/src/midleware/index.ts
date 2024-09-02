import { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const applyMiddlewares = (app: Application): void => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
};

export default applyMiddlewares;