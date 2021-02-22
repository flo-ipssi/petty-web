import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Pet } from '../models/pet';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private dbPath = 'pets';
  private imgPath = 'upload/photos/';

  petsRef: AngularFirestoreCollection<Pet> = null;

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {
    this.petsRef = firestore.collection(this.dbPath);
  }

  // Add a new pet
  addPet(pet: Pet): void {
    this.petsRef
      .add({ ...pet })
      .then((result) => {
        return result.id;
      })
      .catch((err) => {
        return err;
      });
  }

  // Update the data of a pet
  updatePet(key: string, value: any): Promise<void> {
    return this.petsRef.doc(key).update(value);
  }

  // Delete a pet
  deletePet(key: string): Promise<void> {
    return this.petsRef.doc(key).delete();
  }

  // Return the list of the pets
  getPetsList(): AngularFirestoreCollection<Pet> {
    return this.petsRef;
  }

  // Return a pet
  getPet(key: string): AngularFirestoreDocument<Pet> {
    return this.petsRef.doc(key);
  }

  deleteImageByUrl(url: string) {
    // Create a reference with an initial file path and name
    return this.storage.refFromURL(url).delete();
  }

  // Get the url profile image of a pet
  // getProfileImageUrl(userId: string) {
  //   const userStorageRef = firebase.storage().ref().child('images/users/' + userId + "_users.jpg");
  //   userStorageRef.getDownloadURL().then(url => {
  //     this.userProfileImg = url
  //   });
  // }

  // Delete all the pets
  // deleteAll() {
  //   this.petsRef.get().subscribe(
  //     (querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         doc.ref.delete();
  //       });
  //     },
  //     (error) => {
  //       console.log('Error: ', error);
  //     }
  //   );
  // }
}
