import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiUrl } from 'src/app/config/url.token';
import {StudentsComponent} from './students.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { RouterModule } from '@angular/router';
import { StudentsRoutingModule } from './students-routing.module';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    StudentsDialogComponent,
  ],
  imports: [CommonModule, SharedModule, StudentsRoutingModule],
  providers: [
    {
      provide: ApiUrl,
      useValue: {},
    },
  ],
})
export class StudentsModule {}
