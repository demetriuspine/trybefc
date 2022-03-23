import { Request, Response } from 'express';
import { MatchMessageError } from '../types/MatchMessageError';
import MatchService from '../services/Match';

export default class MatchController {
  static async getAll(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      if (inProgress === undefined) {
        const matches = await MatchService.getAll();
        return res.status(200).json(matches);
      }
      const status = inProgress === 'true';
      const matches = await MatchService.getAll(status);
      return res.status(200).json(matches);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async createMatch(req: Request, res: Response) {
    try {
      const dataMatch = req.body;
      const match = await MatchService.createMatch(dataMatch);
      const matchMessageError = match as MatchMessageError;
      if (matchMessageError.message) return res.status(401).json(matchMessageError);
      return res.status(201).json(match);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await MatchService.updateStatus(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async updateMatchGoals(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const result = await MatchService
        .updateMatchGoals(id, homeTeamGoals, awayTeamGoals);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
