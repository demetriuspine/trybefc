import * as express from 'express';
import validateToken from '../middlewares/validateToken';
import MatchController from '../controllers/Match';
import validateMatch from '../middlewares/validateMatch';

const matchRouter = express.Router();

matchRouter
  .patch('/:id', MatchController.updateMatchGoals)
  .patch('/:id/finish', MatchController.updateStatus)
  .get('/', MatchController.getAll)
  .use(validateToken)
  .use(validateMatch)
  .post('/', MatchController.createMatch);

export default matchRouter;
