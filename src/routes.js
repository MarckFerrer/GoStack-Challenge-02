// The 'Router' method is imported from 'express' and it'll allow http connections
import { Router } from 'express';

import UserController from './app/controllers/UserController';

// The const 'routes' will be initialized as a Router()
const routes = new Router();

routes.post('/users', UserController.store);

export default routes;
