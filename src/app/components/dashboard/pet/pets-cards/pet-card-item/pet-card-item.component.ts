import { Component, Input, OnInit } from '@angular/core';
import { PetsService } from 'src/app/services/pets.service';

@Component({
  selector: 'app-pet-card-item',
  templateUrl: './pet-card-item.component.html',
  styleUrls: ['./pet-card-item.component.scss']
})
export class PetCardItemComponent implements OnInit {

  @Input() pet: any;
  constructor(private petService: PetsService) { }

  ngOnInit(): void {
  }
  

}
