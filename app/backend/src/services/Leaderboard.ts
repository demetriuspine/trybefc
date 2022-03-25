import Club from '../database/models/Club';
import Match from '../database/models/Match';
import { LeaderboardI } from '../interfaces/Interfaces';

export default class LeaderboardService {
  static getHomeTeamMatchInfo(matches: Match[]) {
    let totalPoints = 0;
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;

    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        totalPoints += 3;
        totalVictories += 1;
      } if (match.homeTeamGoals === match.awayTeamGoals) {
        totalPoints += 1;
        totalDraws += 1;
      } else {
        totalLosses += 1;
      }
    });

    const result = { totalPoints, totalVictories, totalDraws, totalLosses };

    return result;
  }

  static getHomeTeamGoalsInfo(matches: Match[]) {
    let goalsFavor = 0;
    let goalsOwn = 0;

    matches.forEach((match) => {
      goalsFavor += match.homeTeamGoals;
      goalsOwn += match.awayTeamGoals;
    });

    const result = { goalsFavor, goalsOwn };

    return result;
  }

  static async getHomeTeamData(id: number | string) {
    const club = await Club.findByPk(id);
    const matches = await Match.findAll({ where: { homeTeam: id, inProgress: false } });

    const matchInfo = LeaderboardService.getHomeTeamMatchInfo(matches);
    const goalsInfo = LeaderboardService.getHomeTeamGoalsInfo(matches);

    const getEfficiency = (matchInfo.totalPoints / (matches.length * 3)) * 100;

    const efficiency = getEfficiency % 1 === 0 ? getEfficiency : getEfficiency.toFixed(2);

    const parsedEfficiency = Number(efficiency);

    if (!club) throw new Error('Clube não encontrado'); // CLUB pode retornar nulo

    const result = {
      name: club.clubName,
      ...matchInfo,
      ...goalsInfo,
      goalsBalance: goalsInfo.goalsFavor - goalsInfo.goalsOwn,
      efficiency: parsedEfficiency,
      totalGames: matches.length,
    };

    return result;
  }

  static sortLeaderboard(leaderboard: LeaderboardI[]) {
    const sortedLeaderboard = leaderboard.sort((a, b) => {
      let tiebreak = b.totalPoints - a.totalPoints;
      if (tiebreak === 0) {
        tiebreak = b.goalsBalance - a.goalsBalance;
        if (tiebreak === 0) {
          tiebreak = b.goalsFavor - a.goalsFavor;
          if (tiebreak === 0) {
            tiebreak = a.goalsOwn - b.goalsOwn;
          }
        }
      }
      return tiebreak;
    });

    return sortedLeaderboard;
  }

  static async getAllHomeTeamsData() {
    const clubs = await Club.findAll();

    const clubsInfo: LeaderboardI[] = await Promise.all(
      clubs.map((club) => LeaderboardService.getHomeTeamData(club.id)),
    );

    const sortedBoard = LeaderboardService.sortLeaderboard(clubsInfo);

    return sortedBoard;
  }
}
