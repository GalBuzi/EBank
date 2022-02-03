import express, { Express } from 'express';
import morgan from 'morgan';
import log from '@ajar/marker';
import cors from 'cors';

class App {
  private readonly app: Express;

  constructor() {
    this.app = express();
  }

  initMiddleWares() : void {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
  }

  initRouting() : void{}

  initErrorHandling() : void {}

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
