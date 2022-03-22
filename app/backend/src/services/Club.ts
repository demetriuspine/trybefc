import Club from '../database/models/Club';

export default class ClubService {
  static async getAll() {
    const clubs: Club[] = await Club.findAll();
    return clubs;
  }

  static async getById(id: string) {
    const club = await Club.findByPk(id);
    return club;
  }
}
