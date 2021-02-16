import { Component, Input, OnInit } from '@angular/core';
import { PetsService } from '../../../../../../services/pets.service';
import { Pet } from '../../../../../../models/pet';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.component.html',
  styleUrls: ['./pet-profile.component.scss'],
})

export class PetProfileComponent implements OnInit {
  @Input() pet: any;
  @Input() key: string = '';

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  
  title = 'app';

  constructor(
    private petService: PetsService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.key = this.route.snapshot.params['id'];
    this.getProfilePet();
  }

  // Upload a image
  // uploadFile(event: any) {
  //   const file = event.target.files[0];
  //   const filePath = 'name-your-file-path-here';
  //   const task = this.storage.upload(filePath, file);
  // }
  upload(event: any){
    const id = Math.random().toString(36).substring(2);
    this.ref = this.storage.ref('photos/'+id);
    this.task = this.ref.put(event.target.files[0]);
  }


  // Get the current pet
  getProfilePet() {
    this.petService
      .getPet(this.key)
      .valueChanges()
      .subscribe((pet) => {
        this.pet = pet;
      });
  }

  // Update the informations
  // update(isActive: Boolean) {
  //   this.petService
  //     .updatePet(this.pet.key, { active: isActive })
  //     .catch((err) => console.log(err));
  // }

  // // Delete the pet
  // delete() {
  //   this.petService.deletePet(this.pet.key).catch((err) => console.log(err));
  // }
}
