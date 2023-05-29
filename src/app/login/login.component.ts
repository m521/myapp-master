import { Component } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';
export interface LoginRequest{
  email : string;
  password : string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error!: string;
  loginRequest : LoginRequest = {
    email : "",
    password : ""
  };
  constructor(private authService: AuthService,private router : Router) { }
role !: any;
  onSubmit() {
    this.authService.login(this.loginRequest).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        const decodedToken: any = jwt_decode(response.token);
        const role = decodedToken.role;
        localStorage.setItem('role',role);
        localStorage.setItem('email',decodedToken.sub)
        this.router.navigate(['/']);
        // Redirect to dashboard or other authenticated pages
      },
      (error) => {
        this.error = error.message;
      }
    );
  }
}
