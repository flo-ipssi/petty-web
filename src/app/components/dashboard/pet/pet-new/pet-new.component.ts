import { Component, OnInit } from '@angular/core';
import {
  faPaw,
  faImages,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { PetsService } from '../../../../services/pets.service';
import { Pet } from '../../../../models/pet';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import $ from 'jquery';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-pet-new',
  templateUrl: './pet-new.component.html',
  styleUrls: ['./pet-new.component.scss'],
})
export class PetNewComponent implements OnInit {
  pet: Pet = new Pet;
  submitted = false;
  namePictures: any;
  element: Pet =  {};

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
      $('.reset-inputs').click(function () {
        console.log('ok');
        
        $("input[type='file']").val();
        $('.uploadpreview').css('background-color', 'transparent').css('background-image', '');
      });
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

  // Reinitialize the propreties
  newPet(): void {
    this.submitted = false;
    this.pet = new Pet();
    this.pet.photos = this.counter(8);
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    this.element = this.pet; 

    // Donwload and save pictures
    const promises = this.pet.photos.map((file, index) => {
      if (file) {
        let path = 'upload/img_' + Math.random().toString(36).substr(2, 9);
        let ref = this.storage.ref(path);
        let task = this.storage.upload(path, file[0]);

        // for every upload in firestore we take the URL of the uploaded file
        return task.then((f) => {
          return f.ref.getDownloadURL().then((url) => {
            console.log(url);
            return url;
          });
        });
      }
    });
    Promise.all(promises)
      .then((uploadedMediaList) => {
        this.element.photos = uploadedMediaList.filter(function (element) {
          return element !== undefined;
        });
        
        // Create a pet
        this.petService.addPet(this.element);
      })
      .catch((err) => console.log('Error:' + err));

    //Reinitialize
    this.pet = new Pet();
    this.namePictures = Array();
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
