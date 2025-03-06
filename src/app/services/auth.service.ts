import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/auth/login';
  private tokenKey = 'authToken';
  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.isAuthenticated.next(!!localStorage.getItem(this.tokenKey));
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.access_token);
        this.isAuthenticated.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticated.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  registerUser(userData: any): Observable<any> {
    return this.http.post('https://api.escuelajs.co/api/v1/users/', userData);
  }
  
}
