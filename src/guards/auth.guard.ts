import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verifyToken } from '../auth/jwt.util';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) return false;

    // Optional but recommended: handle Bearer tokens
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader;

    try {
      verifyToken(token);
      return true;
    } catch {
      return false;
    }
  }
}
