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
import { TaskClass } from '../models/task.class';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasksCollection: CollectionReference<DocumentData>;
  private selectedTaskSource = new BehaviorSubject<TaskClass | null>(null);
  selectedTask$ = this.selectedTaskSource.asObservable();

  constructor(
    private firestore: Firestore,
    private snackBar: MatSnackBar
  ) {
    this.tasksCollection = collection(this.firestore, 'tasks');
  }


  /**
   * Gets all task info.
   * @returns all of the tasks in the collection.
   */
  getAll() {
    return collectionData(this.tasksCollection, {
      idField: 'id',
    }) as Observable<TaskClass[]>;
  }


  /**
   * Gets task info based on id.
   * @param id
   * @returns the task that matches the id.
   */
  get(id: string) {
    const taskDocRef = doc(this.firestore, 'tasks', id);
    return docData(taskDocRef, { idField: 'id' }) as Observable<TaskClass>;
  }


  /**
   * Creates new task.
   * @param task
   * @returns a new task to the collection.
   */
  create(task: TaskClass) {
    return addDoc(this.tasksCollection, task)
      .then(() => this.showSuccess('Task added successfully'))
      .catch(error => this.showErrorSnackbar('Failed to add task'));
  }


  /**
   * Updates task info.
   * @param task
   * @returns an update to the task collection.
   */
  update(task: TaskClass) {
    const contactDocRef = doc(this.firestore, `tasks/${task.id}`);
    return updateDoc(contactDocRef, { ...task })
      .then(() => this.showSuccess('Task updated successfully'))
      .catch(error => this.showErrorSnackbar('Failed to update task'));
  }


  /**
   * Deletes selected task.
   * @param id
   * @returns a deletion of the task that matches the id.
   */
  delete(id: string) {
    const taskDocRef = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(taskDocRef)
      .then(() => this.showSuccess('Task deleted successfully'))
      .catch(error => this.showErrorSnackbar('Failed to delete task'));
  }


  setSelectedTask(task: TaskClass | null) {
    this.selectedTaskSource.next(task);
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

