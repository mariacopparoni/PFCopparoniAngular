import { Component } from '@angular/core';
import { StudentsService } from './students.service';
import { Observable } from 'rxjs';
import { Student } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  courses$: Observable<Student[]>;

  constructor(
    private studentsService: StudentsService,
    private matDialog: MatDialog
  ) {
    this.courses$ = this.studentsService.getStudents$();
  }

  addCourse(): void {
    this.matDialog
      .open(StudentsDialogComponent)
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.courses$ = this.studentsService.create$({
              id: new Date().getTime(),
              name: result.name,
              lastName: result.lastName,
              courseId: result.courseId,
              startDate: result.startDate,
            });
          }
        },
      });
  }

  onDeleteCourse(courseId: number): void {
    this.courses$ = this.studentsService.delete$(courseId);
  }

  onEditCourse(courseId: number): void {
    this.matDialog
      .open(StudentsDialogComponent, {
        data: courseId,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.courses$ = this.studentsService.edit$(courseId, result);
          }
        },
      });
  }
}
