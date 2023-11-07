import { Injectable } from '@angular/core';
import {
  Firestore,
  collection, addDoc,
  collectionData,
  doc, updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private firestore: Firestore, private snackBar: MatSnackBar) {}

  addContact(data: object) {
    const dbInstance = collection(this.firestore, 'contacts');
    // this.snackBar.open(message, action);
    return addDoc(dbInstance, data);
  }


  loadContacts() {
    const dbInstance = collection(this.firestore, 'contacts');
    return collectionData(dbInstance, { idField: 'id' });
  }


  updateContacts(contactId: string, data: object): Promise<void> {
    const docInstance = doc(this.firestore, 'contacts', contactId);
    // this.snackBar.open(message, action);
    return updateDoc(docInstance, data);
  }


  deleteContacts(contactId: string) {
    const docInstance = doc(this.firestore, 'contacts', contactId);
    // this.snackBar.open(message, action);
    return deleteDoc(docInstance);
  }

}
