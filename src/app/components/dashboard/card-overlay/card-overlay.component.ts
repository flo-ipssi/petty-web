import { Component, OnInit, Input } from '@angular/core';
import { faCat } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-overlay',
  templateUrl: './card-overlay.component.html',
  styleUrls: ['./card-overlay.component.scss']
})
export class CardOverlayComponent implements OnInit {
  faCat = faCat;
  @Input() bg : string = "blue";
  constructor() { }

  ngOnInit(): void {
  }

}
