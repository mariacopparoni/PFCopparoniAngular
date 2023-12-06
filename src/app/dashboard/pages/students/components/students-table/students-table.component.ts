import { Component, EventEmitter, Input, Output } from '@angular/core';
import {User} from "../../../users/models";

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
})
export class StudentsTableComponent {
  @Input()
  dataSource: User[] = [];

  @Output()
  showStudent = new EventEmitter();


  @Output()
  editStudent = new EventEmitter();

  @Output()
  deleteStudent = new EventEmitter();

  displayedColumns = ['id', 'name',  'actions'];
}
