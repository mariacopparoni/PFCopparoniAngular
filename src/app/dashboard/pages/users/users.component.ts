import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { User } from './models';
import { UsersService } from './users.service';
import { UsersBetterService } from './users-better.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  userName = '';

  users$: Observable<User[]>;

  constructor(
    private matDialog: MatDialog,
    private usersService: UsersService // MockUsersService // private usersBetterService: UsersBetterService
  ) {
    this.users$ = this.usersService.getUsers();
  }

  addUser(): void {
    this.matDialog
      .open(UsersDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.users$ = this.usersService.createUser(v);
          }
        },
      });
  }

  onEditUser(user: User): void {
    this.matDialog
      .open(UsersDialogComponent, {
        data: {user, edit: false}
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.users$ = this.usersService.updateUser(user.id, v);
          }
        },
      });
  }

  onShowUser(user: User)
  {
    this.matDialog
      .open(UsersDialogComponent, {
        data: {user, edit: false},
      })
  }

  onDeleteUser(userId: number): void {
    if (confirm('Esta seguro?')) {
      this.users$ = this.usersService.deleteUser(userId);
      // this.users = this.users.filter((u) => u.id !== userId);
    }
  }
}
