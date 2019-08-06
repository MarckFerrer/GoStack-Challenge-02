// Here is where the express library is imported
import express from 'express';
import path from 'path';
// Here the routes are imported from the files 'routes.js', which is inside the src folder
import routes from './routes';

import './database';
/* The class app is the main class here and the responsible for starting the methods listed
  bellow and running the codes
*/
class App {
  constructor() {
    // Attributes the 'express()' const to the server variable
    this.server = express();
    // invokes the 'middlewares()' function
    this.middlewares();
    // Invokes the routes function
    this.routes();
  }

  // The 'middlewares()' function allow the use of 'json()' in the application
  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  /* The 'routes()' function allow the use of the const 'routes', which was imported at
    the beginning of the application
  */
  routes() {
    this.server.use(routes);
  }
}
// The 'app.js' file will exports the app function as server
export default new App().server;
