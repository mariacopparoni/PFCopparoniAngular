import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styles: [],
})
export class UsersDialogComponent {
  userForm: FormGroup;
  roles: any = [
    {
      name: 'ADMIN',
    },
    {
      name: 'STUDENT'
    },
    {
      name: 'PROFESSIONAL',
    }
];

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<UsersDialogComponent>,

    // RECIBO LA DATA
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
    if (this.data) {
      this.userForm.patchValue(this.data.user);
      if (!this.data.edit)
      {
        this.userForm.disable();
      }
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.userForm.value);
    }
  }
}
