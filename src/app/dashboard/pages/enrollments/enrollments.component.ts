import {Component, EventEmitter, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { EnrollmentActions } from './store/enrollment.actions';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';
import {EnrollmentsService} from "./enrollments.service";


@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss'],
})
export class EnrollmentsComponent {





  constructor(private store: Store,  private dialog: MatDialog, private  enrollmentsService: EnrollmentsService) {
    this.store.dispatch(EnrollmentActions.loadEnrollments());
  }

  addEnrollment(): void {
    this.dialog.open(EnrollmentDialogComponent);
  }


}
