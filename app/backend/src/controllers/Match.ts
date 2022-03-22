import { Request, Response } from 'express';
import Club from '../database/models/Club';
import Match from '../database/models/Match';
import MatchService from '../services/Match';

export default class MatchController {
  static async getClubsByProgress(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;

      const status = (inProgress === 'true');

      if (inProgress) {
        const matches = await MatchService.getByStatus(status);
        return res.status(200).json(matches);
      }

      const matches = await MatchService.getMatches();

      return res.status(200).json(matches);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static isMatchEqual(param1: Match, param2: Match) {
    return param1 === param2;
  }

  static async create(req: Request, res: Response) {
    try {
      const { homeTeam, awayTeam } = req.body;
      const isEqual = MatchController.isMatchEqual(homeTeam, awayTeam);

      if (isEqual) {
        return res.status(401)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }

      const getHomeTeam = await Club.findByPk(homeTeam);
      const getAwayTeam = await Club.findByPk(awayTeam);

      if (!getHomeTeam || !getAwayTeam) {
        return res.status(401).json({ message: 'Team not found' });
      }

      const createdMatch = await MatchService.create(req.body);
      return res.status(201).json(createdMatch);
    } catch (error) {
      return res.status(500).json('teste');
    }
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { inProgress } = req.body;
    const status = (inProgress === 'true');
    const finishedMatch = await MatchService.finishMatch(id, status);
    return res.status(200).json(finishedMatch);
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals, inProgress } = req.body;

    const status = (inProgress === 'true');

    if (inProgress) {
      const updatedMatch = await MatchService.updateMatch(id, homeTeamGoals, awayTeamGoals);
      return res.status(200).json(updatedMatch);
    }

    const finishedMatch = await MatchService.finishMatch(id, status);
    return res.status(200).json(finishedMatch);
  }
}
