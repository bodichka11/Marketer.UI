import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User | null = null;

  constructor(
    private JwtHelper: JwtHelperService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.getUserInfo();
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem('accessToken');
    if (token && !this.JwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  };
  logOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  getUserInfo(): void {
    const user = this.authService.getUserInfo();
    if (user) {
      this.user = user;
    }
  }

}
