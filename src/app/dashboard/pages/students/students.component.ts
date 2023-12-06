import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { UsersService} from "../users/users.service";
import { User} from "../users/models";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  students$: Observable<User[]>;

  constructor(
    private usersService: UsersService,
    private matDialog: MatDialog
  ) {
    this.students$ = this.usersService.getUsers(true);
  }

  addStudent(): void {
    this.matDialog
      .open(StudentsDialogComponent)
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.students$ = this.usersService.createUser(result, true);
          }
        },
      });
  }

  onDeleteStudent(userId: number): void {
    if (confirm('Esta seguro?')) {
      this.students$ = this.usersService.deleteUser(userId, true);
    }
  }

  onEditStudent(user: User): void {
    this.matDialog
      .open(StudentsDialogComponent, {
        data: {user, edit: true},
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.students$ = this.usersService.updateUser(user.id, v, true);
          }
        },
      });
  }

  onShowStudent(user: User): void {
    this.matDialog
      .open(StudentsDialogComponent, {
        data: {user, edit: false},
      });
  }
}
