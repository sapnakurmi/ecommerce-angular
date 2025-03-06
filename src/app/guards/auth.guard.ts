import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken(); // Get the token
    if (token) {
      return true; // Allow access if the token exists
    } else {
      this.router.navigate(['/login']); // Redirect to login if no token
      return false;
    }
  }
  
  

}
