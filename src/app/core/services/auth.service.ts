import { Injectable, inject } from '@angular/core';
import { Auth, authState, signInWithPopup, signOut, GoogleAuthProvider, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  user$: Observable<User | null> = authState(this.auth);

  async signInWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);

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
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }

  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }
}
