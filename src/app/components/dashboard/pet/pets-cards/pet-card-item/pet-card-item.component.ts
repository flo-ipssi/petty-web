import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet-card-item',
  templateUrl: './pet-card-item.component.html',
  styleUrls: ['./pet-card-item.component.scss']
})
export class PetCardItemComponent implements OnInit {

  @Input pet: any;
  constructor() { }

  ngOnInit(): void {
  }

}
