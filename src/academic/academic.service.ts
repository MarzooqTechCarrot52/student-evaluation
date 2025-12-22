import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { AcademicRecordDTO } from './academic.dto';

export interface AcademicRecord {
  studentId: string;
  teacherId: string;
  subject: string;
  acquiredMark: number;
  maximumMark: number;
}

export interface StudentScoreWithRank {
  studentId: string;
  totalmark: number;
  rank?: number;
}

@Injectable()
export class AcademicService {
  // Local in-memory DB for academic records
  private academicRecords = new Map<string, AcademicRecord>();

  // Add a new academic record
  addMark(record: AcademicRecordDTO): AcademicRecord {
    const id = randomUUID();
    const newRecord: AcademicRecord = { ...record };
    this.academicRecords.set(id, newRecord);
    return newRecord;
  }

  // Get all academic records
  getMark(): AcademicRecord[] {
    return Array.from(this.academicRecords.values());
  }

  // Get all records for a specific student
  getOneMark(studentId: string): AcademicRecord[] {
    return Array.from(this.academicRecords.values()).filter(
      r => r.studentId === studentId
    );
  }

  // Calculate total marks and ranks
  getRanks(): StudentScoreWithRank[] {
    const totals: Record<string, number> = {};

    for (const r of this.academicRecords.values()) {
      totals[r.studentId] ??= 0;
      totals[r.studentId] += r.acquiredMark;
    }

    const data: StudentScoreWithRank[] = Object.entries(totals).map(
      ([studentId, totalmark]) => ({ studentId, totalmark })
    );

    data.sort((a, b) => b.totalmark - a.totalmark);

    for (let i = 0; i < data.length; i++) {
      if(i>0 && data[i].totalmark === data[i-1].totalmark){
        data[i].rank = data[i-1].rank
      }
      else{
      data[i].rank = i + 1;
    }
  }
    return data;
  }

}
