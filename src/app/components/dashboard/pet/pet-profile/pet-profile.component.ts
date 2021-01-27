import { Component, Input, OnInit } from '@angular/core';
import { PetsService } from '../../../../services/pets.service';
import { Pet } from '../../../../models/pet';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.component.html',
  styleUrls: ['./pet-profile.component.scss'],
})
export class PetProfileComponent implements OnInit {
  @Input() pet: any;
  @Input() key: string = "";  

  constructor(private petService: PetsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.key = this.route.snapshot.params['id'];
    this.getPet();
  }

  // Get the current pet
  getPet(){
    this.petService.getPet(this.key)
    .valueChanges()
    .subscribe((pet) => {
      this.pet = pet;
    });
  }

  // Update the informations
  update(isActive: Boolean) {
    this.petService
      .updatePet(this.pet.key, { active: isActive })
      .catch((err) => console.log(err));
  }

  // Delete the pet
  delete() {
    this.petService.deletePet(this.pet.key).catch((err) => console.log(err));
  }
}
