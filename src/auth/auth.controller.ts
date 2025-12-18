import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

interface auth {
    usertype:string
    username : string
    password : string
}

@Controller('auth')
export class AuthController {
    constructor ( private readonly authService : AuthService){}

    @Post('login')
    login(@Body() body:auth){
        return this.authService.login(body.usertype,body.username, body.password);
    }
}
