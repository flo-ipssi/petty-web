import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../../../services/pets.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-pet-asks',
  templateUrl: './pet-asks.component.html',
  styleUrls: ['./pet-asks.component.scss'],
})
export class PetAsksComponent implements OnInit {
  pets: any;

  constructor(private petsService: PetsService) {}

  ngOnInit(): void {
    this.getPetsList();
  }

  // Return all the pets
  getPetsList() {
    this.petsService
      .getPetsList()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((p) => ({
            key: p.payload.doc.id,
            ...p.payload.doc.data(),
          }))
        )
      )
      .subscribe((pets) => {
        this.pets = pets;
      });
  }
}
