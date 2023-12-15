import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistredResponse } from 'src/app/Models/registeredResponse';
import { UserRegister } from 'src/app/Models/userRegister';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  invalidLogin: boolean = false;
  user: UserRegister = {
    username: '',
    password: '',
    email: ''
  };

  constructor(private router: Router, private userService: UserService){}

  registerUser(loginForm: any) {
    if(loginForm.valid) {
      this.userService.register(this.user).subscribe(
        (response: RegistredResponse) => {
          console.log(response);
          this.router.navigate(["/login"]);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.invalidLogin = true;
    }
 }
}
