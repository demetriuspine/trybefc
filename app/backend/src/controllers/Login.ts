import { Request, Response } from 'express';
import * as fileSystem from 'fs';
import { StatusCodes } from 'http-status-codes';
import { sign } from 'jsonwebtoken';
import { RequestEmail } from '../interfaces/Interfaces';
import LoginService from '../services/Login';

const key = fileSystem.readFileSync('./jwt.evaluation.key');

export default class LoginCOntroller {
  static async create(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await LoginService.getUser(email, password);

      if (result.message) return res.status(StatusCodes.UNAUTHORIZED).json(result.message);

      const token = sign({ email }, key);
      return res.status(StatusCodes.OK).json({ user: result, token });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  static async get(req: RequestEmail, res: Response) {
    try {
      const { email } = req;
      const data = email as string;
      const user = await LoginService.validateLogin(data);
      if (user) res.status(StatusCodes.OK).json(user.role);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}
