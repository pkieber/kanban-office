import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  // Define your forms with validators
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage: string | null = null;


  onLogin(): void {
    const rawForm = this.loginForm.getRawValue();
    const email = rawForm.email || '';
    const password = rawForm.password || '';
    this.authService
      .login(email, password)
      .subscribe({
        next: () => {
          this.showSnackbar('User login successfull', 'success-snackbar');
          this.router.navigateByUrl('/summary');
        },
        error: (err) => {
          this.errorMessage = err.code;
        }
      });
  }


  onLoginAnon(): void {
    this.authService
      .anonLogin()
      .subscribe({
        next: () => {
          this.showSnackbar('User login successfull', 'success-snackbar');
          this.router.navigateByUrl('/summary');
        },
        error: (err) => {
          this.errorMessage = err.code;
        }
      });
  }


  onRegister(): void {
    const rawForm = this.registerForm.getRawValue();
    const email = rawForm.email || '';
    const username = rawForm.username || '';
    const password = rawForm.password || '';
    this.authService
      .register(email, username, password)
      .subscribe({
        next: () => {
          this.showSnackbar('User registration successfull', 'success-snackbar');
          this.router.navigateByUrl('/');
          this.registerForm.reset();
        },
        error: (err) => {
          this.errorMessage = err.code;
        }
      });
  }


  showSnackbar(message: string, panelClass: string = 'default-snackbar'): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: [panelClass]
    });
  }

}
