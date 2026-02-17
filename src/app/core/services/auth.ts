import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.user$ = this.afAuth.authState;
  }

  async signInWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);

      if (result.user) {
        console.log('Login successful:', result.user.email);
        this.router.navigate(['/flight-form']);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }

  getCurrentUser(): Observable<firebase.User | null> {
    return this.user$;
  }
}
