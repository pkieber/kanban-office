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
export class TasksService {

  constructor(private firestore: Firestore, private snackBar: MatSnackBar) {}

  addTask (data: object) {
    const dbInstance = collection(this.firestore, 'tasks');
    // this.snackBar.open(message, action);
    return addDoc(dbInstance, data);
  }


  loadTasks() {
    const dbInstance = collection(this.firestore, 'tasks');
    return collectionData(dbInstance, { idField: 'id' });
  }


  updateTasks(taskId: string, data: object): Promise<void> {
    const docInstance = doc(this.firestore, 'tasks', taskId);
    // this.snackBar.open(message, action);
    return updateDoc(docInstance, data);
  }


  deleteTasks(taskId: string) {
    const docInstance = doc(this.firestore, 'tasks', taskId);
    // this.snackBar.open(message, action);
    return deleteDoc(docInstance);
  }

}
