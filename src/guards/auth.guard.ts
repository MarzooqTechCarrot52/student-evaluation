import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verifyToken } from '../auth/jwt.util';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext){
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;

    if (!token) return false;

    try {
      verifyToken(token);
      return true;
    } catch {
      return false;
    }
  }
}
