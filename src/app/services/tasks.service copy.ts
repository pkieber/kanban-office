import { Injectable } from '@angular/core';
import {
  Firestore,
  collection, addDoc,
  doc, updateDoc,
  deleteDoc,
  collectionData,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class TasksServiceCopy {

  constructor(
    private firestore: Firestore,
    private snackBar: MatSnackBar
  ) {}


  addTask(data: object) {
    const dbInstance = collection(this.firestore, 'tasks');
    return addDoc(dbInstance, data)
      .then(() => this.showSuccess('Task added successfully'))
      .catch(error => this.showErrorSnackbar('Failed to add task'));
  }


  loadTasks() {
    const dbInstance = collection(this.firestore, 'tasks');
    return collectionData(dbInstance, { idField: 'id' });
  }


  updateTasks(taskId: string, data: object): Promise<void> {
    const docInstance = doc(this.firestore, 'tasks', taskId);
    return updateDoc(docInstance, data)
      .then(() => this.showSuccess('Task updated successfully'))
      .catch(error => this.showErrorSnackbar('Failed to update task'));
  }


  deleteTasks(taskId: string) {
    const docInstance = doc(this.firestore, 'tasks', taskId);
    return deleteDoc(docInstance)
      .then(() => this.showSuccess('Task deleted successfully'))
      .catch(error => this.showErrorSnackbar('Failed to delete task'));
  }


  private showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }


  private showErrorSnackbar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}
