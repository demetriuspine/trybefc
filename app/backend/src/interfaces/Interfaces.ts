import { Request } from 'express';

export interface TokenData {
  email: string,
  iat: number,
}

export interface RequestEmail extends Request {
  email?: string;
}

export interface MatchInterface {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}
