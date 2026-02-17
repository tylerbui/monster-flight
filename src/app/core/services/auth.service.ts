import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  user,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private auth: Auth,
    private router: Router,
  ) {
    this.user$ = user(this.auth);
  }

  async signInWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      if (result.user) {
        this.router.navigate(['/flight-form']);
      }
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }

  async signInWithEmail(email: string, password: string): Promise<void> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      if (result.user) {
        this.router.navigate(['/flight-form']);
      }
    } catch (error) {
      console.error('Email login error:', error);
      throw error;
    }
  }

  async registerWithEmail(email: string, password: string): Promise<void> {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      if (result.user) {
        this.router.navigate(['/flight-form']);
      }
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map((currentUser) => !!currentUser));
  }

  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }
}
