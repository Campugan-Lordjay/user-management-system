import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export type UserRole = 'admin' | 'user';

export interface User {
  email: string;
  role: UserRole;
  verified: boolean;
  token?: string;
  refreshToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, { email, password }).pipe(
      tap(user => this.currentUserSubject.next(user)),
      catchError(error => {
        console.error('Sign up error:', error);
        return throwError(() => error);
      })
    );
  }

  verifyEmail(token: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/verify`, { token }).pipe(
      tap(user => this.currentUserSubject.next(user)),
      catchError(error => {
        console.error('Email verification error:', error);
        return throwError(() => error);
      })
    );
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(user => this.currentUserSubject.next(user)),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  // Mock auth services for frontend testing
  mockSignUp(email: string, password: string): Observable<any> {
    // Mock signup response
    return of({
      email: email,
      role: 'user',
      verified: false,
      token: 'mock-verification-token-' + Math.random().toString(36).substring(2)
    }).pipe(delay(800));
  }

  mockVerify(token: string): Observable<any> {
    // Mock verification response
    return of({
      email: 'user@example.com',
      role: 'user',
      verified: true,
      token: 'mock-jwt-token-' + Math.random().toString(36).substring(2)
    }).pipe(delay(500));
  }
}
