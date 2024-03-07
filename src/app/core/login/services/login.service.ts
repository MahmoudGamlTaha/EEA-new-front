import { TranslationService } from 'app/language/translation.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '@login/model/login-response.model';
import { AuthService } from 'app/core/services/auth.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUrl = environment.loginUrl;
  userData = '/assets/usersData.json';
  user;
  constructor(
    private auth: AuthService,
    private router: Router,
    private httpClient: HttpClient,
    private translationService:TranslationService
  ) {}

  login(username: string, password: string) {
    let body = { username: username, password: password };
    this.httpClient
      .post(this.loginUrl, body)
      .subscribe((response: LoginResponse) => {
        if(response.roles.length == 0){
          this.router.navigate(['/operations']);
        }
        let roles = response.roles.map((role:any) => role.code)
        this.auth.updateLoggedInState(true , response.token , roles);

        roles.map(role => {
          switch(role) {
            case 'admin':
            this.router.navigate(['/admin']);
            break;
            case 'customer':
            this.router.navigate(['/main/login']);
            break;
            case 'department_supervisor':
            this.router.navigate(['/operations']);
            break;
          }
        })
        
      } , error=> {
        this.translationService.toastrTranslation('error','toastr.notValidUsernameOrPassword');
      })
  }

  logout() {
    this.auth.updateLoggedInState(false);
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.router.navigate(['/main/login']);
  }
}
