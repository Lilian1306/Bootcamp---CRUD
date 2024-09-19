import applyMiddlewares from "./index";
import express, {Application} from "express";


describe('applyMiddlewares', () => {
    test('Should not throw an error when applied to an Express app', () => {
      const app: Application = express();
  
      expect(() => applyMiddlewares(app)).not.toThrow();
    });
  });