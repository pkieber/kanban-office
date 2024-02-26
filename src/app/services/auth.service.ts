import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);
  isLoggedIn: boolean = false; // Used for auth-guard


  // Register with email/password/username
  register(email: string, username: string, password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth, email, password
    ).then(response => updateProfile(response.user, { displayName: username }));

    return from(promise);
  }


  // Login with email/password
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth, email, password
    ).then(() => {});
    this.isLoggedIn = true; // Used for auth-guard
    return from(promise);
  }


  // Login as anonymous user
  anonLogin() {
    const promise = signInAnonymously(
      this.firebaseAuth
    ).then(() => {});
    this.isLoggedIn = true; // Used for auth-guard
    return from(promise);
  }


  // Logout user
  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    this.isLoggedIn = false; // Used for auth-guard
    return from(promise);
  }

}
