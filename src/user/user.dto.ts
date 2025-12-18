import {IsIn, IsNotEmpty, IsOptional, IsString,} from 'class-validator'

type userType = 'teacher' | 'student' | 'management';

export class UserDTO {
    @IsOptional()
    @IsString()
    id?:string;

    @IsString()
    @IsNotEmpty()
    name:string

     @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsIn(['teacher', 'student', 'management'])
  usertype: userType ;
} 