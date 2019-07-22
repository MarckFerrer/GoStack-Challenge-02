// The 'Router' method is imported from 'express' and it'll allow http connections
import { Router } from 'express';
// The const 'routes' will be initialized as a Router()
const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

export default routes;
