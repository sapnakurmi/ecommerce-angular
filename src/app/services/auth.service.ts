import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/auth/login';
  private tokenKey = 'authToken';
  private userKey = 'userData';
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public user = new BehaviorSubject<any>(null); 

  constructor(private http: HttpClient) {
    this.isAuthenticated.next(!!localStorage.getItem(this.tokenKey));
    this.loadUser(); 
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap((response) => {
        if (response && response.access_token) {
          localStorage.setItem(this.tokenKey, response.access_token);
          const userData = {
            name: response.user?.name || 'John Doe',
            profileImage:
              response.user?.avatar ||
              'https://randomuser.me/api/portraits/men/10.jpg',
          };
          localStorage.setItem(this.userKey, JSON.stringify(userData));

          this.user.next(userData); 
          this.isAuthenticated.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey); 
    this.isAuthenticated.next(false);
    this.user.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): any {
    return this.user.asObservable(); 
  }

  private loadUser(): void {
    const userData = localStorage.getItem(this.userKey);
    if (userData) {
      this.user.next(JSON.parse(userData)); 
    }
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post('https://api.escuelajs.co/api/v1/users/', userData);
  }
}
