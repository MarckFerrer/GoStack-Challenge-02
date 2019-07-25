// The 'Router' method is imported from 'express' and it'll allow http connections
import { Router } from 'express';

// The imports bellow are responsible for calling a file compatible with the route
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
// The 'authMiddleware' will check the unique token and will say if it's valid or not.
import authMiddleware from './app/middlewares/auth';

// The const 'routes' will be initialized as a Router()
const routes = new Router();

/**
 *  The routes bellows are the multiple options of actions that can be performed in this
 *  application.
 */

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
routes.put('/users', UserController.update);

export default routes;
