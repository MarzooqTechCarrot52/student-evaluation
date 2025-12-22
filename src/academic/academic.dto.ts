import {IsNotEmpty,IsString,IsNumber,Min,IsOptional,Max} from 'class-validator';

export class AcademicRecordDTO {
  @IsOptional() 
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  teacherId: string;

  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  acquiredMark: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  maximumMark: number;

}
