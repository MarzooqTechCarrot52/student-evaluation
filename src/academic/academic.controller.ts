import { Controller, Post,Body, UseGuards, Get, Param, ValidationPipe } from '@nestjs/common';
import { AcademicService } from './academic.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AcademicRecordDTO } from './academic.dto';

@Controller('academic')
@UseGuards(AuthGuard)
export class AcademicController {
    constructor( private readonly academicService: AcademicService){}

    @Post('add/mark')
    addMark(@Body(new ValidationPipe()) body:AcademicRecordDTO) {
	    return this.academicService.addMark(body);
    }
    @Get('student')
    getMarks(){
        return this.academicService.getMark()
    }
    
    @Get('student/rank')
    getRanks(){
        return this.academicService.getRanks();
    }

    @Get('student/:id')
    getOneMarks(@Param('id') id: string){
        return this.academicService.getOneMark(id)
    }

    
}