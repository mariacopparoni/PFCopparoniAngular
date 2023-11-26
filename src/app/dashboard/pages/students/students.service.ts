import { Injectable } from '@angular/core';
import { Student } from './models';
import { Observable, of } from 'rxjs';
import {StudentsComponent} from "./students.component";

@Injectable({ providedIn: 'root' })
export class StudentsService {
  students: Student[] = [
    {
      id: 1,
      name: 'Ana',
      lastName: 'Àlvarez',
      startDate: new Date(),
      courseId: 1
    },
    {
      id: 2,
      name: 'Bruno',
      lastName: 'Barros',
      startDate: new Date(),
      courseId: 2
    },

  ];

  getStudents$(): Observable<Student[]> {
    return of(this.students);
  }

  create$(payload: Student): Observable<Student[]> {
    this.students.push(payload);
    return of([...this.students]);
  }

  edit$(id: number, payload: Student): Observable<Student[]> {
    return of(
      this.students.map((c) => (c.id === id ? { ...c, ...payload } : c))
    );
  }

  delete$(id: number): Observable<Student[]> {
    this.students = this.students.filter((c) => c.id !== id);
    return of(this.students);
  }

  getById$(id: number): Observable<Student | undefined> {
    return of(this.students.find((c) => c.id === id));
  }
}
