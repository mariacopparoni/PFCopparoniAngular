import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {User} from "../../../users/models";
import {UsersService} from "../../../users/users.service";

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.scss'],
})
export class StudentsDialogComponent {

  studentForm: FormGroup;
  enrollments$: any[] | undefined


  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<StudentsDialogComponent>,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {

    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['STUDENT'],
    });
    if (this.data){
        this.studentForm.patchValue(this.data.user);
        if (!this.data.edit) {
          this.studentForm.disable();
          usersService.getEnrollmentsByUser(this.data.user.email).subscribe({
            next: (result) => {
              if (result) {
                this.enrollments$ = result;
              }
            }
          });
        }
    }
  }



  onSubmit(): void {
    if (this.studentForm.invalid) {
      return this.studentForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.studentForm.value);
    }
  }
}
