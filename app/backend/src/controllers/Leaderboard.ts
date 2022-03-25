import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard';

export default class LeaderboardController {
  static async getHomeLeaderboard(req: Request, res: Response) {
    try {
      const leaderboard = await LeaderboardService.getAllHomeTeamsData();
      return res.status(200).json(leaderboard);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
