import { MatchInterface } from '../interfaces/Interfaces';
import Club from '../database/models/Club';
import Match from '../database/models/Match';

export default class MatchService {
  static async getMatches() {
    const matches = await Match.findAll(
      {
        include: [
          { model: Club, as: 'homeClub', attributes: ['clubName'] },
          { model: Club, as: 'awayClub', attributes: ['clubName'] },
        ],
      },
    );

    return matches;
  }

  static async getByStatus(inProgress: boolean) {
    const matches = await Match.findAll({
      where: { inProgress },
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });

    return matches;
  }

  static async create(match: MatchInterface) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = match;
    const newMatch = await Match
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });
    return { id: newMatch.id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress };
  }

  static async finishMatch(id: string, status: boolean) {
    const progress = { inProgress: status };
    await Match
      .update(progress, { where: { id } });
    return progress;
  }

  static async updateMatch(
    id: string | number,
    homeTeamGoals: string | number,
    awayTeamGoals: string | number,
  ) {
    const score = { homeTeamGoals, awayTeamGoals };
    await Match
      .update(
        score,
        { where: { id } },
      );
    return score;
  }
}
