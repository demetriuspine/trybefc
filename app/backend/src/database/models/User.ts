import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class User extends Model {
  public id: number;

  public username: string;

  public role: string;

  public email: string;

  public password: string;
}

User.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  modelName: 'user',
  timestamps: false,
  underscored: true,
});
