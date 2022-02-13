import express, { Express } from 'express';
import morgan from 'morgan';
import log from '@ajar/marker';
import cors from 'cors';
import accountRouter from './routers/account.routers.js';
import * as ErrorsMiddlwewares from './middleware/errors.middleware.js';
import * as Loggers from './middleware/loggers.middleware.js';
import { connect } from './utils/initializer.utils.js';
import { ConfigJson } from '../typings.js';
import { logHttpRequestMW } from './middleware/loggers.middleware.js';
import { addIDToRequest } from './middleware/req.middleware.js';


class App {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.initMiddleWares();
    this.initRouting();
    this.initErrorHandling();
  }

  initMiddleWares(): void {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    //add id to every request
    this.app.use(addIDToRequest);
    //add request logger
    this.app.use(logHttpRequestMW(process.cwd() + '/httpError.log'));

  }

  initRouting(): void {
    this.app.use('/account', accountRouter.router);
  }

  initErrorHandling(): void {
    this.app.use(ErrorsMiddlwewares.NotFound);
    this.app.use(Loggers.logHttpError(process.cwd() + '/httpError.log'));
    this.app.use(ErrorsMiddlwewares.ErrorResponse);
  }

  async startServer(constants: ConfigJson): Promise<void> {
    await connect(constants);
    this.app.listen(constants.PORT, constants.HOST);
    log.magenta('api is live on', `http://${constants.HOST}:${constants.PORT}`);
  }

  get appInstance(): Express {
    return this.app;
  }
}
const instance = new App();
export default instance;
