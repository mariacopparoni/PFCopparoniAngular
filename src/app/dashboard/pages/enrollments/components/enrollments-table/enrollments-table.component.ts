import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {forkJoin, map, Observable} from 'rxjs';
import {Enrollment} from '../../models';
import {selectEnrollments, selectEnrollmentsIsLoading,} from '../../store/enrollment.selectors';
import {UsersService} from "../../../users/users.service";
import {CoursesService} from "../../../courses/courses.service";
import {User} from "../../../users/models";
import {Course} from "../../../courses/models";
import {AuthService} from "../../../../../auth/services/auth.service";
import {EnrollmentsService} from "../../enrollments.service";
import {EnrollmentActions} from "../../store/enrollment.actions";
import {EnrollmentDialogComponent} from "../enrollment-dialog/enrollment-dialog.component";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {StudentsDialogComponent} from "../../../students/components/students-dialog/students-dialog.component";

@Component({
  selector: 'app-enrollments-table',
  templateUrl: './enrollments-table.component.html',
  styleUrls: ['./enrollments-table.component.scss'],
})
export class EnrollmentsTableComponent {
  displayedColumns = ['id', 'course', 'user', 'actions'];

  enrollments$: Observable<Enrollment[]>;
  isLoading$: Observable<boolean>;
  public authUser$: Observable<User | null>;


  constructor(private store: Store,
              private dialog: MatDialog,
              private authService: AuthService, private enrollmentsService: EnrollmentsService) {
    this.enrollments$ = this.store.select(selectEnrollments);
    this.isLoading$ = this.store.select(selectEnrollmentsIsLoading);
    this.authUser$ = this.authService.authUser$;

  }

  onDeleteEnrollment(id: number): void {
    if (confirm('Esta seguro?')) {
      this.enrollmentsService.deleteEnrollments(id).subscribe(
        () => {

          this.store.dispatch(EnrollmentActions.loadEnrollments());
        },
        (error) => {

        }
      );
    }
  }

  get role$(): Observable<string | undefined> {
    return this.authUser$.pipe(map((user) => user?.role));
  }

  edit(enrollment: Enrollment, edit = true){
    this.dialog
      .open(EnrollmentDialogComponent, {
        data: {enrollment, edit},
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.store.dispatch(EnrollmentActions.loadEnrollments());
          }
        },
      });

  }




}
