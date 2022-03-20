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

Match.belongsTo(Club, { foreignKey: 'id', as: 'home_team' });
Match.belongsTo(Club, { foreignKey: 'id', as: 'away_team' });

Club.hasMany(Match, { foreignKey: 'id', as: 'home_team' });
Club.hasMany(Match, { foreignKey: 'id', as: 'away_team' });
