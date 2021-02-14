import { Component, OnInit } from '@angular/core';
import {
  faPaw,
  faImages,
  faCheckCircle,
  faVenus,
  faMars,
} from '@fortawesome/free-solid-svg-icons';
import { PetsService } from '../../../../services/pets.service';
import { Pet } from '../../../../models/pet';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import $ from 'jquery';
@Component({
  selector: 'app-pet-new',
  templateUrl: './pet-new.component.html',
  styleUrls: ['./pet-new.component.scss'],
})
export class PetNewComponent implements OnInit {
  pet: Pet = new Pet();
  submitted = false;

  // SLICK
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    infinite: false,
    speed: 300,
    adaptiveHeight: true,
  };
  // ICONS FONT
  faMars = faMars;
  faVenus = faVenus;
  faPaw = faPaw;
  faImages = faImages;
  faCheckCircle = faCheckCircle;

  types_animals = [
    {
      name: 'Chien',
      value: 'dog',
    },
    {
      name: 'Chat',
      value: 'cat',
    },
    {
      name: 'Oiseau',
      value: 'bird',
    },
    {
      name: 'Rongeur',
      value: 'rodent',
    },
  ];

  constructor(
    private petService: PetsService,
    private storage: AngularFireStorage
  ) {
    // Pictures
    this.pet.photos = this.counter(8);
  }

  ngOnInit(): void {
    $(document).ready(function () {
      // Preview images
      $('.upload-wrap input[type=file]').change(function () {
        var id = $(this).attr('id');
        var newimage = new FileReader();
        newimage.readAsDataURL(this.files[0]);
        newimage.onload = function (e) {
          $('.uploadpreview.' + id).css(
            'background-image',
            'url(' + e.target.result + ')'
          );
        };
      });
      $('#radio-male').change(function () {
        if ($(this).parent().hasClass('btn-light')) {
          $(this).parent().addClass('btn-primary');
          $(this).parent().removeClass('btn-light');
          $('#radio-female').parent().addClass('btn-light');
          $('#radio-female').parent().removeClass('btn-primary');
        } else {
          $(this).parent().removeClass('btn-primary');
          $(this).parent().addClass('btn-light');
          $('#radio-female').parent().addClass('btn-primary');
          $('#radio-female').parent().removeClass('btn-light');
        }
      });
      $('#radio-female').change(function () {
        if ($(this).parent().hasClass('btn-light')) {
          $(this).parent().addClass('btn-primary');
          $(this).parent().removeClass('btn-light');
          $('#radio-male').parent().addClass('btn-light');
          $('#radio-male').parent().removeClass('btn-primary');
        } else {
          $(this).parent().removeClass('btn-primary');
          $(this).parent().addClass('btn-light');
          $('#radio-male').parent().removeClass('btn-light');
          $('#radio-male').parent().addClass('btn-primary');
        }
      });

      $("#reset-inputs").click(function(){
        $("input[type='file']").val();
        $('.uploadpreview').css('background-image', 'none');
      })
    });
  }
  // FORM
  // INPUT FILES IMAGES
  counter(i: number) {
    return new Array(i);
  }

  loadFile(event: any) {
    let id = event.target.id;
    this.pet.photos[id] = event.target.files;
  }
  
  removePhoto(event: any) {
    this.pet.photos.splice(event.target.id, 1);
  }
  
  uploadMedias() {
    let namePictures = Array();
    for (let index = 0; index < this.pet.photos.length; index++) {
      var ID = 'img_' + Math.random().toString(36).substr(2, 9);
      namePictures.push(ID);
      this.storage.upload('/upload/photos/'+ID, this.pet.photos[index][0]);
    }
    this.pet.photos = namePictures;
    console.log(this.pet.photos);
    this.petService.addPet(this.pet);
  }

  // Reinitialize the propreties
  newPet(): void {
    this.submitted = false;
    this.pet = new Pet();
  }

  save() {
    this.uploadMedias();
    this.pet = new Pet();
  }

  onSubmit() {
    this.submitted = true;
    // Remove the empty values
    var tabPhotos = this.pet.photos.filter(function (el) {
      return el != null;
    });
    this.pet.photos = tabPhotos;
    this.save();
  }

  // SLICK
  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }
}
