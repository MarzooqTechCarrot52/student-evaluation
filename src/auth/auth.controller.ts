import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor ( private readonly authService : AuthService){}

    @Post('login')
    login(@Body(new ValidationPipe()) body:AuthDTO){
        return this.authService.login(body.usertype,body.username, body.password);
    }
}
