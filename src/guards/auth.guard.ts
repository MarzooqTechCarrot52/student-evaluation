import { CanActivate, ExecutionContext } from '@nestjs/common';
import RunTimeDatabase from 'src/libs/helper/runTimeDatabase';
import { verifyToken } from '../auth/jwt.util';

export class AuthGuard implements CanActivate {
	private db = RunTimeDatabase.getInstance();

	canActivate(context: ExecutionContext){
		const req = context.switchToHttp().getRequest();
		const token = req.headers.authorization;
		
		if (!token) return false;

		try {
			verifyToken(token);
			return this.db.has(`token:${token}`);
		} catch {
			return false;
		}
	}
}
