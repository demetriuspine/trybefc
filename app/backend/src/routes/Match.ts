import * as express from 'express';
import validateToken from '../middlewares/validateToken';
import MatchController from '../controllers/Match';

const matchRouter = express.Router();

matchRouter
  .patch('/:id', MatchController.updateMatch)
  .patch('/:id/finish', MatchController.finishMatch)
  .get('/', MatchController.getClubsByProgress)
  .use(validateToken)
  .post('/', MatchController.create);

export default matchRouter;
