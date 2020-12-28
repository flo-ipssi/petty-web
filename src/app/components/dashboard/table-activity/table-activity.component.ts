import { Component, OnInit } from '@angular/core';
import { faCog, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table-activity',
  templateUrl: './table-activity.component.html',
  styleUrls: ['./table-activity.component.scss']
})
export class TableActivityComponent implements OnInit {
  trash = faTrashAlt;
  gear = faCog;

  constructor() { }

  ngOnInit(): void {
  }

}
