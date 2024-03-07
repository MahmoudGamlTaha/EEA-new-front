import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerRegisterationFormSerivce {
  customerRegisterationFormModel;

  constructor() {
    this.customerRegisterationFormModel = {
      username: {
        label: 'customerRegisterFrom.userName',
        value: '',
        col: 'col-md-6 col-12',
        type: 'text',
        rules: {
          required: true,
          userName:true
        },
      },
      name: {
        label: 'customerRegisterFrom.name',
        value: '',
        col: 'col-md-6 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      password: {
        type: 'password',
        value: '',
        col: 'col-md-6 col-12',
        label: 'customerRegisterFrom.password',
        rules: {
          required: true,
          password:true
        },
      },
      email: {
        label: 'customerRegisterFrom.email',
        value: '',
        col: 'col-md-6 col-12',
        type: 'text',
        rules: {
          required: true,
          email:true
        },
      },
    };
  }
}
