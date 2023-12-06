import {Component, Inject} from '@angular/core';
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
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CoursesService} from "../../../courses/courses.service";
import {UsersService} from "../../../users/users.service";
import {Enrollment} from "../../models";
import {EnrollmentsService} from "../../enrollments.service";

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styleUrls: ['./enrollment-dialog.component.scss'],
})
export class EnrollmentDialogComponent {
  userIdControl = new FormControl<number | null>(null);
  courseIdControl = new FormControl<number | null>(null);

  enrollmentForm = new FormGroup({
    course: this.courseIdControl,
    user: this.userIdControl,
  });

  isLoading$: Observable<boolean>;
  students$: Observable<User[]>;
  courses$: Observable<Course[]>;


  constructor(
    private store: Store,
    private usersService: UsersService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
    public  dialogRef: MatDialogRef<EnrollmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.students$ = this.usersService.getUsers(true);
    this.courses$ = this.coursesService.getCourses$();
    this.isLoading$ = this.store.select(selectIsLoadingDialogOptions);

    if (this.data){
      this.enrollmentForm.patchValue(this.data.enrollment);
      if (!this.data.edit)
      {
        this.enrollmentForm.disable();
      }
    }


  }

  onSubmit(): void {
    if (this.data) {
      this.enrollmentsService.updateEnrollments(this.data.enrollment.id, this.enrollmentForm.getRawValue()).subscribe(
        () => {
          this.store.dispatch(EnrollmentActions.loadEnrollments());
          this.dialogRef.close();
        },
        (error) => {
          console.error(`Error deleting record: ${error}`);
        }
      );
    } else {
      this.store.dispatch(
        EnrollmentActions.createEnrollment({
          payload: this.enrollmentForm.getRawValue(),
        })
      );
    }

  }
}
