import { Injectable, signal } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppUser } from '../models/app-user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject(false);
  public isLoggedInSubject$ = this.isLoggedInSubject.asObservable()
  public loginSignal = signal<boolean>(false);
  public userRole: string[];
  public user: AppUser;
  public updateUser = new BehaviorSubject(null);

  constructor(private jwtHelper: JwtHelperService) {
    this.updateLoggedInState(this.hasToken() , this.getToken() , this.getRoles())
  }

  
  updateLoggedInState(status: boolean , token? , roles?) {
    if(status && roles) {
      this.user = this.extractDataFromToken(token);
      console.log(this.user)
      this.updateUser.next(this.user)
      localStorage.setItem('token', token);
      localStorage.setItem('roles', JSON.stringify(roles));     
      this.userRole = roles
    }
      this.isLoggedInSubject.next(status)
      this.loginSignal.set(status)
      
  }

  extractDataFromToken(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem("token");
  }

  private getToken(): string {
    return localStorage.getItem("token");
  }

  private getRoles(): string {
    return JSON.parse(localStorage.getItem("roles"));
  }
}
