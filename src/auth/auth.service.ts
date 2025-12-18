import { throwError } from 'rxjs';
import { signToken } from './jwt.util';
import RunTimeDatabase from 'src/libs/helper/runTimeDatabase';

export class AuthService {
	private db = RunTimeDatabase.getInstance();

	login(usertype:string,username: string, password: string) {
		const users = this.db.values();
		const user = users.find(
			u => u.username === username && u.password === password
		);

		if (!user) throw new Error('Invalid credentials');
		if( user.usertype==='student') throw new Error('Access Denied for Student')

		const token = signToken({ 
			id: user.id, 
			usertype: user.usertype 
		});
		this.db.set(`token:${token}`, true);

		return { token };
	}
}
