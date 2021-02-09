import { Component, OnInit } from '@angular/core';
import {
  faPaw,
  faImages,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { PetsService } from '../../../../services/pets.service';
import { Pet } from '../../../../models/pet';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pet-new',
  templateUrl: './pet-new.component.html',
  styleUrls: ['./pet-new.component.scss'],
})
export class PetNewComponent implements OnInit {
  pet: Pet = new Pet();
  submitted = false;

  // SLICK
  slideConfig = { slidesToShow: 1, slidesToScroll: 1, dots: true,arrows: false, infinite: false };
  // ICONS FONT
  faPaw = faPaw;
  faImages = faImages;
  faCheckCircle = faCheckCircle;

  constructor(private petService: PetsService) {}

  ngOnInit(): void {}
  // FORM
  // Initialize the propreties
  newPet(): void {
    this.submitted = false;
    this.pet = new Pet();
  }

  save() {
    this.petService.addPet(this.pet);
    this.pet = new Pet();
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    console.log(form.value['name']);
    this.pet.name = form.value['name'];
    this.pet.sex = form.value['sex'];
    this.pet.type = form.value['type'];
    this.pet.age = form.value['age'];
    this.pet.description = form.value['description'];
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
