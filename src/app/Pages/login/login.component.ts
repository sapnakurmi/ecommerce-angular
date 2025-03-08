import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  user: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          if (response && response.access_token) {
            localStorage.setItem('authToken', response.access_token);
            const userData = {
              name: response.user?.name || 'John Doe',
              profileImage:
                response.user?.avatar ||
                'https://randomuser.me/api/portraits/men/10.jpg',
            };
            localStorage.setItem('user', JSON.stringify(userData));
            this.router.navigate(['/']);
          } else {
            console.error('Token not received!');
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Login failed! Please check your credentials.');
        },
      });
    }
  }
}
