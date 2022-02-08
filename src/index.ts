import * as UTILS from './utils/initializer.utils.js';
import App from './app.js';

const CONSTANTS = UTILS.initConfigFile();

(async ()=>{
  await App.startServer(CONSTANTS);
})().catch(console.log);