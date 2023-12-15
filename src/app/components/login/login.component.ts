import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { AuthenticatedResponse } from 'src/app/Models/authenticatedResponse';
import { UserLogin } from 'src/app/Models/userLogin';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  invalidLogin: boolean = false;
  user: UserLogin = {
    username: '',
    password: '',
  };

  constructor(private router: Router, private userService: UserService, private authService: AuthService){}


  loginUser(loginForm: any) {
    if(loginForm.valid) {
      this.userService.login(this.user).subscribe({
        next: (response: AuthenticatedResponse) => {
        console.log(JSON.stringify(response, null, 2));
        const accessToken = response.accessToken;
        const refreshToken = response.refreshToken;
        localStorage.setItem("accessToken", accessToken); 
        localStorage.setItem("refreshToken", refreshToken);
        this.invalidLogin = false; 
        this.getUserDetails();
      },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
      }
      
 }

 getUserDetails(){
  this.userService.getCurrentUser().subscribe({
    next: (response: User) => {
      this.authService.setUserInfo(response)

      this.router.navigate(["/chat"]);

    }

  })
 }
}
