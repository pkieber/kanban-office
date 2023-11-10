import { Injectable } from '@angular/core';
import {
  Firestore,
  collection, addDoc,
  collectionData,
  doc, updateDoc,
  deleteDoc,
  docData,
  DocumentData,
  CollectionReference,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from '../models/contact.class';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contactsCollection: CollectionReference<DocumentData>;


  constructor(private firestore: Firestore, private snackBar: MatSnackBar) {
    this.contactsCollection = collection(this.firestore, 'contacts');
  }

    /**
     * Gets all contact info.
     * @returns all of the contacts in the collection.
     */
    getAll() {
      return collectionData(this.contactsCollection, {
        idField: 'id',
      }) as Observable<Contact[]>;
    }


    /**
     * Gets user info based on id.
     * @param id
     * @returns the user that matches the id.
     */
    get(id: string) {
      const userDocRef = doc(this.firestore, 'contacts', id);
      return docData(userDocRef, { idField: 'id' });
    }


    /**
     * Creates new user.
     * @param user
     * @returns a new user to the collection.
     */
    create(contact: Contact) {
      return addDoc(this.contactsCollection, contact);
    }


    /**
     * Updates user info.
     * @param user
     * @returns an update to the user collection.
     */
    update(contact: Contact) {
      const userDocRef = doc(this.firestore,`contacts/${contact.id}`);
      return updateDoc(userDocRef, { ...contact });
    }


    /**
     * Deletes selected user.
     * @param id
     * @returns a deletion of the user that matches the id.
     */
    delete(id: string) {
      const userDocRef = doc(this.firestore,`contacts/${id}`);
      return deleteDoc(userDocRef);
    }

}
