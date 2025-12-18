import { AcademicRecord } from './academic.interface';
import RunTimeDatabase from 'src/libs/helper/runTimeDatabase';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { AcademicRecordDTO } from './academic.dto';

export interface StudentScoreWithRank {
  studentId: string;
  totalmark: number;
  rank?: number; 
}

@Injectable()
export class AcademicService {
	private db = RunTimeDatabase.getInstance();
	addMark(record:AcademicRecordDTO) {
    const id = randomUUID()
		const newRecord = { ...record};
		this.db.set(id,newRecord)
		return newRecord
	}
  

  getMark(){
    let academic = this.db.values()
    return academic
  }
  getOneMark(studentId: string) {
		let academics = this.db.values()
		if(studentId){ 
		academics =	academics.filter(a => a.studentId === studentId);
	}
	return academics
}
  getRanks() {
    const records = this.db.values(); 
    const total= {};
    for (const r of records) {
        if (!total[r.studentId]) {
          total[r.studentId] = 0;
        }
        total[r.studentId] += r.acquiredMark;
    }

    const data: StudentScoreWithRank[] = [];
    for (const studentId in total) {
      data.push({ studentId, totalmark: total[studentId] });
    }

    data.sort((a, b) => b.totalmark - a.totalmark);
 
    for (let i = 0; i < data.length; i++) {
        data[i].rank = i + 1;
    }

    return data;
}
}
