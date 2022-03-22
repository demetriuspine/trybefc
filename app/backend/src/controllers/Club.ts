import { Request, Response } from 'express';
import ClubService from '../services/Club';

export default class ClubController {
  static async getAll(_req: Request, res: Response) {
    try {
      const clubs = await ClubService.getAll();
      return res.status(200).json(clubs);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const club = await ClubService.getById(id);
      return res.status(200).json(club);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
