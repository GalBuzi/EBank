import express, { Express } from 'express';
import morgan from 'morgan';
import log from '@ajar/marker';
import cors from 'cors';

class App {
  private readonly app: Express;

  constructor() {
    this.app = express();
  }

  initMiddleWares() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
  }

  initRouting() {}

  initErrorHandling() {}

  async startServer(port: number, host: string) {
    await this.app.listen(port, host);
    log.magenta(
      'api is live on',
      ` :sparkles: :zap:  http://${host}:${port} :sparkles: :zap:`,
    );
  }

  get appInstance() {
    return this.app;
  }
}
const instance = new App();
export default instance;
