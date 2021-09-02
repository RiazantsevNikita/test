import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {IController} from './controllers/types';

export default class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: Array<IController>, port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: Array<IController>) {
    // remove for prod
    // this.app.use('/static', express.static(path.join(__dirname, '../static')));
    // this.app.use('/dist', express.static(path.join(__dirname, '../dist')));
    controllers.forEach((controller: IController) => {
      this.app.use('', controller.router);
    });
    this.app.use(function (req, res) {
      res.status(404).send(req.url + " Not Found");
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
