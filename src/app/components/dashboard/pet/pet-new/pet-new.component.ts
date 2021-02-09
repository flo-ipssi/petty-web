import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PetsService } from '../../../../services/pets.service';
import { Pet } from '../../../../models/pet';

@Component({
  selector: 'app-pet-new',
  templateUrl: './pet-new.component.html',
  styleUrls: ['./pet-new.component.scss']
})
export class PetNewComponent implements OnInit {

  pet: Pet = new Pet;
  submitted = false;
  // SLICK
  slideConfig = {"slidesToShow":1, "slidesToScroll": 1};

  constructor(private petService: PetsService) {}

  ngOnInit(): void {
  }
  // FORM
  // Initialize the propreties
  newPet():void{
    this.submitted = false;
    this.pet = new Pet();
  }

  save(){
    this.petService.addPet(this.pet);
    this.pet = new Pet();
  }

  onSubmit(){
    this.submitted = true;
    this.save();

  }

  // SLICK
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }

}
