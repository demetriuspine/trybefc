import { Model, DataTypes } from 'sequelize';
import db from '.';
import Match from './Match';

export default class Club extends Model {
  public clubName: string;
}

Club.init({
  clubName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Match.belongsTo(Club, { foreignKey: 'id', as: 'home_team' });
Match.belongsTo(Club, { foreignKey: 'id', as: 'away_team' });

Club.hasMany(Match, { foreignKey: 'id', as: 'home_team' });
Club.hasMany(Match, { foreignKey: 'id', as: 'away_team' });
