import * as express from 'express';
import { validatePassword, validateEmail } from '../middlewares/validateLogin';
import LoginCOntroller from '../controllers/Login';
import validateToken from '../middlewares/validateToken';

const loginRouter = express.Router();

loginRouter
  .get('/validate', validateToken, LoginCOntroller.get)
  .use(validateEmail)
  .use(validatePassword)
  .post('/', LoginCOntroller.create);

export default loginRouter;
