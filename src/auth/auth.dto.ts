import {IsIn, IsNotEmpty,IsString} from 'class-validator';

export class AuthDTO {
    
    @IsNotEmpty()
    @IsString()
    @IsIn(['teacher', 'admin'])
    usertype:string

    @IsNotEmpty()
    @IsString()
    username : string

    @IsNotEmpty()
    @IsString()
    password : string
}