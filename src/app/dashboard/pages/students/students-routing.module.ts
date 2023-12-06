import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentsComponent} from './students.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // /students
        path: '',
        component: StudentsComponent,
      }
    ]),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class StudentsRoutingModule {}
