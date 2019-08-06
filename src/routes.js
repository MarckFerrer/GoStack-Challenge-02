// The 'Router' method is imported from 'express' and it'll allow http connections
import { Router } from 'express';
// The multer will deal with image upload.
import multer from 'multer';
// The 'multerConfig' will deal with the renaming of the file
import multerConfig from './config/multer';
// The import bellow are responsible for calling a file compatible with the route
import UserController from './app/controllers/UserController';
// The 'SessionController' will be responsible for authenticating a session;
import SessionController from './app/controllers/SessionController';
// The 'FileController' will be responsible for handling the file upload
import FileController from './app/controllers/FileController';
// The 'ProviderController' will handle all the service providers of the application.
import ProviderController from './app/controllers/ProviderController';
// The 'authMiddleware' will check the unique token and will say if it's valid or not.
import authMiddleware from './app/middlewares/auth';
// the 'AppointmentController' will .
import AppointmentController from './app/controllers/AppointmentController';

// The const 'routes' will be initialized as a Router()
const routes = new Router();
// The const 'multer' will perform the image handling.
const upload = multer(multerConfig);
/**
 *  The routes bellow are the multiple options of actions that can be performed in this
 *  application.
 */

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.get('/providers', ProviderController.index);
routes.post('/appointments', AppointmentController.store);
routes.post('/files', upload.single('file'), FileController.store);
export default routes;
