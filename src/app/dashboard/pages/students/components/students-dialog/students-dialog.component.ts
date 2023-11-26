import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentsService } from '../../students.service';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.scss'],
})
export class StudentsDialogComponent {
  nameControl = new FormControl();
  startDateControl = new FormControl();
  lastNameControl = new FormControl();

  courseForm = new FormGroup({
    name: this.nameControl,
    startDate: this.startDateControl,
    lastName: this.lastNameControl,
  });

  constructor(
    private matDialogRef: MatDialogRef<StudentsDialogComponent>,
    private studentsService: StudentsService,
    @Inject(MAT_DIALOG_DATA) private courseId?: number
  ) {
    if (courseId) {
      this.studentsService.getById$(courseId).subscribe({
        next: (c) => {
          if (c) {
            this.courseForm.patchValue(c);
          }
        },
      });
    }
  }

  public get isEditing(): boolean {
    return !!this.courseId;
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
