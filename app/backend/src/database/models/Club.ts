import { Model, DataTypes } from 'sequelize';
import db from '.';
import Match from './Match';

export default class Club extends Model {
  public id: number;

  public clubName: string;
}
Club.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'club_name',
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'club',
});

Match.belongsTo(Club, { foreignKey: 'home_team', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'away_team', as: 'awayClub' });

Club.hasMany(Match, { foreignKey: 'home_team', as: 'homeClub' });
Club.hasMany(Match, { foreignKey: 'away_team', as: 'awayClub' });
