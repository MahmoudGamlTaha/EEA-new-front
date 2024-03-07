import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangingPasswordService {
changingPasswordForm;
  constructor() { 
    this.changingPasswordForm = {
      newPassword: {
        type: 'password',
        value: '',
        col: 'offset-md-3 col-md-6 col-12 pb-3',
        label: 'customer.newPassword',
        rules: {
          required: true,
        },
      },
      confirmPassword: {
        type: 'password',
        value: '',
        col: 'offset-md-3 col-md-6 col-12 pb-3',
        label: 'customer.confirmPassword',
        rules: {
          required: true,
        },
      },
    }
  }
}
