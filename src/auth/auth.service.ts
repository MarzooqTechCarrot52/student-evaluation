import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { signToken } from './jwt.util';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  login(usertype: string, username: string, password: string) {
    const users = this.userService.getUser();
    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (!user) throw new Error('Invalid credentials');
    if (user.usertype === 'student') throw new Error('Access Denied for Student');

    const token = signToken({ id: user.id, usertype: user.usertype });
    return { token };
  }
}
