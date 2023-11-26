import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { EnrollmentActions } from '../../store/enrollment.actions';
import {
  selectCourseOptions,
  selectIsLoadingDialogOptions,
  selectStudentOptions,
} from '../../store/enrollment.selectors';
import { Observable, take } from 'rxjs';
import { Course } from '../../../courses/models';
import { User } from '../../../users/models';
import { FormControl, FormGroup } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialogRef } from '@angular/material/dialog';
import {Student} from "../../../students/models";
import {StudentsService} from "../../../students/students.service";
import {CoursesService} from "../../../courses/courses.service";

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styleUrls: ['./enrollment-dialog.component.scss'],
})
export class EnrollmentDialogComponent {
  userIdControl = new FormControl<number | null>(null);
  courseIdControl = new FormControl<number | null>(null);

  enrollmentForm = new FormGroup({
    courseId: this.courseIdControl,
    userId: this.userIdControl,
  });

  isLoading$: Observable<boolean>;
  students$: Observable<Student[]>;
  courses$: Observable<Course[]>;


  constructor(
    private store: Store,
    private action$: Actions,
    private matDialogRef: MatDialogRef<EnrollmentDialogComponent>,
    private studentsService: StudentsService,
    private coursesService: CoursesService
  ) {
    this.students$ = this.studentsService.getStudents$();
    this.courses$ = this.coursesService.getCourses$();
    this.store.dispatch(EnrollmentActions.loadEnrollmentDialogOptions());
    this.isLoading$ = this.store.select(selectIsLoadingDialogOptions);


    this.action$
      .pipe(ofType(EnrollmentActions.loadEnrollments), take(1))
      .subscribe({
        next: () => this.matDialogRef.close(),
      });
  }

  onSubmit(): void {
    this.store.dispatch(
      EnrollmentActions.createEnrollment({
        payload: this.enrollmentForm.getRawValue(),
      })
    );
  }
}
