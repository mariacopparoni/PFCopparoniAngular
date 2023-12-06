import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // /course
        path: '',
        component: CoursesComponent,
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class CourseRoutingModule {}
