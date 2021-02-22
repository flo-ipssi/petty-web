import { Component, Input, OnInit } from '@angular/core';
import { PetsService } from '../../../../../../services/pets.service';
import { Pet } from '../../../../../../models/pet';
import { ActivatedRoute } from '@angular/router';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import $ from 'jquery';
@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.component.html',
  styleUrls: ['./pet-profile.component.scss'],
})
export class PetProfileComponent implements OnInit {
  @Input() pet: Pet = new Pet();
  @Input() key: string = '';

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  profile = '';
  pictures = [];

  constructor(
    private petService: PetsService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.key = this.route.snapshot.params['id'];
    this.getProfilePet();
  }

  // Get the current pet
  async getProfilePet() {
    const pet = await this.petService
      .getPet(this.key)
      .valueChanges()
      .subscribe((pet) => {
        this.pet = pet;
        this.profile = pet?.profile;
        this.pictures = pet?.photos;
      });
  }

  deleteImg(src: string): void{
    Promise.resolve(src)
    .then((res) => {
      // Update the display and remove the file
      const key = this.pictures.indexOf(res);
      if (key > -1) {
        this.pictures.splice(key, 1);
        this.petService.deleteImageByUrl(src);
      }
      this.pet.photos = this.pictures;
      return this.pet;
    })
    .then((res) => {      
      return this.petService.updatePet(this.key, res);
    });    
  }
  // Update the informations
  // update(isActive: Boolean) {
  //   this.petService
  //     .updatePet(this.pet.key, { active: isActive })
  //     .catch((err) => console.log(err));
  // }

}
