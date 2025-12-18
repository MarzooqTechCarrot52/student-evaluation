import * as jwt from 'jsonwebtoken';

const SECRET = 'STUDENT_EVAL_SECRET';

export function signToken(payload:any){
    return jwt.sign(payload,SECRET,{expiresIn:'1h'})
}
export function verifyToken(token: string) {
	return jwt.verify(token, SECRET);
}