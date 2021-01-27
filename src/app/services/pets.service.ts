import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Pet } from '../models/pet';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private dbPath = 'pets';

  petsRef: AngularFirestoreCollection<Pet> = null;


  constructor(private firestore: AngularFirestore) {
    this.petsRef = firestore.collection(this.dbPath);
  }

  // Add a new pet
  addPet(pet: Pet): void {
    this.petsRef.add({ ...pet });
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
  getPet(key: string): AngularFirestoreDocument<Pet>{
    return this.petsRef.doc(key);
  }


  deleteAll() {
    this.petsRef.get().subscribe(
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }
}
