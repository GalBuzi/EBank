import express, { Express } from 'express';
import morgan from 'morgan';
import log from '@ajar/marker';
import cors from 'cors';
import accountRouter from './routers/account.routers.js';
import * as ErrorsMiddlwewares from './middleware/errors.middleware.js';
class App {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.initMiddleWares();
    this.initRouting();
    this.initErrorHandling();
  }

  initMiddleWares() : void {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
  }

  initRouting() : void{
    this.app.use('/account', accountRouter.router);
  }

  initErrorHandling() : void {
    this.app.use(ErrorsMiddlwewares.NotFound);
    this.app.use(ErrorsMiddlwewares.logHttpError);
    this.app.use(ErrorsMiddlwewares.ErrorResponse);
  }

  startServer(port: number, host: string) : void {
    this.app.listen(port, host);
    log.magenta(
      'api is live on',
      ` :sparkles: :zap:  http://${host}:${port} :sparkles: :zap:`,
    );
  }

  get appInstance() : Express{
    return this.app;
  }
}
const instance = new App();
export default instance;
