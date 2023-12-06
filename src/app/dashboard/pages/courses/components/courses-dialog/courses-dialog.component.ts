import { Component, Inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from '../../courses.service';
import {Course} from "../../models";
import {Observable} from "rxjs";

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss'],
})
export class CoursesDialogComponent {
  courseForm : FormGroup;
  enrollments$: any[] | undefined

  constructor(
    private matDialogRef: MatDialogRef<CoursesDialogComponent>,
    private coursesService: CoursesService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    if (this.data) {
      this.courseForm.patchValue(this.data.course);
      if (!this.data.edit)
      {
        this.courseForm.disable();
      }
      coursesService.getEnrollmentsByCourse(this.data.course.name).subscribe({
        next: (result) => {
          if (result) {
            this.enrollments$ = result;

          }
        }
      });
    }

  }



  onSubmit(): void {
    if (this.courseForm.invalid) {
      return this.courseForm.markAllAsTouched();
    } else {
      // logica para crear un curso
      this.matDialogRef.close(this.courseForm.value);
    }
  }
}
