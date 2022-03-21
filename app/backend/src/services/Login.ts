import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';

export default class LoginService {
  static async getUser(email: string, password: string) {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) return { message: 'Incorrect email or password' };

    const match = bcrypt.compareSync(password, user.password);

    if (!match) return { message: 'Incorrect email or password' };

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };
  }

  static async validateLogin(email: string) {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  }
}
