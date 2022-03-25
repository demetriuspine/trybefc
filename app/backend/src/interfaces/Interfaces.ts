import { Request } from 'express';
import { Model } from 'sequelize/types';

export interface TokenData {
  email: string,
  iat: number,
}

export interface RequestEmail extends Request {
  email?: string;
}

export interface MatchInterface {
  homeTeam: string;
  awayTeam: string;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface LeaderboardI {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export interface CreateMatchI extends Model{
  id: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface MatchI extends CreateMatchI {
  homeClub: { clubName: string },
  awayClub: { clubName: string }
}
