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
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contactsCollection: CollectionReference<DocumentData>;
  private selectedContactSource = new BehaviorSubject<Contact | null>(null); // TEST
  selectedContact$ = this.selectedContactSource.asObservable(); // TEST

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
   * Gets contact info based on id.
   * @param id
   * @returns the contact that matches the id.
   */
  get(id: string) {
    const contactDocRef = doc(this.firestore, 'contacts', id);
    return docData(contactDocRef, { idField: 'id' }) as Observable<Contact>;
  }

  /**
   * Creates new contact.
   * @param contact
   * @returns a new contact to the collection.
   */
  create(contact: Contact) {
    return addDoc(this.contactsCollection, contact);
  }

  /**
   * Updates contact info.
   * @param contact
   * @returns an update to the contact collection.
   */
  update(contact: Contact) {
    const contactDocRef = doc(this.firestore, `contacts/${contact.id}`);
    return updateDoc(contactDocRef, { ...contact });
  }

  /**
   * Deletes selected contact.
   * @param id
   * @returns a deletion of the contact that matches the id.
   */
  delete(id: string) {
    const contactDocRef = doc(this.firestore, `contacts/${id}`);
    return deleteDoc(contactDocRef);
  }

  // TEST
  setSelectedContact(contact: Contact | null) {
    this.selectedContactSource.next(contact);
  }
}
