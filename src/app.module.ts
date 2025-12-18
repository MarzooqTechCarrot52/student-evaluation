import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { AcademicController } from './academic/academic.controller';
import { AcademicService } from './academic/academic.service';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { UtilService } from './libs/utils/util.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, AuthController, AcademicController],
  providers: [AppService, AcademicService, UserService, AuthService,UtilService],
})
export class AppModule {}
