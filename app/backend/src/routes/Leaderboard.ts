import * as express from 'express';
import LeaderboardController from '../controllers/Leaderboard';

const leaderboardRouter = express.Router();

leaderboardRouter.get('/home', LeaderboardController.getHomeLeaderboard);

export default leaderboardRouter;
