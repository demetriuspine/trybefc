import { MatchInterface } from '../interfaces/Interfaces';
import Club from '../database/models/Club';
import Match from '../database/models/Match';
import ClubService from './Club';

export default class MatchService {
  static async getAll(status?: boolean) {
    let matches: Match[];
    if (status === undefined) {
      matches = await Match.findAll({ include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
      });
    } else {
      matches = await Match.findAll({
        where: { inProgress: status },
        include: [
          { model: Club, as: 'homeClub', attributes: ['clubName'] },
          { model: Club, as: 'awayClub', attributes: ['clubName'] },
        ],
      });
    }

    return matches;
  }

  static async checkTeamExistence(idHomeTeam: string, idAwayTeam: string) {
    const homeTeam = await ClubService.getById(idHomeTeam);
    const awayTeam = await ClubService.getById(idAwayTeam);
    if (!homeTeam || !awayTeam) {
      return { message: 'There is no team with such id!' };
    }
    return { homeTeam, awayTeam };
  }

  static async createMatch(data: MatchInterface) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = data;

    const checkTeams = await MatchService.checkTeamExistence(homeTeam, awayTeam);

    if (checkTeams.message) return checkTeams;

    const createdMatch = await Match.create(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress },
    );

    return { id: createdMatch.id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress };
  }

  static async updateStatus(id: number | string) {
    const updatedMatch = await Match.update({ inProgress: false }, {
      where: { id },
    });
    return updatedMatch;
  }

  static async updateMatchGoals(id: number | string, homeGoals: number, awayGoals: number) {
    const updatedMatchGoals = await Match.update(
      { homeTeamGoals: homeGoals, awayTeamGoals: awayGoals },
      { where: { id } },
    );
    return updatedMatchGoals;
  }
}
