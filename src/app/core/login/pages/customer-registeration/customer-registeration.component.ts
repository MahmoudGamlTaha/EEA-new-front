import { TranslationService } from 'app/language/translation.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { BtnComponent } from '@shared/components/buttons/btn/btn.component';
import { RegisterRequest } from '@operations/models/register-request.model';
import { Router } from '@angular/router';
import { CustomerRegisterationFormSerivce } from '@login/services/customer-registeration/customer-registeration-form.service';
import { CustomerRegisterationAPIService } from '@login/services/customer-registeration/customer-registeration.api.service';

@Component({
  selector: 'app-customer-registeration',
  standalone: true,
  imports: [
    CommonModule,
    SubtitleComponent,
    DynamicFormComponent,
    TranslateModule,
    BtnComponent,
  ],
  templateUrl: './customer-registeration.component.html',
  styleUrl: './customer-registeration.component.scss',
})
export class CustomerRegisterationComponent {
  @ViewChild('registerForm') registerForm!: ElementRef;
  model;
  registerRequest: RegisterRequest;
  constructor(
    private customerRegisterationForm: CustomerRegisterationFormSerivce,
    private customerRegisterationApiService: CustomerRegisterationAPIService,
    private router: Router,
    private translationService : TranslationService
  ) {
    this.model = customerRegisterationForm.customerRegisterationFormModel;
  }

  getFormValues(values) {
    this.registerRequest = {
      username: values.username,
      name: values.name,
      password: values.password,
      email: values.email,
      active: true,
    };
  }

  register() {
    console.log(this.registerForm['dynamicFormGroup'].valid);
    if (this.registerForm['dynamicFormGroup'].valid) {
      this.customerRegisterationApiService
        .registerCustomerAPI(this.registerRequest)
        .subscribe(
          (res) => {
            this.translationService.toastrTranslation('success','toastr.registeredSuccessfully');
            this.router.navigate(['/main/login']);
          },
          (error) => {
            this.translationService.toastrTranslation('error',error);
          }
        );
    }else{
      console.log(this.registerForm['dynamicFormGroup'])
      this.registerForm['dynamicFormGroup'].markAllAsTouched();
    }
  }
}
