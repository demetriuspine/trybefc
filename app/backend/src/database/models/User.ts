import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class User extends Model {
  public username: string;

  public role: string;

  public email: string;

  public password: string;
}

User.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: db,
  modelName: 'user',
});
