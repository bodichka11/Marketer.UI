import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from '../Models/userRegister';
import { RegistredResponse } from '../Models/registeredResponse';
import { EMPTY, Observable } from 'rxjs';
import { UserLogin } from '../Models/userLogin';
import { AuthenticatedResponse } from '../Models/authenticatedResponse';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl: string = '/api';


  constructor(private httpService: HttpClient) { }

  register(userRegister: UserRegister): Observable<RegistredResponse> {
    return this.httpService.post<RegistredResponse>("https://localhost:5001/api/User/register1", userRegister )
  }
  login(userLogin: UserLogin): Observable<AuthenticatedResponse> {
    return this.httpService.post<AuthenticatedResponse>("https://localhost:5001/api/User/login1", userLogin)
  }
  getUser(id: number): Observable<User> {
    return this.httpService.get<User>(`https://localhost:5001/api/User/${id}`);
  }
  getCurrentUser(): Observable<User> {
    return this.httpService.get<User>("https://localhost:5001/api/User/current");

  }
  // getCurrentUser(): Observable<User> {
  //   const token = localStorage.getItem('jwt'); 
  //   const headers = {
  //     Authorization: `Bearer ${token}`
  //   };
  //   return this.httpService.get<User>("https://localhost:5001/api/User/current", { headers });
  // }
}
