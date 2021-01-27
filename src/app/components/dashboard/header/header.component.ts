import { Component, OnInit } from '@angular/core';
import { faPaw, faTasks, faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Icons
  account = faUserCircle;
  asks = faTasks;
  pets = faPaw; 

  constructor() { }

  ngOnInit(): void {
  }

}
