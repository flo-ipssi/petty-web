import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../../../services/pets.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pets-cards',
  templateUrl: './pets-cards.component.html',
  styleUrls: ['./pets-cards.component.scss'],
})
export class PetsCardsComponent implements OnInit {
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
            id: p.payload.doc.id,
            ...p.payload.doc.data(),
          }))
        )
      )
      .subscribe((pets) => {
        this.pets = pets;
      });
  }
}
