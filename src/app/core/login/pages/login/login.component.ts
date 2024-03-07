import { Component, OnInit } from '@angular/core';
import { CompanyValidationApiSerivce } from '@login/services/company-validation/company-validate-api.service';
import { AuthService } from 'app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(public authSerivce: AuthService ) {} 
}
