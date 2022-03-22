import * as express from 'express';
import ClubController from '../controllers/Club';

const clubRouter = express.Router();

clubRouter.get('/:id', ClubController.getById).get('/', ClubController.getAll);

export default clubRouter;
