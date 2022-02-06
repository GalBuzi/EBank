import * as UTILS from './utils/initializer.utils.js';
import App from './app.js';

const CONSTANTS = UTILS.initConfigFile();
App.startServer(CONSTANTS);
