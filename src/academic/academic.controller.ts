import { Controller, Post,Body, UseGuards, Get, Param, ValidationPipe } from '@nestjs/common';
import { AcademicService } from './academic.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AcademicRecordDTO } from './academic.dto';
import { UserService } from 'src/user/user.service';

@Controller('academic')

export class AcademicController {
    constructor( 
        private readonly academicService: AcademicService,
        private readonly userService:UserService,
    ){}

    @UseGuards(AuthGuard)
    @Post('add/mark')
    addMark(@Body(new ValidationPipe()) body:AcademicRecordDTO) {
	    return this.academicService.addMark(body);
    }

    @UseGuards(AuthGuard)
    @Get('student')
    getMarks(){
        return this.academicService.getMark()
    }
    
    @UseGuards(AuthGuard)
    @Get('student/rank')
    getRanks(){
        return this.academicService.getRanks();
    }

    @UseGuards(AuthGuard)
    @Get('student/:id')
    getOneMarks(@Param('id') id: string){
        return this.academicService.getOneMark(id)
    }

    
}